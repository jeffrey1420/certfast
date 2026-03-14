# CertFast Security Architecture

**Document Version**: 1.0  
**Date**: March 15, 2026  
**Architect**: System Architect  
**Status**: Draft

---

## Executive Summary

This document outlines the security architecture for CertFast, a compliance automation platform handling sensitive customer data. The architecture follows defense-in-depth principles and maps security controls to SOC 2, ISO 27001, and GDPR requirements.

### Security Objectives

| Objective | Target | Measurement |
|-----------|--------|-------------|
| **Confidentiality** | Prevent unauthorized data access | Zero breaches |
| **Integrity** | Ensure data accuracy | 99.99% data integrity |
| **Availability** | 99.9% uptime | Monthly SLA tracking |
| **Compliance** | SOC 2 Type II, ISO 27001 | Annual certifications |

---

## 1. Security Architecture Overview

### 1.1 Defense in Depth Layers

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  LAYER 1: PERIMETER (AWS WAF + CloudFront)                                  │
│  • DDoS protection (AWS Shield Advanced)                                    │
│  • SQL injection prevention                                                 │
│  • XSS protection                                                           │
│  • Rate limiting (100 req/min per IP)                                       │
│  • Geographic restrictions                                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│  LAYER 2: NETWORK (VPC)                                                     │
│  • Private subnets for databases                                            │
│  • Security groups with least privilege                                     │
│  • Network ACLs                                                             │
│  • VPC Flow Logs                                                            │
│  • No public IPs on compute                                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│  LAYER 3: APPLICATION (API Gateway)                                         │
│  • JWT validation                                                           │
│  • Request size limits (10MB)                                               │
│  • Input validation (Zod schemas)                                           │
│  • CORS whitelist                                                           │
│  • API rate limiting by tier                                                │
├─────────────────────────────────────────────────────────────────────────────┤
│  LAYER 4: SERVICE (Application Code)                                        │
│  • RBAC authorization                                                       │
│  • Parameterized queries (Prisma)                                           │
│  • Output encoding                                                          │
│  • Session management                                                       │
│  • Audit logging                                                            │
├─────────────────────────────────────────────────────────────────────────────┤
│  LAYER 5: DATA (Encryption)                                                 │
│  • TLS 1.3 in transit                                                       │
│  • AES-256 at rest                                                          │
│  • Column-level encryption for PII                                          │
│  • Key rotation (annual)                                                    │
│  • Secure key management (AWS KMS)                                          │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Authentication & Authorization

### 2.1 Authentication Flow

```
┌─────────┐     ┌─────────────┐     ┌──────────┐     ┌─────────────┐
│  User   │────▶│  Auth0      │────▶│  CertFast│────▶│  Database   │
│         │◀────│  (OAuth2)   │◀────│  API     │◀────│  (Session)  │
└─────────┘     └─────────────┘     └──────────┘     └─────────────┘
                                         │
                                         ▼
                                    ┌─────────────┐
                                    │  JWT Token  │
                                    │  RS256      │
                                    └─────────────┘
```

**Authentication Methods:**
- **Password-based**: Username/password via Auth0
- **Social login**: Google, Microsoft (OIDC)
- **Enterprise SSO**: SAML 2.0, OIDC (Enterprise tier)
- **MFA**: TOTP (Google Authenticator), SMS, Email

### 2.2 JWT Token Structure

```json
{
  "sub": "550e8400-e29b-41d4-a716-446655440000",
  "iss": "https://auth.certfast.io/",
  "aud": "https://api.certfast.io",
  "iat": 1710503400,
  "exp": 1710507000,
  "scope": "read:frameworks write:evidence",
  "tenant_id": "660e8400-e29b-41d4-a716-446655440001",
  "role": "admin",
  "mfa_verified": true,
  "jti": "unique-token-id"
}
```

### 2.3 Role-Based Access Control (RBAC)

| Role | Permissions | Tier Availability |
|------|-------------|-------------------|
| **Owner** | Full access + billing management | All |
| **Admin** | User management, all settings | Starter+ |
| **Compliance Manager** | Controls, evidence, frameworks | All |
| **Auditor** | Read-only + export reports | Pro+ |
| **Viewer** | Read-only dashboard | Starter+ |

**Permission Matrix:**

