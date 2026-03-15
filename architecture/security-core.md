# Security Architecture Review - Core Components

This document outlines the security architecture for CertFast, covering the four core security areas essential for protecting sensitive certification data and maintaining compliance with industry standards.

---

## 1. Authentication

Authentication is the foundation of system security, ensuring that only legitimate users can access the platform.

### JWT (JSON Web Tokens)

- **Token Structure**: Uses signed JWTs with RS256 algorithm (RSA with SHA-256)
- **Token Contents**:
  - `sub`: User UUID
  - `org`: Organization ID
  - `role`: User role (admin, auditor, user)
  - `iat`: Issued at timestamp
  - `exp`: Expiration timestamp (24 hours default)
  - `jti`: Unique token identifier for revocation tracking

- **Key Management**:
  - Private keys rotated every 90 days
  - Previous keys retained for 7 days to validate existing tokens
  - Keys stored in hardware security module (HSM) or encrypted key vault

### Session Management

- **Session Lifecycle**:
  - Sessions expire after 24 hours of inactivity
  - Absolute maximum session duration: 7 days
  - Concurrent session limit: 5 per user

- **Session Security**:
  - Secure, HttpOnly cookies for web sessions
  - SameSite=Strict cookie attribute
  - Session binding to IP address and User-Agent fingerprint
  - Automatic session termination on password change

- **Logout Handling**:
  - Server-side token blacklisting for immediate revocation
  - JWT jti tracked in Redis cache with TTL matching token expiry
  - All user sessions can be terminated from admin panel

### Multi-Factor Authentication (MFA)

- **Supported Methods**:
  - TOTP (Time-based One-Time Password) via authenticator apps
  - WebAuthn/FIDO2 for hardware security keys
  - Backup recovery codes (10 single-use codes)

- **MFA Enforcement**:
  - Required for admin and auditor roles
  - Optional but encouraged for standard users
  - Organization-level policy to enforce MFA for all members

---

## 2. Authorization

Authorization ensures users can only access resources and perform actions appropriate to their role.

### RBAC (Role-Based Access Control)

- **Core Roles**:
  - **Super Admin**: Full system access, user management, configuration
  - **Org Admin**: Organization-level management, member administration
  - **Auditor**: Read access to assessments, evidence review, report generation
  - **User**: Standard access, create/manage own assessments, upload evidence
  - **Viewer**: Read-only access to assigned resources

- **Role Hierarchy**:
  - Roles are hierarchical with inheritance
  - Higher roles automatically include lower role permissions
  - Custom roles can be defined per organization with granular permissions

### Permission System

- **Permission Granularity**:
  - Resource-level permissions (view, create, update, delete)
  - Field-level permissions (sensitive data masking)
  - Action-level permissions (approve, reject, export)

- **Permission Examples**:
  - `assessments:read` - View assessments in organization
  - `assessments:write` - Create and update assessments
  - `evidence:upload` - Upload evidence files
  - `users:manage` - Manage organization users
  - `reports:export` - Generate and download reports

### Access Control Lists (ACL)

- **Resource Ownership**:
  - Every resource has an owner (user or organization)
  - Owners have full control over their resources
  - Resources can be shared with specific users or teams

- **Team-Based Access**:
  - Users can be grouped into teams
  - Teams can be assigned to assessments and controls
  - Team permissions override individual permissions

### Authorization Flow

1. User makes API request with JWT token
2. System validates token signature and expiration
3. Extract user ID and role from token claims
4. Check resource ACL for user permissions
5. Verify role has required permission for action
6. Log access attempt (allowed or denied)
7. Execute or reject request

---

## 3. Data Protection

Data protection ensures sensitive information remains confidential and intact throughout its lifecycle.

### Encryption at Rest

- **Database Encryption**:
  - AES-256 encryption for sensitive database fields
  - Transparent Data Encryption (TDE) enabled
  - Encryption keys managed by cloud KMS (AWS KMS / Azure Key Vault)

- **Sensitive Field Encryption**:
  - PII fields (names, emails, phone numbers) encrypted at application layer
  - Evidence files encrypted before storage
  - Encryption uses envelope encryption: data keys encrypted by master key

- **Backup Encryption**:
  - All database backups encrypted with AES-256
  - Backup encryption keys stored separately from data
  - Encrypted backups tested monthly for restoration

### Encryption in Transit

- **Transport Layer Security**:
  - TLS 1.3 required for all connections
  - TLS 1.2 accepted only with secure cipher suites
  - Older TLS versions strictly disabled

