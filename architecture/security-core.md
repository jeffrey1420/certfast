# Security Architecture Review - Core Components

This document outlines the comprehensive security measures implemented across four critical areas of the CertFast platform: Authentication, Authorization, Data Protection, and API Security.

---

## 1. Authentication

Authentication ensures that only verified users can access the system. CertFast implements a multi-layered authentication approach.

### JWT-Based Authentication

- **Token Structure**: JWT tokens contain three parts - Header (algorithm & type), Payload (user claims), and Signature (verification hash)
- **Token Types**:
  - **Access Tokens**: Short-lived (15 minutes), used for API requests
  - **Refresh Tokens**: Long-lived (7 days), used to obtain new access tokens without re-authentication
- **Signing Algorithm**: RS256 (RSA with SHA-256) using asymmetric key pairs
- **Token Claims**:
  - `sub`: User ID (UUID)
  - `iss`: Token issuer (certfast.io)
  - `aud`: Intended audience (api.certfast.io)
  - `iat`: Issued at timestamp
  - `exp`: Expiration timestamp
  - `org`: Organization ID
  - `role`: User role identifier

### Session Management

- **Session Lifecycle**:
  - Sessions are created upon successful authentication
  - Session metadata includes IP address, user agent, and timestamp
  - Sessions can be invalidated server-side via token blacklisting
- **Concurrent Session Control**:
  - Maximum 5 active sessions per user
  - Users can view and revoke active sessions from profile settings
  - Automatic session termination on password change
- **Session Timeout**:
  - Idle timeout: 30 minutes of inactivity
  - Absolute timeout: 12 hours maximum session duration
  - Sliding refresh for active users

### Multi-Factor Authentication (MFA)

- **Supported Methods**:
  - TOTP (Time-based One-Time Password) via authenticator apps
  - SMS-based verification codes
  - Hardware security keys (WebAuthn/FIDO2)
- **Enrollment**: Mandatory for admin roles, optional for standard users
- **Backup Codes**: 10 single-use backup codes generated during MFA setup

### Password Security

- **Requirements**:
  - Minimum 12 characters
  - Must contain uppercase, lowercase, number, and special character
  - No common passwords or dictionary words
  - Maximum password age: 90 days for privileged accounts
- **Storage**: Passwords hashed using Argon2id with:
  - Memory cost: 64 MB
  - Iterations: 3
  - Parallelism: 4 threads
- **Breach Detection**: Integration with Have I Been Pwned API to check against known breached passwords

---

## 2. Authorization

Authorization determines what authenticated users are permitted to do within the system.

### Role-Based Access Control (RBAC)

- **Role Hierarchy**:
  - **Super Admin**: Full system access across all organizations
  - **Org Admin**: Full access within their organization
  - **Compliance Manager**: Can create assessments, manage controls, view reports
  - **Auditor**: Read-only access to assessments and evidence
  - **Standard User**: Limited access to assigned assessments only
- **Role Assignment**:
  - Roles assigned at organization level
  - Users can have different roles in different organizations
  - Role changes logged in audit trail with justification

### Permission Model

- **Granular Permissions**:
  - `users:read`, `users:write`, `users:delete`
  - `orgs:read`, `orgs:write`, `orgs:delete`
  - `assessments:read`, `assessments:write`, `assessments:submit`
  - `controls:read`, `controls:write`, `controls:approve`
  - `evidence:read`, `evidence:write`, `evidence:delete`
  - `reports:read`, `reports:export`, `reports:share`
- **Permission Inheritance**: Permissions flow down from organization to assessments to controls
- **Custom Roles**: Organizations can create custom roles with specific permission combinations

### Access Control Lists (ACL)

- **Resource-Level Access**:
  - Each resource has an owner and access control list
  - Fine-grained access can be granted to individual users or groups
  - Access can be time-bound with expiration dates
- **Default Deny**: All access denied by default, explicitly granted only
- **Access Reviews**: Quarterly access reviews for privileged accounts

### Attribute-Based Access Control (ABAC)

- **Dynamic Policies**:
  - Access decisions based on user attributes, resource attributes, and environmental conditions
  - Examples: Time-based restrictions, location-based access, device trust levels
- **Policy Evaluation**:
  - Real-time policy engine evaluates access requests
  - Caching of policy decisions for performance (5-minute TTL)

---

## 3. Data Protection

Data protection ensures confidentiality and integrity of sensitive information throughout its lifecycle.

### Encryption at Rest

- **Database Encryption**:
  - AES-256-GCM encryption for all database files
  - Transparent Data Encryption (TDE) enabled
  - Encryption keys stored in Hardware Security Module (HSM)
- **Field-Level Encryption**:
  - Sensitive fields (SSN, credit cards, PII) encrypted individually
  - Deterministic encryption for searchable fields
  - Randomized encryption for non-searchable fields
- **File Storage Encryption**:
  - All uploaded evidence files encrypted with AES-256
  - Unique encryption key per file
  - Key envelope encryption with master key rotation every 90 days
- **Backup Encryption**:
  - All backups encrypted with separate encryption keys
  - Backup keys stored in geographically separated location
  - Encrypted backups tested monthly for restore capability

### Encryption in Transit

