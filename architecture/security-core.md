# Security Architecture - Core Components

## Overview

This document outlines the core security architecture for CertFast, covering authentication, authorization, data protection, and API security. These measures ensure the confidentiality, integrity, and availability of certification assessment data.

---

## 1. Authentication

### JWT-Based Authentication

CertFast uses JSON Web Tokens (JWT) for stateless authentication across all services.

**Token Structure:**
- **Access Token**: Short-lived (15 minutes), contains user claims
- **Refresh Token**: Long-lived (7 days), used to obtain new access tokens
- **Algorithm**: RS256 (RSA with SHA-256) for asymmetric signing

**Token Claims:**
```json
{
  "sub": "user-uuid",
  "email": "user@example.com",
  "role": "assessor",
  "org_id": "org-uuid",
  "iat": 1710508800,
  "exp": 1710509700,
  "jti": "unique-token-id"
}
```

### Session Management

**Session Lifecycle:**
- Sessions are created upon successful login
- Each session has a unique identifier tracked server-side
- Concurrent session limits per user (max 5 active sessions)
- Automatic session termination on password change

**Security Measures:**
- Secure, HttpOnly cookies for web clients
- SameSite=Strict cookie attribute to prevent CSRF
- Session binding to IP address and user agent fingerprinting
- Idle timeout: 30 minutes of inactivity
- Absolute timeout: 8 hours maximum session duration

**Logout Handling:**
- Client-side token deletion
- Server-side token blacklisting (Redis)
- Immediate revocation of refresh tokens
- Cascade logout option (terminate all sessions)

---

## 2. Authorization

### Role-Based Access Control (RBAC)

CertFast implements a hierarchical RBAC system with the following roles:

| Role | Permissions |
|------|-------------|
| **Super Admin** | Full system access, user management, configuration |
| **Organization Admin** | Manage org settings, users, assessments within org |
| **Assessor** | Create, edit assessments, review evidence, assign controls |
| **Auditor** | View assessments, read-only access to evidence |
| **Contributor** | Submit evidence, update assigned controls |
| **Viewer** | Read-only access to permitted resources |

### Permission Model

**Resource-Level Permissions:**
- `users:read`, `users:write`, `users:delete`
- `organizations:read`, `organizations:write`, `organizations:delete`
- `assessments:read`, `assessments:write`, `assessments:delete`, `assessments:execute`
- `controls:read`, `controls:write`, `controls:update-status`
- `evidence:read`, `evidence:write`, `evidence:delete`

**Scope-Based Access:**
- Organization-scoped: Users can only access resources within their organization
- Assessment-scoped: Fine-grained access to specific assessments
- Control-scoped: Access limited to assigned controls

### Implementation Notes

- Middleware validates JWT and extracts claims on every request
- Policy engine evaluates permissions against resource ownership
- Database queries automatically filter by organization ID
- API responses exclude fields user lacks permission to view
- Permission caching with 5-minute TTL for performance

---

## 3. Data Protection

### Encryption at Rest

**Database Encryption:**
- AES-256 encryption for sensitive fields (PII, credentials)
- Field-level encryption for: email addresses, phone numbers, API keys
- Transparent Data Encryption (TDE) for database files
- Encrypted backups with separate key management

**File Storage Encryption:**
- Evidence files encrypted using AES-256-GCM
- Unique encryption keys per organization
- Key rotation every 90 days
- Secure key storage in hardware security module (HSM) or cloud KMS

**Encryption Key Management:**
- Master keys stored in AWS KMS / Azure Key Vault / GCP Cloud KMS
- Data encryption keys (DEKs) encrypted by master keys
- Automatic key rotation policy
- Key access logging and audit trail

### Encryption in Transit

**TLS Configuration:**
- TLS 1.3 required for all connections
- TLS 1.2 supported with secure cipher suites only
- HSTS headers with 1-year max-age
- Certificate pinning for mobile applications