- **Certificate Management**:
  - SSL certificates from trusted CA (Let's Encrypt / Cloudflare)
  - Automatic certificate renewal 30 days before expiry
  - Certificate pinning for mobile applications

- **Internal Service Communication**:
  - mTLS (mutual TLS) between microservices
  - Service mesh with automatic certificate rotation
  - Internal traffic encrypted even within VPC

### Data Classification

- **Classification Levels**:
  - **Public**: Marketing materials, public documentation
  - **Internal**: Non-sensitive operational data
  - **Confidential**: Business data, customer information
  - **Restricted**: PII, financial data, audit evidence

- **Handling Requirements**:
  - Restricted data: Encryption required at rest and in transit
  - Confidential data: Access logging required
  - Internal data: Standard security controls
  - Public data: No special handling required

### Data Retention and Disposal

- **Retention Policies**:
  - Audit logs: 7 years (compliance requirement)
  - User data: Until account deletion + 30 days grace period
  - Evidence files: Duration of certification + 1 year
  - Session data: 30 days

- **Secure Disposal**:
  - Cryptographic erasure for encrypted data
  - Physical storage wiped with DoD 5220.22-M standard
  - Deletion logs maintained for compliance

---

## 4. API Security

API security protects the platform from automated attacks and malicious input.

### Rate Limiting

- **Tiered Rate Limits**:
  - **Anonymous**: 10 requests per minute, 100 per hour
  - **Authenticated**: 100 requests per minute, 10,000 per hour
  - **Premium**: 1,000 requests per minute, 100,000 per hour
  - **Internal Services**: 10,000 requests per minute

- **Rate Limit Headers**:
  - `X-RateLimit-Limit`: Maximum requests allowed
  - `X-RateLimit-Remaining`: Requests remaining in window
  - `X-RateLimit-Reset`: Timestamp when limit resets
  - `Retry-After`: Seconds to wait when rate limited (429 response)

- **Burst Handling**:
  - Token bucket algorithm for smooth rate limiting
  - Short bursts allowed up to 2x normal rate
  - WebSocket connections have separate limits

### Input Validation

- **Validation Layers**:
  - Client-side: Immediate user feedback (not security)
  - API Gateway: Schema validation for all requests
  - Application: Business logic validation
  - Database: Constraint enforcement

- **Validation Rules**:
  - Strict type checking for all parameters
  - Length limits on all string inputs
  - Whitelist validation for enums and categories
  - Regex patterns for structured data (emails, UUIDs)

- **File Upload Security**:
  - File type validation by magic numbers (not extension)
  - Maximum file size: 50MB per file
  - Virus scanning with ClamAV before storage
  - Quarantine suspicious files for manual review

### Attack Prevention

- **SQL Injection**:
  - Parameterized queries exclusively
  - ORM usage prevents raw SQL in application code
  - Database user has minimal required permissions

- **Cross-Site Scripting (XSS)**:
  - Output encoding for all user-generated content
  - Content Security Policy (CSP) headers
  - Strict context-specific sanitization

- **Cross-Site Request Forgery (CSRF)**:
  - CSRF tokens for state-changing operations
  - SameSite cookie attributes
  - Origin header validation

### API Security Headers

- **Security Headers Applied**:
  - `Strict-Transport-Security`: HSTS with 1-year max-age
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Content-Security-Policy`: Restrictive default policy
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy`: Minimal feature permissions

### Security Monitoring

- **Logging**:
  - All authentication attempts logged
  - Failed authorization attempts logged with details
  - API rate limit violations tracked
  - Suspicious patterns trigger alerts

- **Alerting**:
  - Multiple failed logins from same IP
  - Unusual API usage patterns
  - Large data exports
  - Privilege escalation attempts

---

## Implementation Notes

### Security Checklist for Deployment

- [ ] TLS certificates installed and valid
- [ ] JWT signing keys generated and secured
- [ ] Database encryption enabled
- [ ] Rate limiting rules configured
- [ ] Security headers applied at load balancer
- [ ] Audit logging enabled
- [ ] MFA enforced for admin accounts
- [ ] Backup encryption verified
- [ ] Security monitoring dashboards configured
- [ ] Incident response runbook updated

### Regular Security Tasks

- **Daily**: Review security alerts and failed login attempts
- **Weekly**: Check rate limit violations and API abuse
- **Monthly**: Rotate service account credentials, test backup restoration
- **Quarterly**: Security architecture review, penetration testing
- **Annually**: Full security audit, compliance certification

---

## Summary

This security architecture provides defense in depth across authentication, authorization, data protection, and API security. Regular review and updates ensure the system remains secure against evolving threats while maintaining usability for legitimate users.