| Resource | Owner | Admin | Compliance Manager | Auditor | Viewer |
|----------|-------|-------|-------------------|---------|--------|
| Company settings | RW | R | R | - | - |
| Users | RW | RW | R | - | - |
| Frameworks | RW | RW | RW | R | R |
| Controls | RW | RW | RW | R | R |
| Evidence | RW | RW | RW | R | R |
| Audits | RW | RW | RW | RW | R |
| Billing | RW | - | - | - | - |
| Exports | RW | RW | RW | RW | R |

### 2.4 Session Management

```sql
-- Session table security features
CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL UNIQUE, -- SHA-256 hashed
    ip_address INET,
    user_agent TEXT,
    device_fingerprint VARCHAR(255), -- For anomaly detection
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_activity_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL,
    revoked BOOLEAN DEFAULT false
);
```

**Session Policies:**
- **Idle timeout**: 30 minutes
- **Absolute timeout**: 12 hours
- **Concurrent sessions**: Max 5 per user
- **Revocation**: Immediate on password change / suspicious activity

---

## 3. Data Protection

### 3.1 Encryption Strategy

| Data State | Algorithm | Key Management |
|------------|-----------|----------------|
| **In Transit** | TLS 1.3 | AWS Certificate Manager |
| **At Rest (DB)** | AES-256-GCM | AWS RDS encryption |
| **At Rest (S3)** | AES-256 | AWS S3-SSE-KMS |
| **PII Fields** | AES-256-GCM + envelope | AWS KMS |
| **Secrets** | N/A | AWS Secrets Manager |
| **Backups** | AES-256 | Same as source |

### 3.2 Column-Level Encryption

```typescript
// PII fields encrypted with AWS KMS
const encryptedFields = [
  'users.email',
  'users.phone',
  'companies.billing_address',
  'partners.credentials'
];

// Encryption helper
async function encryptPII(plaintext: string): Promise<string> {
  const result = await kms.encrypt({
    KeyId: process.env.KMS_KEY_ID,
    Plaintext: Buffer.from(plaintext)
  }).promise();
  return result.CiphertextBlob.toString('base64');
}
```

### 3.3 Data Classification

| Classification | Examples | Handling |
|----------------|----------|----------|
| **Public** | Marketing content, public docs | Standard handling |
| **Internal** | System configs, non-sensitive logs | Access logging |
| **Confidential** | Customer data, compliance evidence | Encryption + RBAC |
| **Restricted** | API keys, credentials, audit logs | Encryption + strict RBAC |

---

## 4. Network Security

### 4.1 VPC Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              AWS VPC (eu-west-1)                            │
│  CIDR: 10.0.0.0/16                                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────┐    ┌─────────────────────────┐                │
│  │    PUBLIC SUBNETS       │    │    PRIVATE SUBNETS      │                │
│  │    (10.0.1.0/24)        │    │    (10.0.10.0/24)       │                │
│  │                         │    │                         │                │
│  │  ┌─────────────────┐    │    │  ┌─────────────────┐    │                │
│  │  │  ALB            │    │    │  │  ECS Fargate    │    │                │
│  │  │  (Public IP)    │◀───┼────┼──│  (No Public IP) │    │                │
│  │  └─────────────────┘    │    │  └─────────────────┘    │                │
│  │                         │    │                         │                │
│  └─────────────────────────┘    └─────────────────────────┘                │
│           │                              │                                  │
│           ▼                              ▼                                  │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                      PRIVATE SUBNETS (DATA)                         │   │
│  │                      (10.0.20.0/24)                                 │   │
│  │                                                                     │   │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐     │   │
│  │  │  RDS PostgreSQL │  │  ElastiCache    │  │  VPC Endpoints  │     │   │
│  │  │  (Multi-AZ)     │  │  Redis          │  │  (S3, KMS, etc) │     │   │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────┘     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  NAT Gateway (for outbound from private subnets)                    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Security Groups

| Service | Inbound | Outbound |
|---------|---------|----------|
| **ALB** | 443 from 0.0.0.0/0 | 80/443 to ECS |
| **ECS** | 80/443 from ALB | 5432 to RDS, 6379 to Redis, 443 to AWS APIs |
| **RDS** | 5432 from ECS | None (isolated) |
| **Redis** | 6379 from ECS | None (isolated) |

### 4.3 WAF Rules

