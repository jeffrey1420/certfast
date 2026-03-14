# CertFast API Specification

**Document Version**: 1.0  
**Date**: March 15, 2026  
**Architect**: System Architect  
**Status**: Draft  
**Format**: OpenAPI 3.0.3

---

## Executive Summary

This document defines the RESTful API specification for CertFast's compliance automation platform. The API supports customer-facing operations, partner integrations for CPA firms, and webhook event handling.

### API Design Principles

1. **RESTful**: Resource-oriented URLs, standard HTTP methods
2. **Versioned**: URL versioning (`/v1/`)
3. **Consistent**: Standard response formats and error handling
4. **Secure**: OAuth 2.0 + JWT authentication
5. **Documented**: OpenAPI specification with examples

---

## 1. API Overview

### 1.1 Base URLs

| Environment | URL |
|-------------|-----|
| Production | `https://api.certfast.io/v1` |
| Staging | `https://api-staging.certfast.io/v1` |
| Sandbox | `https://api-sandbox.certfast.io/v1` |

### 1.2 Authentication

#### Customer API (JWT)
```
Authorization: Bearer {jwt_token}
```

#### Partner API (OAuth 2.0 Client Credentials)
```
Authorization: Bearer {access_token}
X-API-Key: {partner_api_key}
```

### 1.3 Standard Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Authorization` | Yes | Bearer token |
| `Content-Type` | Yes | `application/json` |
| `X-Request-ID` | No | UUID for request tracing |
| `X-Idempotency-Key` | For POST/PUT | UUID to prevent duplicates |

### 1.4 Response Format

**Success Response:**
```json
{
  "data": { ... },
  "meta": {
    "request_id": "550e8400-e29b-41d4-a716-446655440000",
    "timestamp": "2026-03-15T10:30:00Z"
  }
}
```

**List Response:**
```json
{
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 150,
    "total_pages": 8
  },
  "meta": { ... }
}
```