**Internal Service Communication:**
- mTLS (mutual TLS) between microservices
- Service mesh with automatic certificate rotation
- Internal traffic encrypted even within VPC

**API Communication:**
- HTTPS enforced on all endpoints
- Strict-Transport-Security headers
- Secure cookie flags (Secure, HttpOnly, SameSite)

### Data Classification

| Classification | Examples | Handling |
|----------------|----------|----------|
| **Critical** | Passwords, API secrets, encryption keys | Hashed/encrypted, never logged, strict access |
| **Confidential** | PII, assessment data, evidence | Encrypted at rest, audit logging, need-to-know |
| **Internal** | Org settings, user roles | Access controlled, internal use only |
| **Public** | Published frameworks, public docs | No special handling required |

---

## 4. API Security

### Rate Limiting

**Tiered Rate Limiting Strategy:**

| Tier | Requests/Minute | Requests/Hour | Scope |
|------|-----------------|---------------|-------|
| Anonymous | 10 | 100 | IP address |
| Authenticated | 100 | 5,000 | User ID |
| Premium | 1,000 | 50,000 | API key |
| Internal | 10,000 | Unlimited | Service account |

**Rate Limit Headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 1710509400
X-RateLimit-Retry-After: 45
```

**Throttling Behavior:**
- 429 Too Many Requests response when limit exceeded
- Exponential backoff recommended for clients
- Burst allowance for authenticated users (10x limit for 10 seconds)

### Input Validation

**Validation Layers:**
1. **Schema validation** - JSON Schema for request bodies
2. **Type validation** - Strict typing with runtime checks
3. **Format validation** - Regex patterns for emails, UUIDs, dates
4. **Range validation** - Min/max values, length limits
5. **Semantic validation** - Business logic validation

**Security-Focused Validations:**
- SQL injection prevention: Parameterized queries only
- NoSQL injection prevention: Input sanitization for MongoDB queries
- XSS prevention: Output encoding, Content-Type enforcement
- Command injection: Input whitelist approach
- Path traversal: Canonical path validation

**Validation Examples:**
```yaml
User Creation:
  email:
    type: string
    format: email
    maxLength: 255
    required: true
  password:
    type: string
    minLength: 12
    pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$"
    required: true
  role:
    type: string
    enum: [viewer, contributor, assessor, admin]
    required: true
```

### Additional API Security Measures

**CORS Policy:**
- Whitelist-based origin validation
- Credentials allowed only from trusted origins
- Strict allowed methods and headers
- No wildcards in production

**Security Headers:**
```
Content-Security-Policy: default-src 'self'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

**API Versioning:**
- Version in URL path (/api/v1/, /api/v2/)
- Deprecation notices 6 months in advance
- Sunset headers for deprecated endpoints

**Audit Logging:**
- All API requests logged with user ID, timestamp, IP
- Sensitive actions (delete, permission change) logged separately
- Failed authentication attempts tracked for brute force detection
- 90-day log retention minimum

---

## Security Incident Response

**Detection:**
- Real-time monitoring of authentication anomalies
- Rate limit violation alerts
- Failed authorization attempt tracking
- Automated threat detection rules

**Response:**
- Automatic account lockout after 5 failed login attempts
- IP blocking for sustained attack patterns
- Incident escalation to security team
- Forensic log preservation

---

## Compliance Considerations

- **SOC 2**: Access controls, audit logging, encryption standards
- **ISO 27001**: Security policies, risk management, controls
- **GDPR**: Data protection, right to erasure, data portability
- **HIPAA**: Where applicable, PHI protection measures

---

## Implementation Checklist

- [ ] JWT middleware deployed
- [ ] RBAC policy engine configured
- [ ] Database encryption enabled
- [ ] TLS 1.3 configured
- [ ] Rate limiting middleware active
- [ ] Input validation schemas defined
- [ ] Security headers set
- [ ] Audit logging enabled
- [ ] Penetration testing completed
- [ ] Security documentation reviewed
