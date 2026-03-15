# Security Architecture Review - Core Components

This document outlines the security architecture for CertFast's core systems, covering authentication, authorization, data protection, and API security.

---

## 1. Authentication

### JWT-Based Authentication
- **Token Structure**: JSON Web Tokens (JWT) are used for stateless authentication
- **Token Components**:
  - Header: Algorithm (HS256/RS256) and token type
  - Payload: User ID, email, role, issued at (iat), expiration (exp)
  - Signature: Cryptographic signature for integrity verification
- **Access Token Lifetime**: 15 minutes (short-lived for security)
- **Refresh Token Lifetime**: 7 days with rotation on every use
- **Token Storage**: Access tokens in memory; refresh tokens in HTTP-only secure cookies

### Session Management
- **Session Binding**: Tokens are bound to device fingerprint (user-agent + IP hash)
- **Concurrent Session Control**: Maximum 5 active sessions per user
- **Session Invalidation**: Immediate revocation capability via token blacklist
- **Idle Timeout**: Sessions expire after 30 minutes of inactivity
- **Force Logout**: Admin capability to terminate all user sessions

### Multi-Factor Authentication (MFA)
- **TOTP Support**: Time-based One-Time Passwords via authenticator apps
- **Backup Codes**: 10 single-use recovery codes generated at MFA setup
- **MFA Enforcement**: Required for admin roles; optional for standard users
- **Remember Device**: 30-day device trust option (skips MFA on trusted devices)

---

## 2. Authorization

### Role-Based Access Control (RBAC)
- **Role Hierarchy**:
  - `super_admin`: Full system access
  - `org_admin`: Organization-wide management
  - `assessor`: Can create and manage assessments
  - `auditor`: Read-only access to assessments and reports
  - `viewer`: Limited read access to assigned resources

### Permission System
- **Granular Permissions**: 50+ fine-grained permissions across resources
- **Permission Examples**:
  - `users:read` - View user profiles
  - `users:write` - Create and modify users
  - `assessments:full` - Complete assessment control
  - `evidence:submit` - Upload evidence files
  - `reports:export` - Generate and download reports

### Resource-Level Access Control
- **Organization Isolation**: Users can only access resources within their organization
- **Project-Based Access**: Fine-grained access within organizations via project membership
- **Ownership Checks**: Resource creators have implicit management rights
- **Sharing Controls**: Explicit sharing with audit logging for cross-team access

### Access Control Implementation
- **Middleware Enforcement**: All API routes protected by authorization middleware
- **Policy Engine**: Centralized policy evaluation service
- **Audit Logging**: All authorization decisions logged with context
- **Deny-by-Default**: Unspecified permissions default to denied

---

## 3. Data Protection

### Encryption at Rest
- **Database Encryption**: AES-256 encryption for all database storage
- **Field-Level Encryption**: Sensitive fields (PII, credentials) encrypted individually
- **Key Management**: Hardware Security Module (HSM) for encryption key storage
- **Key Rotation**: Automatic key rotation every 90 days
- **Backup Encryption**: All backups encrypted with separate keys

### Encryption in Transit
- **TLS 1.3**: Minimum TLS version for all connections
- **Certificate Pinning**: Public key pinning for mobile applications
- **HSTS**: HTTP Strict Transport Security enforced
- **Perfect Forward Secrecy**: ECDHE key exchange for session keys

### Data Classification
- **Public**: Marketing materials, documentation
- **Internal**: System configurations, non-sensitive logs
- **Confidential**: User profiles, organization data
- **Restricted**: Assessment evidence, compliance reports, PII

### Data Retention and Deletion
- **Retention Policies**:
  - Audit logs: 7 years (compliance requirement)
  - User activity: 2 years
  - Deleted assessments: 30-day soft delete, then permanent removal
- **Right to Erasure**: GDPR-compliant user data deletion within 30 days
- **Secure Deletion**: Cryptographic erasure for sensitive data

### File Storage Security
- **Virus Scanning**: All uploads scanned before storage
- **File Type Validation**: Whitelist-based MIME type verification
- **Size Limits**: Maximum 50MB per file with configurable quotas
- **Storage Isolation**: Per-organization file isolation with unique paths
- **Signed URLs**: Time-limited access URLs for file downloads

---

## 4. API Security

### Rate Limiting
- **Tiered Limits**:
  - Anonymous: 10 requests per minute
  - Authenticated: 100 requests per minute
  - Premium: 1000 requests per minute
- **Burst Allowance**: Short-term burst capacity (2x base limit)
- **Endpoint-Specific Limits**: Stricter limits on expensive operations
- **Rate Limit Headers**: X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset

### Input Validation
- **Schema Validation**: JSON Schema validation for all request bodies
- **Type Enforcement**: Strict type checking for all parameters
- **Sanitization**: HTML sanitization for text fields
- **Length Limits**: Maximum field lengths enforced at API layer
- **SQL Injection Prevention**: Parameterized queries; ORM usage mandatory

### Output Encoding
- **Content-Type Enforcement**: Strict content-type validation
- **JSON Encoding**: Proper escaping of special characters
- **Error Sanitization**: Internal error details never exposed to clients

### API Authentication
- **Bearer Token**: Authorization: Bearer {token} header format
- **API Keys**: Separate API keys for service-to-service communication
- **Scope Enforcement**: Tokens scoped to specific operations
- **Token Binding**: Tokens validated against request origin

### Security Headers
- **CORS Policy**: Whitelist-based origin validation
- **Content Security Policy**: Strict CSP for web interface
- **X-Frame-Options**: DENY to prevent clickjacking
- **X-Content-Type-Options**: nosniff to prevent MIME sniffing

### Request Validation
- **Timestamp Validation**: Requests with timestamps >5 minutes rejected
- **Signature Verification**: HMAC signatures for webhook payloads
- **Replay Prevention**: Nonce tracking for critical operations

---

## Implementation Notes

### Security Monitoring
- Real-time alerting for suspicious patterns
- Automated blocking of IPs with anomalous behavior
- Integration with SIEM for centralized logging

### Incident Response
- Documented security incident procedures
- Automated containment for detected threats
- Regular security drills and penetration testing

### Compliance Alignment
- SOC 2 Type II controls implemented
- GDPR data protection measures
- ISO 27001 security framework alignment

---

## Summary

This security architecture provides defense in depth across all layers of the application. Regular security reviews, automated scanning, and continuous monitoring ensure ongoing protection of CertFast's systems and data.