**Error Response:**
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request validation failed",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  },
  "meta": { ... }
}
```

---

## 2. Customer API

### 2.1 Authentication

#### POST /auth/token
Exchange Auth0 code for CertFast access token.

**Request:**
```json
{
  "code": "auth0_authorization_code",
  "redirect_uri": "https://app.certfast.io/callback"
}
```

**Response:**
```json
{
  "data": {
    "access_token": "eyJhbGciOiJSUzI1NiIs...",
    "refresh_token": "dGhpcyBpcyBhIHJlZnJlc2g...",
    "token_type": "Bearer",
    "expires_in": 3600,
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "user@example.com",
      "role": "admin",
      "company": {
        "id": "660e8400-e29b-41d4-a716-446655440001",
        "name": "Acme Corp",
        "tier": "pro"
      }
    }
  }
}
```

---

### 2.2 Companies

#### GET /company
Get current user's company details.

**Response:**
```json
{
  "data": {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "name": "Acme Corp",
    "slug": "acme-corp",
    "tier": "pro",
    "billing_cycle": "annual",
    "industry": "SaaS",
    "employee_count": 45,
    "website": "https://acme.example.com",
    "settings": {
      "timezone": "Europe/Berlin",
      "date_format": "DD/MM/YYYY",
      "language": "en"
    },
    "compliance_status": {
      "soc2": "in_progress",
      "iso27001": "not_started",
      "gdpr": "implemented"
    },
    "limits": {
      "max_frameworks": 3,
      "max_users": 10,
      "max_storage_gb": 100,
      "used_frameworks": 2,
      "used_users": 7,
      "used_storage_gb": 23.5
    },
    "created_at": "2026-01-15T09:00:00Z",
    "updated_at": "2026-03-10T14:30:00Z"
  }
}
```

#### PATCH /company
Update company settings.

**Request:**
```json
{
  "name": "Acme Corporation",
  "industry": "FinTech",
  "settings": {
    "timezone": "Europe/Paris"
  }
}
```

---

### 2.3 Users

#### GET /users
List company users.

**Query Parameters:**
- `page` (integer, default: 1)
- `per_page` (integer, default: 20, max: 100)
- `status` (string: active, inactive, pending)
- `role` (string)

**Response:**
```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "admin@acme.example.com",
      "first_name": "John",
      "last_name": "Doe",
      "role": "admin",
      "status": "active",
      "mfa_enabled": true,
      "last_login_at": "2026-03-14T16:45:00Z",
      "created_at": "2026-01-15T09:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 7,
    "total_pages": 1
  }
}
```

#### POST /users
Invite a new user.

**Request:**
```json
{
  "email": "newuser@acme.example.com",
  "first_name": "Jane",
  "last_name": "Smith",
  "role": "compliance_manager"
}
```

**Response:**
```json
{
  "data": {
    "id": "770e8400-e29b-41d4-a716-446655440002",
    "email": "newuser@acme.example.com",
    "role": "compliance_manager",
    "status": "pending",
    "invitation_token": "inv_abc123xyz",
    "invitation_url": "https://app.certfast.io/invite/inv_abc123xyz",
    "expires_at": "2026-03-22T10:30:00Z"
  }
}
```

#### GET /users/{id}
Get user details.

#### PATCH /users/{id}
Update user (role, status).

#### DELETE /users/{id}
Deactivate user.

---

### 2.4 Frameworks

#### GET /frameworks
List compliance frameworks.

**Query Parameters:**
- `status` (string)
- `type` (string: soc2_type1, soc2_type2, iso27001, gdpr)

**Response:**
```json
{
  "data": [
    {
      "id": "880e8400-e29b-41d4-a716-446655440003",
      "type": "soc2_type2",
      "status": "in_progress",
      "target_date": "2026-06-30",
      "start_date": "2026-01-15",
      "progress": {
        "total_controls": 89,
        "implemented_controls": 67,
        "tested_controls": 45,
        "percentage_complete": 75
      },
      "created_at": "2026-01-15T09:00:00Z"
    }
  ]
}
```

#### POST /frameworks
Start a new framework implementation.

**Request:**
```json
{
  "type": "iso27001",
  "target_date": "2026-09-30"
}
```

**Tier Validation:**
- Lite: Max 1 framework
- Starter: Max 2 frameworks
- Pro/Enterprise: Unlimited

#### GET /frameworks/{id}
Get framework details with controls summary.

#### PATCH /frameworks/{id}
Update framework (target date, settings).

#### DELETE /frameworks/{id}
Abandon framework (requires confirmation).

---

### 2.5 Controls

#### GET /frameworks/{framework_id}/controls
List controls for a framework.

**Query Parameters:**
- `status` (string)
- `priority` (string: critical, high, medium, low)
- `assigned_to` (UUID)
- `category` (string)
- `search` (string - searches title, description)

**Response:**
```json
{
  "data": [
    {
      "id": "990e8400-e29b-41d4-a716-446655440004",
      "code": "CC6.1",
      "title": "Logical Access Security",
      "description": "The entity implements logical access security measures to protect against threats...",
      "category": "Access Control",
      "status": "implemented",
      "priority": "critical",
      "assigned_to": {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "name": "John Doe"
      },
      "due_date": "2026-04-15",
      "implemented_at": "2026-03-01T14:00:00Z",
      "evidence_count": 3,
      "pending_evidence": 0,
      "auto_check": true,
      "last_auto_check_at": "2026-03-14T00:00:00Z",
      "last_auto_check_result": true
    }
  ],
  "pagination": { ... }
}
```

#### GET /controls/{id}
Get control details with evidence.

**Response:**
```json
{
  "data": {
    "id": "990e8400-e29b-41d4-a716-446655440004",
    "framework_id": "880e8400-e29b-41d4-a716-446655440003",
    "code": "CC6.1",
    "title": "Logical Access Security",
    "description": "The entity implements logical access security measures...",
    "framework_reference": "SOC2 CC6.1",
    "category": "Access Control",
    "status": "implemented",
    "priority": "critical",
    "assigned_to": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "John Doe",
      "email": "admin@acme.example.com"
    },
    "due_date": "2026-04-15",
    "implemented_at": "2026-03-01T14:00:00Z",
    "tested_at": null,
    "auto_check": true,
    "auto_check_config": {
      "type": "github_sso_check",
      "repository": "acme-corp/main"
    },
    "evidence_required": true,
    "evidence_types": ["policy", "configuration", "screenshot"],
    "implementation_notes": "Implemented via Okta SSO for all production systems",
    "testing_notes": null,
    "evidence": [
      {
        "id": "aa0e8400-e29b-41d4-a716-446655440005",
        "type": "policy",
        "title": "Access Control Policy v2.1",
        "status": "approved",
        "file_name": "access_control_policy.pdf",
        "file_size": 245760,
        "uploaded_by": "John Doe",
        "uploaded_at": "2026-03-01T14:00:00Z"
      }
    ],
    "tasks": [
      {
        "id": "bb0e8400-e29b-41d4-a716-446655440006",
        "title": "Document MFA implementation",
        "status": "completed",
        "due_date": "2026-03-01"
      }
    ],
    "comments": [
      {
        "id": "cc0e8400-e29b-41d4-a716-446655440007",
        "content": "Verified SSO is enforced for all users",
        "user": "Jane Smith",
        "created_at": "2026-03-02T09:30:00Z"
      }
    ],
    "created_at": "2026-01-15T09:00:00Z",
    "updated_at": "2026-03-01T14:00:00Z"
  }
}
```

#### PATCH /controls/{id}
Update control status and assignments.

**Request:**
```json
{
  "status": "implemented",
  "assigned_to": "550e8400-e29b-41d4-a716-446655440000",
  "implementation_notes": "Implemented via Okta SSO",
  "due_date": "2026-04-15"
}
```

---

### 2.6 Evidence

#### POST /controls/{control_id}/evidence
Upload evidence for a control.

**Content-Type:** `multipart/form-data`

**Request Fields:**
- `file` (binary, required) - Max 100MB
- `type` (string, required) - policy, procedure, screenshot, configuration, audit_log, training_record, vendor_doc, other
- `title` (string, required)
- `description` (string)
- `valid_until` (date)

**Response:**
```json
{
  "data": {
    "id": "aa0e8400-e29b-41d4-a716-446655440005",
    "control_id": "990e8400-e29b-41d4-a716-446655440004",
    "type": "policy",
    "title": "Access Control Policy v2.1",
    "description": "Updated policy covering all access control requirements",
    "status": "pending",
    "file_name": "access_control_policy.pdf",
    "file_size": 245760,
    "file_mime_type": "application/pdf",
    "file_url": "https://storage.certfast.io/evidence/aa0e8400-e29b-41d4-a716-446655440005.pdf?token=xyz",
    "valid_from": "2026-03-01",
    "valid_until": "2027-03-01",
    "uploaded_by": "John Doe",
    "uploaded_at": "2026-03-15T10:30:00Z"
  }
}
```

#### GET /evidence/{id}
Get evidence details.

#### DELETE /evidence/{id}
Delete evidence (soft delete).

---

### 2.7 Tasks

#### GET /tasks
List tasks across all frameworks.

**Query Parameters:**
- `assignee_id` (UUID)
- `status` (string)
- `due_before` (date)
- `due_after` (date)

#### POST /controls/{control_id}/tasks
Create a task for a control.

**Request:**
```json
{
  "title": "Review access logs",
  "description": "Quarterly review of all access logs for unauthorized attempts",
  "assignee_id": "550e8400-e29b-41d4-a716-446655440000",
  "due_date": "2026-04-01",
  "priority": "high"
}
```

#### PATCH /tasks/{id}
Update task status.

**Request:**
```json
{
  "status": "completed",
  "completed_at": "2026-03-15T10:30:00Z"
}
```

---

### 2.8 Audits

#### GET /audits
List audit engagements.

#### POST /audits
Schedule a new audit.

**Request:**
```json
{
  "framework_id": "880e8400-e29b-41d4-a716-446655440003",
  "type": "external",
  "partner_id": "dd0e8400-e29b-41d4-a716-446655440008",
  "scheduled_date": "2026-06-15",
  "notes": "Initial SOC 2 Type II audit"
}
```

#### GET /audits/{id}
Get audit details with findings.

#### POST /audits/{id}/export
Generate audit export package.

**Response:**
```json
{
  "data": {
    "export_id": "ee0e8400-e29b-41d4-a716-446655440009",
    "status": "processing",
    "estimated_completion": "2026-03-15T10:35:00Z"
  }
}
```

---

### 2.9 Billing

#### GET /subscription
Get current subscription details.

**Response:**
```json
{
  "data": {
    "id": "ff0e8400-e29b-41d4-a716-446655440010",
    "tier": "pro",
    "billing_cycle": "annual",
    "status": "active",
    "amount": 4990.00,
    "currency": "EUR",
    "current_period_start": "2026-01-15T00:00:00Z",
    "current_period_end": "2027-01-15T00:00:00Z",
    "cancel_at_period_end": false,
    "trial_end": null
  }
}
```

#### POST /subscription/upgrade
Upgrade subscription tier.

#### GET /invoices
List invoices.

---

## 3. Partner API

### 3.1 Authentication

#### POST /partner/auth/token
Exchange client credentials for access token.

**Request:**
```json
{
  "client_id": "partner_abc123",
  "client_secret": "secret_xyz789"
}
```

**Response:**
```json
{
  "data": {
    "access_token": "eyJhbGciOiJSUzI1NiIs...",
    "token_type": "Bearer",
    "expires_in": 3600
  }
}
```

---

### 3.2 Client Management

#### GET /partner/clients
List connected clients.

**Response:**
```json
{
  "data": [
    {
      "id": "660e8400-e29b-41d4-a716-446655440001",
      "name": "Acme Corp",
      "industry": "SaaS",
      "connection_status": "active",
      "connected_at": "2026-01-15T09:00:00Z",
      "frameworks": [
        {
          "type": "soc2_type2",
          "status": "ready_for_audit",
          "progress": 85
        }
      ]
    }
  ]
}
```

---

### 3.3 Audit Operations

#### GET /partner/clients/{client_id}/controls
Get all controls for audit review.

**Query Parameters:**
- `framework_id` (UUID)
- `status` (string)

**Response:**
```json
{
  "data": [
    {
      "id": "990e8400-e29b-41d4-a716-446655440004",
      "framework_id": "880e8400-e29b-41d4-a716-446655440003",
      "code": "CC6.1",
      "title": "Logical Access Security",
      "status": "implemented",
      "evidence_count": 3,
      "evidence_urls": [
        "https://api.certfast.io/v1/evidence/aa0e8400-e29b-41d4-a716-446655440005/download"
      ]
    }
  ]
}
```

#### POST /partner/clients/{client_id}/audits
Create audit record.

**Request:**
```json
{
  "framework_id": "880e8400-e29b-41d4-a716-446655440003",
  "scheduled_date": "2026-06-15",
  "auditor_name": "Jane Smith, CPA",
  "auditor_email": "jane.smith@cpafirm.com"
}
```

#### PATCH /partner/audits/{audit_id}/items/{control_id}
Submit audit finding.

**Request:**
```json
{
  "status": "pass",
  "notes": "Control properly implemented and documented",
  "evidence_reviewed": ["aa0e8400-e29b-41d4-a716-446655440005"]
}
```

---

## 4. Webhooks

### 4.1 Webhook Events

CertFast sends webhook events to partner URLs.

#### Event Types

| Event | Description |
|-------|-------------|
| `control.status_changed` | Control status updated |
| `evidence.uploaded` | New evidence uploaded |
| `audit.scheduled` | Audit scheduled |
| `audit.completed` | Audit completed |
| `company.tier_changed` | Subscription tier changed |

#### Webhook Payload

```json
{
  "event": "control.status_changed",
  "timestamp": "2026-03-15T10:30:00Z",
  "webhook_id": "wh_123456789",
  "data": {
    "company_id": "660e8400-e29b-41d4-a716-446655440001",
    "framework_id": "880e8400-e29b-41d4-a716-446655440003",
    "control_id": "990e8400-e29b-41d4-a716-446655440004",
    "previous_status": "in_progress",
    "current_status": "implemented",
    "changed_by": "550e8400-e29b-41d4-a716-446655440000"
  }
}
```

#### Webhook Security

```http
POST /webhook-endpoint
Content-Type: application/json
X-Webhook-Signature: sha256=abc123def456...
X-Webhook-ID: wh_123456789
X-Webhook-Timestamp: 1710503400

