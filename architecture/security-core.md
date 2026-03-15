# Security Architecture Review - Core Components

This document outlines the security measures implemented across the CertFast platform to protect sensitive certification data, user information, and ensure compliance with industry security standards.

---

## 1. Authentication

### JWT-Based Authentication

The CertFast platform implements JSON Web Token (JWT) based authentication to securely verify user identities and maintain session state.

**Token Structure:**
- **Access Token**: Short-lived tokens (15 minutes) containing user claims
- **Refresh Token**: Long-lived tokens (7 days) for obtaining new access tokens
- **Token Format**: Signed RS256 JWTs with 2048-bit RSA keys

**Token Claims:**
```json
{
  "sub": "user-uuid",
  "email": "user@example.com",
  "role": "org_admin",
  "org_id": "org-uuid",
  "iat": 1647321600,
  "exp": 1647322500,
  "jti": "unique-token-id"
}
```

**Implementation Notes:**
- Tokens are transmitted via HTTP-only cookies with Secure and SameSite=Strict flags
- Token rotation is enforced on every refresh to prevent replay attacks
- Failed authentication attempts are rate-limited to prevent brute force attacks
- JWT secrets are rotated monthly with zero-downtime key rollover

### Session Management

**Session Lifecycle:**
- Sessions are created upon successful authentication
- Active sessions are tracked in a distributed cache (Redis)
- Users can view and terminate active sessions from their profile
- Sessions automatically expire after 7 days of inactivity

**Security Measures:**
- Session binding to IP address and user agent fingerprint
- Concurrent session limits per user (maximum 5 active sessions)
- Immediate session invalidation on password change or suspicious activity
- Audit logging for all session events (login, logout, refresh)

---

## 2. Authorization

### Role-Based Access Control (RBAC)

CertFast implements a hierarchical RBAC system to ensure users only access resources they are authorized to view or modify.

**Role Hierarchy:**
| Role | Description | Scope |
|------|-------------|-------|
| `platform_admin` | Full system access | Global |
| `org_admin` | Organization management | Organization |
| `compliance_officer` | Assessment and control management | Organization |
| `auditor` | Read-only access to assessments | Organization |
| `user` | Basic access to assigned resources | Limited |

**Permission Granularity:**
- Permissions are defined as fine-grained actions (e.g., `assessment:create`, `control:read`)
- Each role is assigned a set of permissions via policy definitions
- Custom roles can be created within organizations with specific permission sets

### Resource-Level Permissions

**Organization Isolation:**
- All data is scoped to an organization
- Users cannot access data from other organizations
- Database queries automatically filter by organization_id

**Assessment Access Control:**
- Assessments can be assigned to specific users or teams
- Evidence uploads are restricted to assigned assessors
- Control status changes require `control:update` permission

**Implementation Notes:**
- Authorization checks occur at the API gateway and service layer
- Middleware validates permissions before controller execution
- Denied access attempts are logged for security auditing

---

## 3. Data Protection

### Encryption at Rest

**Database Encryption:**
- All database files are encrypted using AES-256
- Encryption keys are managed by a hardware security module (HSM)
- Key rotation occurs automatically every 90 days
- Encrypted backups are stored in geographically distributed locations

**Sensitive Field Encryption:**
- PII fields (SSN, tax IDs) are encrypted at the application layer
- Encryption uses AES-256-GCM with unique keys per organization
- Searchable encryption enables querying without decryption

**File Storage Encryption:**
- Evidence files are encrypted before storage
- Each file uses a unique encryption key
- Keys are stored separately from encrypted data

### Encryption in Transit

**Transport Layer Security:**
- All API communications use TLS 1.3
- Certificate pinning enforced for mobile applications
- HSTS headers configured with 1-year max-age
- Weak cipher suites are explicitly disabled

**Internal Service Communication:**
- Service-to-service calls use mutual TLS (mTLS)
- Certificates are automatically rotated every 30 days
- Internal traffic is isolated within a private VPC

---

## 4. API Security

### Rate Limiting

**Tiered Rate Limiting Strategy:**

| Tier | Requests/Minute | Burst | Scope |
|------|-----------------|-------|-------|
| Anonymous | 10 | 20 | IP Address |
| Authenticated | 100 | 150 | User ID |
| Premium | 500 | 750 | API Key |
| Internal | 2000 | 3000 | Service |

**Rate Limit Headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 1647323400
```

**Implementation:**
- Rate limiting is enforced at the API gateway layer
- Distributed counter using Redis to handle horizontal scaling
- Exceeding limits returns HTTP 429 with Retry-After header
- Critical endpoints have stricter limits (authentication, password reset)

### Input Validation

**Validation Layers:**
1. **Schema Validation**: JSON Schema validation for all request bodies
2. **Type Validation**: Strict type checking for all parameters
3. **Business Logic Validation**: Domain-specific validation rules
4. **Sanitization**: Output encoding to prevent injection attacks

**Security Validations:**
- SQL injection prevention through parameterized queries
- XSS prevention via input sanitization and CSP headers
- File upload restrictions (type, size, content validation)
- UUID format validation for all resource identifiers

**Error Handling:**
- Validation errors return HTTP 400 with detailed messages
- Error messages do not expose internal system details
- Failed validations are logged for security monitoring

### Additional API Security Measures

**CORS Policy:**
- Strict CORS configuration allowing only registered origins
- Credentials are only sent to trusted domains
- Preflight requests are cached appropriately

**API Versioning:**
- Breaking changes are introduced in new API versions
- Deprecated versions receive security updates for 12 months
- Clients are notified of version deprecation via response headers

**Security Headers:**
```
Content-Security-Policy: default-src 'self'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

---

## Security Monitoring

### Audit Logging
- All security events are logged with user context and timestamps
- Logs are immutable and forwarded to a SIEM system
- Retention period: 7 years for compliance requirements

### Anomaly Detection
- Failed login attempts trigger alerts after 5 consecutive failures
- Unusual access patterns are flagged for review
- Automated blocking of known malicious IP addresses

### Incident Response
- Documented procedures for security incident handling
- 24/7 security operations center (SOC) monitoring
- Regular penetration testing and vulnerability assessments

---

## Compliance Considerations

The security architecture is designed to meet requirements for:
- SOC 2 Type II certification
- ISO 27001 compliance
- GDPR data protection requirements
- Industry-specific regulations (as applicable)

---

*Document Version: 1.0*
*Last Updated: March 2026*
*Owner: Security Architecture Team*