```json
{
  "Name": "CertFastWAF",
  "Rules": [
    {
      "Name": "SQLInjectionProtection",
      "Priority": 1,
      "Statement": {
        "ManagedRuleGroupStatement": {
          "VendorName": "AWS",
          "Name": "AWSManagedRulesSQLiRuleSet"
        }
      }
    },
    {
      "Name": "RateLimit",
      "Priority": 2,
      "Statement": {
        "RateBasedStatement": {
          "Limit": 2000,
          "AggregateKeyType": "IP"
        }
      },
      "Action": { "Block": {} }
    },
    {
      "Name": "GeoBlock",
      "Priority": 3,
      "Statement": {
        "GeoMatchStatement": {
          "CountryCodes": ["CN", "RU", "KP", "IR"]
        }
      },
      "Action": { "Block": {} }
    }
  ]
}
```

---

## 5. Application Security

### 5.1 Input Validation

```typescript
// Zod schema validation
const ControlUpdateSchema = z.object({
  status: z.enum(['not_started', 'in_progress', 'implemented']),
  assigned_to: z.string().uuid().optional(),
  due_date: z.string().date().optional(),
  implementation_notes: z.string().max(5000).optional()
});

// Sanitization
const sanitizeHtml = (input: string): string => {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br'],
    ALLOWED_ATTR: []
  });
};
```

### 5.2 Output Encoding

```typescript
// JSON serialization with safe defaults
const safeJsonResponse = (data: unknown) => {
  return JSON.stringify(data, (key, value) => {
    // Prevent prototype pollution
    if (key === '__proto__' || key === 'constructor') {
      return undefined;
    }
    return value;
  });
};
```

### 5.3 File Upload Security

```typescript
// Evidence upload validation
const uploadConfig = {
  allowedTypes: [
    'application/pdf',
    'image/png',
    'image/jpeg',
    'text/plain',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ],
  maxSize: 100 * 1024 * 1024, // 100MB
  virusScan: true, // ClamAV integration
  malwareScan: true
};

// S3 bucket policy for evidence
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DenyUnencryptedUploads",
      "Effect": "Deny",
      "Principal": "*",
      "Action": "s3:PutObject",
      "Resource": "arn:aws:s3:::certfast-evidence/*",
      "Condition": {
        "StringNotEquals": {
          "s3:x-amz-server-side-encryption": "aws:kms"
        }
      }
    }
  ]
}
```

---

## 6. Audit & Logging

### 6.1 Audit Log Requirements

| Event Type | Fields Retained | Retention |
|------------|-----------------|-----------|
| **Authentication** | User, IP, method, result, MFA | 1 year |
| **Authorization** | User, resource, action, result | 7 years |
| **Data Access** | User, record, action, timestamp | 7 years |
| **Data Changes** | User, old/new values, timestamp | 7 years |
| **Admin Actions** | Admin, action, target, justification | 7 years |

### 6.2 Log Format

```json
{
  "timestamp": "2026-03-15T10:30:00.000Z",
  "level": "info",
  "service": "certfast-api",
  "environment": "production",
  "request_id": "550e8400-e29b-41d4-a716-446655440000",
  "trace_id": "trace-abc123",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "role": "admin"
  },
  "company": {
    "id": "660e8400-e29b-41d4-a716-446655440001"
  },
  "event": {
    "type": "control.updated",
    "entity_type": "control",
    "entity_id": "990e8400-e29b-41d4-a716-446655440004",
    "action": "update",
    "changes": {
      "status": {
        "from": "in_progress",
        "to": "implemented"
      }
    }
  },
  "context": {
    "ip": "203.0.113.42",
    "user_agent": "Mozilla/5.0...",
    "session_id": "sess_xyz789"
  }
}
```

### 6.3 Log Aggregation

```yaml
# Datadog log pipeline
logs:
  - type: file
    path: /var/log/certfast/*.json
    service: certfast-api
    source: nodejs
    tags:
      - env:production
      - region:eu-west-1
```

---

## 7. Compliance Mapping

### 7.1 SOC 2 Trust Service Criteria

| Criteria | Control | Implementation |
|----------|---------|----------------|
| **CC6.1** | Logical access security | RBAC, MFA, session management |
| **CC6.2** | Access removal | Automated offboarding, session revocation |
| **CC6.3** | Access changes | Audit logging, approval workflows |
| **CC7.1** | Security operations | SIEM, alerting, incident response |
| **CC7.2** | System monitoring | Datadog APM, CloudWatch |
| **CC8.1** | Change management | CI/CD pipelines, code review |
| **A1.1** | Availability | Multi-AZ, auto-scaling, backups |