{...payload...}
```

**Signature Verification:**
```javascript
const crypto = require('crypto');

const signature = crypto
  .createHmac('sha256', webhookSecret)
  .update(`${timestamp}.${JSON.stringify(payload)}`)
  .digest('hex');
```

---

## 5. Error Codes

### 5.1 HTTP Status Codes

| Code | Meaning | Usage |
|------|---------|-------|
| 200 | OK | Successful GET, PATCH |
| 201 | Created | Successful POST |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Validation error |
| 401 | Unauthorized | Missing/invalid token |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Resource already exists |
| 422 | Unprocessable | Business logic violation |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Server Error | Internal error |

### 5.2 Error Codes

| Code | Description | HTTP |
|------|-------------|------|
| `UNAUTHORIZED` | Invalid or expired token | 401 |
| `FORBIDDEN` | Insufficient permissions | 403 |
| `RESOURCE_NOT_FOUND` | Resource not found | 404 |
| `VALIDATION_ERROR` | Request validation failed | 400 |
| `RATE_LIMIT_EXCEEDED` | Too many requests | 429 |
| `TIER_LIMIT_EXCEEDED` | Feature limit for tier reached | 422 |
| `DUPLICATE_RESOURCE` | Resource already exists | 409 |
| `INVALID_STATE` | Invalid state transition | 422 |
| `PAYMENT_REQUIRED` | Subscription issue | 402 |
| `INTERNAL_ERROR` | Server error | 500 |

---

## 6. Rate Limiting

### 6.1 Limits by Tier

| Tier | Requests/Minute | Burst |
|------|-----------------|-------|
| Lite | 60 | 10 |
| Starter | 120 | 20 |
| Pro | 300 | 50 |
| Enterprise | 600 | 100 |

### 6.2 Headers

```http
X-RateLimit-Limit: 300
X-RateLimit-Remaining: 299
X-RateLimit-Reset: 1710503460
```

---

## 7. OpenAPI Specification

```yaml
openapi: 3.0.3
info:
  title: CertFast API
  version: 1.0.0
  description: Compliance automation platform API
  contact:
    name: CertFast Support
    email: api@certfast.io