- **TLS Configuration**:
  - TLS 1.3 required for all connections
  - TLS 1.2 allowed only for legacy system compatibility
  - Weak cipher suites disabled (no RC4, 3DES, or export ciphers)
- **Certificate Management**:
  - Wildcard SSL certificates from trusted CA
  - Automatic certificate renewal 30 days before expiration
  - Certificate pinning for mobile applications
- **HSTS (HTTP Strict Transport Security)**:
  - max-age: 2 years
  - includeSubDomains: enabled
  - preload: enabled
- **Perfect Forward Secrecy**:
  - ECDHE key exchange for all connections
  - Session keys never persist beyond session lifetime

### Key Management

- **Key Hierarchy**:
  - Root Key (stored in HSM, never leaves hardware)
  - Master Encryption Keys (encrypted by Root Key)
  - Data Encryption Keys (encrypted by Master Keys)
- **Key Rotation**:
  - Data encryption keys rotated every 90 days
  - Master keys rotated annually
  - Root key ceremony performed with dual control
- **Key Access**:
  - Keys accessible only through authenticated API
  - All key access logged and audited
  - Emergency key destruction capability

### Data Classification

- **Classification Levels**:
  - **Public**: No restriction, freely shareable
  - **Internal**: Organization members only
  - **Confidential**: Restricted to specific roles
  - **Restricted**: Highly sensitive, encryption required
- **Data Labeling**: Automatic classification based on content analysis
- **Retention Policies**: Automatic purging based on classification and age

### Data Loss Prevention (DLP)

- **Content Inspection**: Real-time scanning for sensitive data patterns
- **Exfiltration Prevention**: Block bulk downloads, restrict export formats
- **Email Protection**: DLP rules for outbound emails containing sensitive data

---

## 4. API Security

API security protects the platform's interfaces from abuse and attacks.

### Rate Limiting

- **Tiered Limits**:
  - **Free Tier**: 100 requests per hour
  - **Standard**: 1,000 requests per hour
  - **Enterprise**: 10,000 requests per hour
  - **Burst Allowance**: 10x limit for 1 minute
- **Rate Limit Headers**:
  - `X-RateLimit-Limit`: Maximum requests allowed
  - `X-RateLimit-Remaining`: Requests remaining in window
  - `X-RateLimit-Reset`: Unix timestamp when limit resets
- **Penalty System**:
  - Progressive penalties for repeated violations
  - Temporary IP blocking after 5 violations
  - Permanent ban for abuse patterns

### Input Validation

- **Validation Layers**:
  - Client-side validation for user experience
  - Server-side validation for security (authoritative)
  - Database constraints for data integrity
- **Validation Rules**:
  - Strict type checking for all inputs
  - Length limits on all string fields
  - Whitelist validation for enumerated values
  - Regular expression validation for formatted fields (email, phone)
  - SQL injection prevention via parameterized queries
  - NoSQL injection prevention via query sanitization
- **File Upload Security**:
  - File type validation via magic numbers (not extension)
  - File size limits (max 50MB per file)
  - Antivirus scanning before storage
  - Quarantine for suspicious files

### Output Encoding

- **Response Encoding**: All outputs encoded to prevent XSS
- **Content Security Policy**:
  - `default-src 'self'`
  - `script-src 'self' 'nonce-{random}'`
  - `style-src 'self' 'unsafe-inline'`
  - `img-src 'self' data: https:`
  - `connect-src 'self' api.certfast.io`
  - `frame-ancestors 'none'`

### API Authentication

- **Bearer Token**: Standard Authorization header with JWT
- **API Keys**: Long-lived keys for service-to-service communication
- **OAuth 2.0**: PKCE flow for third-party integrations
- **mTLS**: Mutual TLS for high-security integrations

### Error Handling

- **Generic Error Messages**: No stack traces or sensitive data in errors
- **Error Codes**: Consistent error codes for client handling
- **Logging**: Full error details logged securely for debugging
- **Status Codes**: Appropriate HTTP status codes for all scenarios

### Security Headers

- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

### API Versioning

- **Version in URL**: `/api/v1/`, `/api/v2/`
- **Deprecation Policy**: 6-month notice before API version sunset
- **Breaking Changes**: Only in major version updates

---

## Implementation Notes

### Security Monitoring

- **SIEM Integration**: All security events sent to centralized SIEM
- **Real-time Alerts**: Immediate notification for critical security events
- **Threat Intelligence**: Integration with external threat feeds

### Security Testing

- **SAST**: Static analysis on every commit
- **DAST**: Weekly dynamic scanning of production
- **Penetration Testing**: Quarterly third-party penetration tests
- **Bug Bounty**: Public bug bounty program for responsible disclosure

### Incident Response

- **Playbooks**: Documented procedures for common security incidents
- **Response Time**: 1-hour response for critical incidents
- **Post-Mortems**: Mandatory post-incident reviews within 48 hours

### Compliance

- **SOC 2 Type II**: Annual audit for security controls
- **ISO 27001**: Certified information security management
- **GDPR**: Data protection compliance for EU users
- **CCPA**: California Consumer Privacy Act compliance

---

*Last Updated: March 2026*
*Document Owner: Security Architecture Team*
*Review Cycle: Quarterly*
