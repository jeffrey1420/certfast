# Security Architecture Review - Core Components

This document outlines the security measures and implementation strategies for CertFast's core security components.

---

## 1. Authentication

Authentication is the foundation of our security model, ensuring that only verified users can access the system.

### JWT-Based Authentication

- **Token Structure**: Signed JWT tokens with RS256 algorithm
- **Payload Contents**: User ID, email, role, organization ID, issued at (iat), expiration (exp)
- **Token Lifespan**: Access tokens expire after 15 minutes; refresh tokens valid for 7 days
- **Secret Management**: Private keys stored in AWS Secrets Manager with rotation every 90 days

### Session Management

- **Session Storage**: Redis cluster for distributed session state
- **Session Binding**: Tokens bound to IP address and User-Agent fingerprint
- **Concurrent Sessions**: Maximum 5 concurrent sessions per user account
- **Session Termination**: Users can revoke all active sessions from profile settings
- **Idle Timeout**: Sessions automatically expire after 30 minutes of inactivity

### Multi-Factor Authentication (MFA)

- **TOTP Support**: Time-based One-Time Passwords via authenticator apps (Google Authenticator, Authy)
- **Backup Codes**: 10 single-use backup codes generated during MFA setup
- **Enforcement**: MFA required for admin roles; optional for standard users
- **Recovery**: Secure account recovery via verified email with 24-hour cooldown

### Password Security

- **Requirements**: Minimum 12 characters, uppercase, lowercase, numbers, special characters
- **Hashing Algorithm**: Argon2id with memory cost of 64MB, 3 iterations, parallelism of 4
- **Breach Detection**: Integration with Have I Been Pwned API to check against known breaches
- **Password History**: Prevents reuse of last 12 passwords
- **Expiry Policy**: Passwords never expire; forced reset only on suspected compromise

---

## 2. Authorization

Authorization determines what authenticated users can do within the system.

### Role-Based Access Control (RBAC)

- **Role Hierarchy**:
  - `super_admin`: Full system access (platform operations team only)
  - `org_admin`: Organization-level administration, user management, billing
  - `compliance_officer`: Create assessments, review evidence, generate reports
  - `auditor`: Read-only access to assessments and evidence
  - `assessor`: Submit evidence, update control status
  - `viewer`: Read-only access to assigned resources

- **Permission Granularity**: 47 fine-grained permissions mapped to roles
- **Role Assignment**: One primary role per user with optional secondary roles
- **Inheritance**: Organization settings inherited by default; can be overridden at project level

### Resource-Level Permissions

- **Ownership Model**: Every resource has an owner (user) and organization
- **Sharing Controls**: Resources can be shared with specific users or teams
- **Permission Levels**: None, View, Comment, Edit, Admin (full control including deletion)
- **Inheritance Chain**: Organization → Team → Project → Resource

### Access Control Lists (ACL)

- **Implementation**: PostgreSQL row-level security policies enforced at database level
- **Query Filtering**: All queries automatically filtered by user's accessible organization IDs
- **API Enforcement**: Authorization checks at middleware layer before controller logic
- **Audit Trail**: Every permission check logged with timestamp, user, resource, decision

### Dynamic Authorization

- **Time-Based Access**: Temporary elevated access with automatic expiration
- **Approval Workflows**: Sensitive operations require secondary approval
- **Just-in-Time Access**: Users can request temporary permission grants with justification
- **Break-Glass Procedures**: Emergency access procedures with mandatory post-incident review

---

## 3. Data Protection

Data protection ensures confidentiality and integrity of sensitive information.

### Encryption at Rest

- **Database Encryption**: AES-256-GCM for all PostgreSQL data files
- **Key Management**: AWS KMS with customer-managed keys (CMK)
- **Field-Level Encryption**: Additional encryption for PII fields (SSN, tax ID) with separate key hierarchy
- **Backup Encryption**: All backups encrypted with GPG before storage
- **Key Rotation**: Automatic annual rotation of encryption keys with 30-day overlap period

### Encryption in Transit

- **TLS Configuration**: TLS 1.3 minimum; TLS 1.2 supported for legacy compatibility
- **Certificate Management**: Let's Encrypt with automatic renewal
- **HSTS**: Strict Transport Security with 2-year max-age
- **Perfect Forward Secrecy**: ECDHE key exchange with X25519 and P-256 curves
- **Cipher Suites**: Only AEAD ciphers allowed (AES-GCM, ChaCha20-Poly1305)