servers:
  - url: https://api.certfast.io/v1
    description: Production
  - url: https://api-staging.certfast.io/v1
    description: Staging

security:
  - bearerAuth: []

paths:
  /auth/token:
    post:
      summary: Exchange Auth0 code for access token
      tags: [Authentication]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [code]
              properties:
                code:
                  type: string
                redirect_uri:
                  type: string
      responses:
        200:
          description: Token exchange successful
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TokenResponse'

  /company:
    get:
      summary: Get company details
      tags: [Companies]
      responses:
        200:
          description: Company details
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Company'
    
    patch:
      summary: Update company
      tags: [Companies]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CompanyUpdate'
      responses:
        200:
          description: Company updated

  /frameworks:
    get:
      summary: List frameworks
      tags: [Frameworks]
      parameters:
        - name: status
          in: query
          schema:
            type: string
      responses:
        200:
          description: List of frameworks
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    items:
                      $ref: '#/components/schemas/Framework'
                  pagination:
                    $ref: '#/components/schemas/Pagination'

    post:
      summary: Create framework
      tags: [Frameworks]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/FrameworkCreate'
      responses:
        201:
          description: Framework created

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

  schemas:
    TokenResponse:
      type: object
      properties:
        data:
          type: object
          properties:
            access_token:
              type: string
            refresh_token:
              type: string
            token_type:
              type: string
            expires_in:
              type: integer
            user:
              $ref: '#/components/schemas/User'

    User:
      type: object
      properties:
        id:
          type: string
          format: uuid
        email:
          type: string
          format: email
        first_name:
          type: string
        last_name:
          type: string
        role:
          type: string
          enum: [owner, admin, compliance_manager, auditor, viewer]
        status:
          type: string
          enum: [active, inactive, pending]

    Company:
      type: object
      properties:
        id:
          type: string
          format: uuid
        name:
          type: string
        tier:
          type: string
          enum: [lite, starter, pro, enterprise]
        settings:
          type: object
        limits:
          type: object
          properties:
            max_frameworks:
              type: integer
            max_users:
              type: integer
            max_storage_gb:
              type: integer

    Framework:
      type: object
      properties:
        id:
          type: string
          format: uuid
        type:
          type: string
          enum: [soc2_type1, soc2_type2, iso27001, gdpr]
        status:
          type: string
        target_date:
          type: string
          format: date
        progress:
          type: object

    Pagination:
      type: object
      properties:
        page:
          type: integer
        per_page:
          type: integer
        total:
          type: integer
        total_pages:
          type: integer
```

---

## 8. SDK and Client Libraries

### 8.1 Official SDKs (Planned)

| Language | Repository | Status |
|----------|------------|--------|
| JavaScript/Node.js | `@certfast/sdk` | Planned |
| Python | `certfast-python` | Planned |
| Go | `certfast-go` | Planned |

### 8.2 Example: JavaScript

```javascript
import { CertFastClient } from '@certfast/sdk';

const client = new CertFastClient({
  accessToken: process.env.CERTFAST_TOKEN,
  baseUrl: 'https://api.certfast.io/v1'
});

// Get company details
const company = await client.company.get();

// List controls
const controls = await client.frameworks('id').controls.list({
  status: 'in_progress',
  priority: 'high'
});

// Upload evidence
const evidence = await client.controls('id').evidence.upload({
  file: fs.createReadStream('policy.pdf'),
  type: 'policy',
  title: 'Access Control Policy'
});
```

---

**Document Complete**  
**Next**: Infrastructure as Code or Development Environment Setup
