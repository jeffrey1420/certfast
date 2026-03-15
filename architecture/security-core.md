# Core Security Architecture

This document outlines the comprehensive security measures implemented across the CertFast platform to protect user data, ensure secure access, and maintain compliance with industry standards.

---

## 1. Authentication

### JWT Token Authentication

CertFast utilizes JSON Web Tokens (JWT) for stateless authentication across all API endpoints. The JWT implementation follows industry best practices with short-lived access tokens and refresh token rotation.

**Access Token Configuration:**
- Algorithm: RS256 (asymmetric signing)
- Access token expiration: 15 minutes
- Refresh token expiration: 7 days
- Token issuer: `certfast.io`
- Token audience: `api.certfast.io`

**Token Structure:**
The JWT payload contains essential claims including:
- `sub`: User unique identifier (UUID)
- `org`: Organization identifier
- `roles`: Array of assigned roles
- `iat`: Issued at timestamp
- `exp`: Expiration timestamp
- `jti`: Unique token identifier for revocation tracking

**Refresh Token Rotation:**
Upon access token expiration, refresh tokens are used to obtain new access tokens. Each refresh token can only be used once, and a new refresh token pair is issued with each successful refresh request. This mechanism prevents replay attacks and ensures that stolen refresh tokens cannot be used indefinitely.

### Session Management

CertFast maintains secure session management with the following mechanisms:

**Session Lifecycle:**
- Sessions are created upon successful authentication
- Sessions tracked in secure, HTTP-only cookies for web clients
- API clients use Bearer token authentication in the Authorization header
- Sessions automatically terminate after 30 minutes of inactivity
- Concurrent session limits enforced per user account

**Session Security Measures:**
- Session IDs generated using cryptographically secure random bytes
- Session data stored server-side with Redis caching
- Session binding to client IP address and User-Agent fingerprinting
- Automatic session invalidation on password change or suspicious activity detection

**Logout and Token Revocation:**
- Immediate token blacklisting upon logout
- Token revocation list cached in Redis with TTL matching token expiration
- Bulk revocation capability for account compromise scenarios

---

## 2. Authorization

### Role-Based Access Control (RBAC)

CertFast implements a hierarchical RBAC system with clearly defined roles and permissions.

**Role Hierarchy:**
1. **Super Admin**: Platform-level access, user management across all organizations
2. **Organization Admin**: Full access within assigned organization, member management
3. **Compliance Manager**: Assessment creation, control configuration, reporting
4. **Auditor**: Read-only access to assessments and evidence, audit trail viewing
5. **User**: Limited access to assigned assessments, evidence upload capability

**Permission Matrix:**
Permissions are granular and scoped to resources:
- `users:read`, `users:write`, `users:delete`
- `organizations:read`, `organizations:write`
- `assessments:read`, `assessments:write`, `assessments:delete`
- `controls:read`, `controls:write`
- `evidence:read`, `evidence:write`, `evidence:delete`
- `reports:read`, `reports:generate`

**Permission Inheritance:**
- Higher roles inherit permissions from lower roles
- Custom roles can be created within organizations with specific permission combinations
- Role assignments are auditable and logged

### Resource-Level Access Control

Beyond role-based permissions, CertFast enforces resource-level access controls:

**Organization Isolation:**
- Users can only access resources within their assigned organizations
- Cross-organization access requires explicit multi-organization membership
- Data queries automatically filtered by organization ID

**Ownership and Sharing:**
- Resource creators have implicit ownership permissions
- Resources can be shared with specific users or groups
- Public/private visibility settings for assessments and controls

**Access Control Lists (ACLs):**
- Fine-grained permissions for individual resources
- Support for read, write, delete, and admin permissions per resource
- Inheritance from parent resources (e.g., assessment permissions extend to associated evidence)

---

## 3. Data Protection

### Encryption at Rest

All sensitive data stored in CertFast databases is encrypted using industry-standard algorithms.

**Database Encryption:**
- AES-256 encryption for all database storage
- Transparent Data Encryption (TDE) enabled for PostgreSQL
- Encrypted backups with separate encryption keys

**Sensitive Field Encryption:**
- Additional application-level encryption for highly sensitive fields:
  - Personal Identifiable Information (PII)
  - Evidence file metadata
  - Audit log details
- Field-level encryption uses AES-256-GCM with unique keys per organization