### 7.2 ISO 27001 Controls

| Control | Description | Implementation |
|---------|-------------|----------------|
| **A.9.1** | Access control policy | RBAC, documented policies |
| **A.9.2** | User access management | Auth0, automated provisioning |
| **A.9.4** | System access control | Password policy, MFA, session timeout |
| **A.10.1** | Cryptographic controls | TLS 1.3, AES-256, KMS |
| **A.12.3** | Backup | Automated RDS backups, S3 versioning |
| **A.13.1** | Network security | VPC, WAF, security groups |
| **A.16.1** | Incident management | PagerDuty, runbooks, SLAs |

### 7.3 GDPR Requirements

| Requirement | Implementation |
|-------------|----------------|
| **Article 25** (Privacy by Design) | Data minimization, encryption by default |
| **Article 30** (Records) | Automated audit logging |
| **Article 32** (Security) | Encryption, access controls, testing |
| **Article 33** (Breach notification) | 72-hour alerting pipeline |
| **Article 17** (Right to erasure) | Soft delete + 30-day purge |
| **Article 20** (Data portability) | Export APIs, standard formats |

---

## 8. Incident Response

### 8.1 Severity Levels

| Severity | Criteria | Response Time | Notification |
|----------|----------|---------------|--------------|
| **Critical** | Data breach, system compromise | 15 min | CEO, Legal, Security |
| **High** | Potential breach, major vulnerability | 1 hour | CTO, Security Lead |
| **Medium** | Minor security issue | 4 hours | Engineering |
| **Low** | Security enhancement | 24 hours | Backlog |

### 8.2 Response Playbook

```
DETECT → TRIAGE → CONTAIN → ERADICATE → RECOVER → POST-INCIDENT
   │        │         │          │          │           │
   │        │         │          │          │           └── Lessons learned
   │        │         │          │          │               Process updates
   │        │         │          │          └── Restore from backups
   │        │         │          │              Verify integrity
   │        │         │          └── Remove threat
   │        │         │             Patch vulnerability
   │        │         └── Isolate affected systems
   │        │            Revoke compromised credentials
   │        └── Assess scope and impact
   │           Assign severity
   └── Automated alerts (Datadog)
       Manual reports (security@certfast.io)
```

---

## 9. Security Testing

### 9.1 Testing Schedule

| Test Type | Frequency | Provider |
|-----------|-----------|----------|
| **Vulnerability scanning** | Weekly | Snyk, Dependabot |
| **Penetration testing** | Quarterly | External firm |
| **Code review** | Every PR | SonarQube, manual |
| **Infrastructure scanning** | Daily | AWS Inspector |
| **DAST** | Weekly | OWASP ZAP |

### 9.2 Penetration Testing Scope

```
Test Coverage:
├── External
│   ├── Web application (OWASP Top 10)
│   ├── API endpoints
│   ├── Partner integration points
│   └── Social engineering (with approval)
├── Internal
│   ├── Network segmentation
│   ├── Privilege escalation
│   └── Lateral movement
└── Cloud
    ├── IAM permissions
    ├── S3 bucket policies
    └── VPC configuration
```

---

## 10. Vendor Security

### 10.1 Critical Vendor Assessment

| Vendor | Purpose | Data Access | SOC 2 | GDPR DPA |
|--------|---------|-------------|-------|----------|
| AWS | Infrastructure | All data | ✅ | ✅ |
| Auth0 | Authentication | Credentials | ✅ | ✅ |
| Stripe | Payments | Billing data | ✅ | ✅ |
| Datadog | Monitoring | Logs, metrics | ✅ | ✅ |
| SendGrid | Email | Email addresses | ✅ | ✅ |

### 10.2 Vendor Risk Tiers

| Tier | Criteria | Review Frequency |
|------|----------|------------------|
| **Critical** | Access to customer data, infrastructure | Quarterly |
| **High** | Access to PII, financial data | Annually |
| **Medium** | Operational support | Bi-annually |
| **Low** | Non-sensitive services | Onboarding only |

---

**Document Complete**  
**Next**: Infrastructure as Code Templates