### Data Classification

- **Public**: Marketing materials, API documentation
- **Internal**: Employee handbooks, non-sensitive operational data
- **Confidential**: Customer data, assessment results, financial records
- **Restricted**: Authentication credentials, encryption keys, audit logs

### Data Retention and Disposal

- **Retention Policy**: Customer data retained for duration of contract plus 7 years
- **Right to Deletion**: GDPR-compliant deletion within 30 days of request
- **Secure Disposal**: Cryptographic erasure (delete encryption keys) followed by physical deletion
- **Archive Encryption**: Archived data encrypted with separate keys stored offline

---

## 4. API Security

API security protects the system's interfaces from abuse and attacks.

### Rate Limiting

- **Tiered Limits**:
  - Free tier: 100 requests per minute, 1,000 per hour
  - Professional: 1,000 requests per minute, 10,000 per hour
  - Enterprise: 10,000 requests per minute, 100,000 per hour

- **Burst Handling**: Token bucket algorithm allowing short bursts
- **Per-Endpoint Limits**: Stricter limits on expensive operations (exports, bulk updates)
- **Penalty Box**: Violators blocked for 1 hour; repeated violations escalate to 24-hour ban
- **Headers**: Rate limit info returned in `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`

### Input Validation

- **Schema Validation**: OpenAPI schema validation on all requests
- **Type Coercion**: Strict mode; unexpected types rejected rather than coerced
- **Size Limits**: Request body max 10MB; query string max 4KB
- **Sanitization**: HTML encoding for all user input before storage
- **SQL Injection Prevention**: Parameterized queries exclusively; ORM use enforced
- **NoSQL Injection**: MongoDB query operators blocked in user input

### Output Encoding

- **JSON Encoding**: Proper escaping of special characters
- **Content-Type Headers**: Strictly enforced; no MIME sniffing
- **Download Security**: Content-Disposition headers for file downloads
- **Error Sanitization**: Internal error details never exposed to clients

### API Authentication

- **Bearer Tokens**: OAuth 2.0 bearer tokens in Authorization header
- **API Keys**: Separate API keys for service-to-service communication with IP whitelist
- **Scope Validation**: Tokens checked against required scopes for each endpoint
- **Token Binding**: Tokens cryptographically bound to TLS session where possible

### Additional Protections

- **CORS Policy**: Whitelist-based; preflight caching for 1 hour
- **CSRF Protection**: Double-submit cookie pattern for state-changing operations
- **Request Signing**: Optional HMAC request signing for sensitive webhooks
- **API Versioning**: Version in URL path; deprecated versions supported for 12 months

---

## Implementation Notes

### Technology Stack

- **Authentication**: Auth0 for identity management, custom JWT implementation
- **Authorization**: Oso policy engine for fine-grained access control
- **Encryption**: AWS KMS, OpenSSL for TLS
- **Rate Limiting**: Redis-backed rate limiter with fallback to in-memory

### Monitoring and Alerting

- **Failed Login Tracking**: Alert on 10+ failed attempts from single IP in 5 minutes
- **Privilege Escalation Detection**: Alert on unusual role assignments
- **Data Exfiltration**: Monitor for bulk data access patterns
- **Security Dashboard**: Real-time view of authentication events, blocked requests, active sessions

### Compliance Alignment

- **SOC 2 Type II**: Security controls mapped to Trust Services Criteria
- **ISO 27001**: Controls aligned with Annex A requirements
- **GDPR**: Data protection by design; privacy impact assessments documented
- **HIPAA**: Business Associate Agreements in place; PHI access logging implemented

### Incident Response

- **Response Time**: Security incidents acknowledged within 1 hour
- **Communication**: Automated customer notification for data breaches within 72 hours
- **Forensics**: Comprehensive audit logs retained for 1 year
- **Recovery**: Documented procedures for key compromise, credential rotation

---

## Summary

The security architecture implements defense in depth across authentication, authorization, data protection, and API security layers. Regular security reviews, penetration testing, and compliance audits ensure continued effectiveness against evolving threats.

**Last Updated**: March 15, 2026  
**Next Review**: June 15, 2026  
**Owner**: Security Architecture Team