**Key Management:**
- Encryption keys managed by AWS KMS (Key Management Service)
- Automatic key rotation every 90 days
- Separate encryption keys per environment (production, staging, development)
- Hardware Security Module (HSM) integration for master key protection

**File Storage Encryption:**
- All uploaded evidence files encrypted before storage
- S3 bucket encryption with SSE-KMS
- Client-side encryption option for highly sensitive files
- File integrity verification using SHA-256 checksums

### Encryption in Transit

All data transmitted to and from CertFast services is protected:

**Transport Layer Security:**
- TLS 1.3 enforced for all API communications
- TLS 1.2 minimum for backward compatibility with older clients
- Strong cipher suites only (no weak ciphers like RC4 or 3DES)
- HSTS (HTTP Strict Transport Security) headers enforced

**API Security:**
- mTLS (mutual TLS) for service-to-service communication
- Certificate pinning for mobile applications
- Secure WebSocket connections (WSS) for real-time features

**Internal Communication:**
- All internal service communication encrypted
- VPC peering with encrypted traffic between services
- Database connections encrypted using SSL/TLS

---

## 4. API Security

### Rate Limiting

CertFast implements comprehensive rate limiting to prevent abuse and ensure service availability.

**Tiered Rate Limiting:**
1. **Global Rate Limits**: Applied to all requests regardless of authentication
   - 1000 requests per minute per IP address
   - Burst allowance of 200 requests

2. **Authenticated Rate Limits**: Applied to authenticated users
   - 5000 requests per minute per user
   - Higher limits available for enterprise customers

3. **Endpoint-Specific Limits**: Applied to resource-intensive endpoints
   - File upload endpoints: 50 requests per minute
   - Report generation: 10 requests per minute
   - Bulk operations: 5 requests per minute

**Rate Limit Headers:**
All API responses include rate limit information:
- `X-RateLimit-Limit`: Maximum requests allowed
- `X-RateLimit-Remaining`: Remaining requests in current window
- `X-RateLimit-Reset`: Unix timestamp when limit resets

**Throttle Response:**
When rate limits are exceeded, API returns HTTP 429 (Too Many Requests) with:
- `Retry-After` header indicating when to retry
- Error message with limit details

### Input Validation

All API inputs undergo strict validation to prevent injection attacks and data corruption.

**Validation Layers:**
1. **Schema Validation**: JSON Schema validation for request bodies
2. **Type Validation**: Strict type checking for all parameters
3. **Range Validation**: Min/max constraints for numeric values
4. **Format Validation**: Regex patterns for emails, UUIDs, dates
5. **Content Validation**: File type and size validation for uploads

**Security-Focused Validation:**
- SQL injection prevention through parameterized queries
- NoSQL injection prevention through MongoDB driver protections
- XSS prevention through output encoding
- Command injection prevention by avoiding shell execution
- Path traversal prevention through filename sanitization

**Request Size Limits:**
- JSON payload limit: 10MB
- File upload limit: 100MB per file
- Header size limit: 16KB
- URL length limit: 8KB

### Additional API Security Measures

**CORS (Cross-Origin Resource Sharing):**
- Strict CORS policy with whitelist of approved domains
- Credentials only allowed from trusted origins
- Preflight request handling for complex requests

**API Versioning:**
- Versioned API paths (`/api/v1/`, `/api/v2/`)
- Deprecated versions supported for 6 months with warnings
- Breaking changes only introduced in new major versions

**Security Headers:**
All API responses include security headers:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Content-Security-Policy`: Strict policy definition
- `Referrer-Policy: strict-origin-when-cross-origin`

---

## Implementation Notes

### Security Monitoring

CertFast implements continuous security monitoring:
- Real-time anomaly detection for authentication patterns
- Automated alerting for suspicious activities
- Integration with SIEM (Security Information and Event Management) systems
- Regular penetration testing and vulnerability assessments

### Compliance Alignment

Security measures align with major compliance frameworks:
- SOC 2 Type II
- ISO 27001
- GDPR data protection requirements
- HIPAA (for healthcare implementations)

### Incident Response

Documented incident response procedures:
1. Detection through automated monitoring
2. Containment through automated and manual interventions
3. Investigation with comprehensive audit logs
4. Recovery with minimal service disruption
5. Post-incident analysis and improvements

### Security Training

All team members undergo regular security training:
- Secure coding practices
- Phishing awareness
- Incident response procedures
- Compliance requirement updates

---

*Document Version: 1.0*
*Last Updated: March 2026*
*Owner: Security Architecture Team*
