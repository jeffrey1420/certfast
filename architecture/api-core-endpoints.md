# Core API Endpoints Documentation

This document provides comprehensive documentation for the CertFast core API endpoints. All endpoints require authentication via Bearer token.

---

## Authentication

All API requests must include an Authorization header with a Bearer token:

```
Authorization: Bearer {token}
```

Tokens are obtained through the OAuth2 authentication flow and expire after 24 hours. Refresh tokens can be used to obtain new access tokens without requiring re-authentication.

---

## Users API

The Users API manages user accounts within the CertFast platform. Users can be assigned different roles (admin, auditor, assessor, viewer) that determine their permissions.

### GET /api/v1/users
Returns a paginated list of users in the organization.

**Request Headers:**
- `Authorization`: Bearer {token}
- `Content-Type`: application/json

**Query Parameters:**
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of results per page (default: 20, max: 100)
- `role` (optional): Filter by user role
- `status` (optional): Filter by user status (active, inactive, pending)

**Response 200 OK:**
```json
{
  "users": [
    {
      "id": "usr_8f2b9c4d-a1e6-4f3b-8c7d-9e0a1b2c3d4e",
      "email": "john.doe@company.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "admin",
      "status": "active",
      "organizationId": "org_5a6b7c8d-9e0f-1a2b-3c4d-5e6f7a8b9c0d",
      "lastLoginAt": "2026-03-14T09:30:00Z",
      "createdAt": "2026-01-15T14:22:10Z",
      "updatedAt": "2026-03-14T09:30:00Z"
    },
    {
      "id": "usr_9e3c0d5e-b2f7-5a4c-9d8e-0f1a2b3c4d5e",
      "email": "jane.smith@company.com",
      "firstName": "Jane",
      "lastName": "Smith",
      "role": "assessor",
      "status": "active",
      "organizationId": "org_5a6b7c8d-9e0f-1a2b-3c4d-5e6f7a8b9c0d",
      "lastLoginAt": "2026-03-13T16:45:22Z",
      "createdAt": "2026-02-01T11:15:33Z",
      "updatedAt": "2026-03-13T16:45:22Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 47,
    "totalPages": 3
  }
}
```

**Response 401 Unauthorized:**
```json
{
  "error": "unauthorized",
  "message": "Invalid or expired authentication token"
}
```

### GET /api/v1/users/{id}
Returns detailed information about a specific user.

**Request Headers:**
- `Authorization`: Bearer {token}

**Path Parameters:**
- `id`: Unique user identifier (UUID format)

**Response 200 OK:**
```json
{
  "id": "usr_8f2b9c4d-a1e6-4f3b-8c7d-9e0a1b2c3d4e",
  "email": "john.doe@company.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "admin",
  "status": "active",
  "organizationId": "org_5a6b7c8d-9e0f-1a2b-3c4d-5e6f7a8b9c0d",
  "phone": "+1-555-0123",
  "timezone": "America/New_York",
  "preferences": {
    "notifications": {
      "email": true,
      "sms": false,
      "inApp": true
    },
    "theme": "dark"
  },
  "lastLoginAt": "2026-03-14T09:30:00Z",
  "createdAt": "2026-01-15T14:22:10Z",
  "updatedAt": "2026-03-14T09:30:00Z"
}
```

**Response 404 Not Found:**
```json
{
  "error": "not_found",
  "message": "User not found"
}
```

### POST /api/v1/users
Creates a new user account in the organization.

**Request Headers:**
- `Authorization`: Bearer {token}
- `Content-Type`: application/json

**Request Body:**
```json
{
  "email": "new.user@company.com",
  "firstName": "New",
  "lastName": "User",
  "role": "assessor",
  "phone": "+1-555-0456",
  "sendWelcomeEmail": true
}
```

**Response 201 Created:**
```json
{
  "id": "usr_1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
  "email": "new.user@company.com",
  "firstName": "New",
  "lastName": "User",
  "role": "assessor",
  "status": "pending",
  "organizationId": "org_5a6b7c8d-9e0f-1a2b-3c4d-5e6f7a8b9c0d",
  "invitationSentAt": "2026-03-15T10:35:00Z",
  "createdAt": "2026-03-15T10:35:00Z",
  "updatedAt": "2026-03-15T10:35:00Z"
}
```

**Response 400 Bad Request:**
```json
{
  "error": "validation_error",
  "message": "Email address is already registered",
  "field": "email"
}
```

### PUT /api/v1/users/{id}
Updates an existing user's information.

**Request Headers:**
- `Authorization`: Bearer {token}
- `Content-Type`: application/json

**Path Parameters:**
- `id`: Unique user identifier

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe-Updated",
  "role": "auditor",
  "phone": "+1-555-0789",
  "preferences": {
    "notifications": {
      "email": true,
      "sms": true,
      "inApp": true
    },
    "theme": "light"
  }
}
```

**Response 200 OK:**
```json
{
  "id": "usr_8f2b9c4d-a1e6-4f3b-8c7d-9e0a1b2c3d4e",
  "email": "john.doe@company.com",
  "firstName": "John",
  "lastName": "Doe-Updated",
  "role": "auditor",
  "status": "active",
  "organizationId": "org_5a6b7c8d-9e0f-1a2b-3c4d-5e6f7a8b9c0d",
  "phone": "+1-555-0789",
  "preferences": {
    "notifications": {
      "email": true,
      "sms": true,
      "inApp": true
    },
    "theme": "light"
  },
  "lastLoginAt": "2026-03-14T09:30:00Z",
  "createdAt": "2026-01-15T14:22:10Z",
  "updatedAt": "2026-03-15T10:35:45Z"
}
```

### DELETE /api/v1/users/{id}
Deactivates a user account. This is a soft delete - the user record is preserved but marked as inactive.

**Request Headers:**
- `Authorization`: Bearer {token}

**Path Parameters:**
- `id`: Unique user identifier

**Query Parameters:**
- `hard` (optional): If true, permanently deletes the user (default: false)
- `reassignTo` (optional): User ID to reassign owned resources to

**Response 204 No Content:**
(No response body on successful deletion)

**Response 403 Forbidden:**
```json
{
  "error": "forbidden",
  "message": "Cannot delete the last admin user in organization"
}
```

---

## Organizations API

The Organizations API manages organizational units within CertFast. Organizations represent companies or business units that are undergoing compliance certification.

### GET /api/v1/orgs
Returns a list of organizations accessible to the authenticated user.

**Request Headers:**
- `Authorization`: Bearer {token}

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Results per page (default: 20)
- `status` (optional): Filter by status (active, suspended, trial)

**Response 200 OK:**
```json
{
  "organizations": [
    {
      "id": "org_5a6b7c8d-9e0f-1a2b-3c4d-5e6f7a8b9c0d",
      "name": "Acme Corporation",
      "slug": "acme-corporation",
      "status": "active",
      "plan": "enterprise",
      "settings": {
        "timezone": "America/New_York",
        "dateFormat": "MM/DD/YYYY",
        "currency": "USD"
      },
      "memberCount": 47,
      "assessmentCount": 12,
      "createdAt": "2025-08-10T09:00:00Z",
      "updatedAt": "2026-03-10T14:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1,
    "totalPages": 1
  }
}
```

### GET /api/v1/orgs/{id}
Returns detailed information about a specific organization.

**Request Headers:**
- `Authorization`: Bearer {token}

**Response 200 OK:**
```json
{
  "id": "org_5a6b7c8d-9e0f-1a2b-3c4d-5e6f7a8b9c0d",
  "name": "Acme Corporation",
  "slug": "acme-corporation",
  "description": "Leading provider of enterprise software solutions",
  "website": "https://www.acme.com",
  "industry": "Technology",
  "size": "500-1000",
  "status": "active",
  "plan": "enterprise",
  "billingEmail": "billing@acme.com",
  "settings": {
    "timezone": "America/New_York",
    "dateFormat": "MM/DD/YYYY",
    "currency": "USD",
    "language": "en",
    "notifications": {
      "assessmentDue": true,
      "controlExpiry": true,
      "weeklyDigest": true
    }
  },
  "complianceFrameworks": ["SOC2", "ISO27001", "GDPR"],
  "memberCount": 47,
  "assessmentCount": 12,
  "controlCount": 156,
  "createdAt": "2025-08-10T09:00:00Z",
  "updatedAt": "2026-03-10T14:30:00Z"
}
```

### POST /api/v1/orgs
Creates a new organization. Requires platform admin privileges.

**Request Headers:**
- `Authorization`: Bearer {token}
- `Content-Type`: application/json

**Request Body:**
```json
{
  "name": "NewCorp Inc",
  "slug": "newcorp-inc",
  "description": "Emerging fintech startup",
  "website": "https://www.newcorp.io",
  "industry": "Financial Services",
  "size": "50-100",
  "billingEmail": "admin@newcorp.io",
  "plan": "professional",
  "adminEmail": "ceo@newcorp.io"
}
```

**Response 201 Created:**
```json
{
  "id": "org_9c8d7e6f-5a4b-3c2d-1e0f-9a8b7c6d5e4f",
  "name": "NewCorp Inc",
  "slug": "newcorp-inc",
  "description": "Emerging fintech startup",
  "website": "https://www.newcorp.io",
  "industry": "Financial Services",
  "size": "50-100",
  "status": "trial",
  "plan": "professional",
  "billingEmail": "admin@newcorp.io",
  "settings": {
    "timezone": "UTC",
    "dateFormat": "YYYY-MM-DD",
    "currency": "USD",
    "language": "en"
  },
  "createdAt": "2026-03-15T10:40:00Z",
  "updatedAt": "2026-03-15T10:40:00Z",
  "trialEndsAt": "2026-04-14T10:40:00Z"
}
```

### PUT /api/v1/orgs/{id}
Updates an organization's information.

**Request Headers:**
- `Authorization`: Bearer {token}
- `Content-Type`: application/json

**Request Body:**
```json
{
  "name": "Acme Corporation Updated",
  "description": "Leading global provider of enterprise solutions",
  "website": "https://www.acmeglobal.com",
  "billingEmail": "finance@acmeglobal.com",
  "settings": {
    "timezone": "America/Los_Angeles",
    "notifications": {
      "weeklyDigest": false
    }
  }
}
```

**Response 200 OK:**
```json
{
  "id": "org_5a6b7c8d-9e0f-1a2b-3c4d-5e6f7a8b9c0d",
  "name": "Acme Corporation Updated",
  "slug": "acme-corporation",
  "description": "Leading global provider of enterprise solutions",
  "website": "https://www.acmeglobal.com",
  "industry": "Technology",
  "status": "active",
  "plan": "enterprise",
  "billingEmail": "finance@acmeglobal.com",
  "settings": {
    "timezone": "America/Los_Angeles",
    "dateFormat": "MM/DD/YYYY",
    "currency": "USD",
    "language": "en",
    "notifications": {
      "assessmentDue": true,
      "controlExpiry": true,
      "weeklyDigest": false
    }
  },
  "updatedAt": "2026-03-15T10:42:30Z"
}
```

---

## Assessments API

The Assessments API manages compliance assessments within organizations. Assessments track the evaluation of security controls against compliance frameworks.

### GET /api/v1/assessments
Returns a list of assessments for the organization.

**Request Headers:**
- `Authorization`: Bearer {token}

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Results per page (default: 20)
- `status` (optional): Filter by status (draft, in_progress, under_review, approved, rejected)
- `framework` (optional): Filter by compliance framework (SOC2, ISO27001, GDPR, etc.)
- `assignee` (optional): Filter by assigned user ID

**Response 200 OK:**
```json
{
  "assessments": [
    {
      "id": "asm_2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e",
      "title": "Q1 2026 SOC 2 Type II Assessment",
      "description": "Quarterly assessment for SOC 2 Type II compliance",
      "framework": "SOC2",
      "status": "in_progress",
      "progress": 67,
      "priority": "high",
      "assigneeId": "usr_8f2b9c4d-a1e6-4f3b-8c7d-9e0a1b2c3d4e",
      "assigneeName": "John Doe",
      "dueDate": "2026-03-31T23:59:59Z",
      "startedAt": "2026-01-15T09:00:00Z",
      "completedAt": null,
      "controlCount": 45,
      "evidenceCount": 128,
      "createdAt": "2026-01-10T11:30:00Z",
      "updatedAt": "2026-03-14T16:45:00Z"
    },
    {
      "id": "asm_3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f",
      "title": "ISO 27001 Annual Audit",
      "framework": "ISO27001",
      "status": "under_review",
      "progress": 100,
      "priority": "critical",
      "assigneeId": "usr_9e3c0d5e-b2f7-5a4c-9d8e-0f1a2b3c4d5e",
      "assigneeName": "Jane Smith",
      "dueDate": "2026-02-28T23:59:59Z",
      "startedAt": "2026-01-01T00:00:00Z",
      "completedAt": "2026-02-25T14:20:00Z",
      "controlCount": 114,
      "evidenceCount": 342,
      "createdAt": "2025-12-15T10:00:00Z",
      "updatedAt": "2026-02-25T14:20:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 12,
    "totalPages": 1
  }
}
```

### GET /api/v1/assessments/{id}
Returns detailed information about a specific assessment.

**Request Headers:**
- `Authorization`: Bearer {token}

**Response 200 OK:**
```json
{
  "id": "asm_2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e",
  "title": "Q1 2026 SOC 2 Type II Assessment",
  "description": "Quarterly assessment for SOC 2 Type II compliance",
  "framework": "SOC2",
  "status": "in_progress",
  "progress": 67,
  "priority": "high",
  "assignee": {
    "id": "usr_8f2b9c4d-a1e6-4f3b-8c7d-9e0a1b2c3d4e",
    "name": "John Doe",
    "email": "john.doe@company.com"
  },
  "reviewer": {
    "id": "usr_9e3c0d5e-b2f7-5a4c-9d8e-0f1a2b3c4d5e",
    "name": "Jane Smith",
    "email": "jane.smith@company.com"
  },
  "dueDate": "2026-03-31T23:59:59Z",
  "startedAt": "2026-01-15T09:00:00Z",
  "targetCompletionDate": "2026-03-25T23:59:59Z",
  "completedAt": null,
  "controlSummary": {
    "total": 45,
    "implemented": 30,
    "partiallyImplemented": 8,
    "notImplemented": 4,
    "notApplicable": 3
  },
  "evidenceSummary": {
    "total": 128,
    "verified": 89,
    "pending": 28,
    "rejected": 11
  },
  "tags": ["quarterly", "audit-prep", "external-audit"],
  "notes": "Focus on access control improvements this quarter",
  "createdAt": "2026-01-10T11:30:00Z",
  "updatedAt": "2026-03-14T16:45:00Z"
}
```

### POST /api/v1/assessments
Creates a new assessment.

**Request Headers:**
- `Authorization`: Bearer {token}
- `Content-Type`: application/json

**Request Body:**
```json
{
  "title": "GDPR Compliance Review 2026",
  "description": "Annual GDPR compliance assessment including data mapping review",
  "framework": "GDPR",
  "priority": "high",
  "assigneeId": "usr_8f2b9c4d-a1e6-4f3b-8c7d-9e0a1b2c3d4e",
  "dueDate": "2026-05-25T23:59:59Z",
  "targetCompletionDate": "2026-05-20T23:59:59Z",
  "controlIds": ["ctl_1a2b3c4d", "ctl_5e6f7a8b", "ctl_9c0d1e2f"],
  "tags": ["annual", "gdpr", "data-privacy"]
}
```

**Response 201 Created:**
```json
{
  "id": "asm_4d5e6f7a-8b9c-0d1e-2f3a-4b5c6d7e8f9a",
  "title": "GDPR Compliance Review 2026",
  "description": "Annual GDPR compliance assessment including data mapping review",
  "framework": "GDPR",
  "status": "draft",
  "progress": 0,
  "priority": "high",
  "assignee": {
    "id": "usr_8f2b9c4d-a1e6-4f3b-8c7d-9e0a1b2c3d4e",
    "name": "John Doe",
    "email": "john.doe@company.com"
  },
  "dueDate": "2026-05-25T23:59:59Z",
  "targetCompletionDate": "2026-05-20T23:59:59Z",
  "controlCount": 3,
  "evidenceCount": 0,
  "tags": ["annual", "gdpr", "data-privacy"],
  "createdAt": "2026-03-15T10:45:00Z",
  "updatedAt": "2026-03-15T10:45:00Z"
}
```

### PUT /api/v1/assessments/{id}
Updates an assessment. Can be used to change status, assignee, or other properties.

**Request Headers:**
- `Authorization`: Bearer {token}
- `Content-Type`: application/json

**Request Body:**
```json
{
  "title": "Q1 2026 SOC 2 Type II Assessment - Updated",
  "status": "under_review",
  "priority": "critical",
  "progress": 85,
  "assigneeId": "usr_9e3c0d5e-b2f7-5a4c-9d8e-0f1a2b3c4d5e",
  "dueDate": "2026-04-05T23:59:59Z",
  "notes": "Extended timeline due to additional scope requirements"
}
```

**Response 200 OK:**
```json
{
  "id": "asm_2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e",
  "title": "Q1 2026 SOC 2 Type II Assessment - Updated",
  "framework": "SOC2",
  "status": "under_review",
  "progress": 85,
  "priority": "critical",
  "assignee": {
    "id": "usr_9e3c0d5e-b2f7-5a4c-9d8e-0f1a2b3c4d5e",
    "name": "Jane Smith",
    "email": "jane.smith@company.com"
  },
  "dueDate": "2026-04-05T23:59:59Z",
  "notes": "Extended timeline due to additional scope requirements",
  "updatedAt": "2026-03-15T10:50:00Z"
}
```

### GET /api/v1/assessments/{id}/evidence
Returns all evidence associated with an assessment.

**Request Headers:**
- `Authorization`: Bearer {token}

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Results per page (default: 50)
- `status` (optional): Filter by status (pending, verified, rejected)
- `controlId` (optional): Filter by specific control

**Response 200 OK:**
```json
{
  "evidence": [
    {
      "id": "evd_5e6f7a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b",
      "controlId": "ctl_1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
      "controlName": "Access Control Policy",
      "title": "Access Control Policy Document v2.3",
      "description": "Updated access control policy with MFA requirements",
      "type": "document",
      "fileName": "access_control_policy_v2.3.pdf",
      "fileSize": 245760,
      "mimeType": "application/pdf",
      "status": "verified",
      "submittedBy": {
        "id": "usr_8f2b9c4d-a1e6-4f3b-8c7d-9e0a1b2c3d4e",
        "name": "John Doe"
      },
      "verifiedBy": {
        "id": "usr_9e3c0d5e-b2f7-5a4c-9d8e-0f1a2b3c4d5e",
        "name": "Jane Smith"
      },
      "submittedAt": "2026-03-01T14:30:00Z",
      "verifiedAt": "2026-03-05T10:15:00Z",
      "expiresAt": "2027-03-01T14:30:00Z",
      "tags": ["policy", "access-control", "mfa"]
    },
    {
      "id": "evd_6f7a8b9c-0d1e-2f3a-4b5c-6d7e8f9a0b1c",
      "controlId": "ctl_2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e",
      "controlName": "Background Check Records",
      "title": "Q1 2026 Background Check Verification",
      "type": "screenshot",
      "fileName": "background_checks_q1_2026.png",
      "fileSize": 512000,
      "mimeType": "image/png",
      "status": "pending",
      "submittedBy": {
        "id": "usr_8f2b9c4d-a1e6-4f3b-8c7d-9e0a1b2c3d4e",
        "name": "John Doe"
      },
      "verifiedBy": null,
      "submittedAt": "2026-03-14T16:45:00Z",
      "verifiedAt": null,
      "expiresAt": null,
      "tags": ["hr", "background-checks", "q1-2026"]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 128,
    "totalPages": 3
  },
  "summary": {
    "total": 128,
    "verified": 89,
    "pending": 28,
    "rejected": 11
  }
}
```

---

## Controls API

The Controls API manages security and compliance controls. Controls represent specific security requirements that must be implemented and evidenced.

### GET /api/v1/controls
Returns a list of controls available in the organization.

**Request Headers:**
- `Authorization`: Bearer {token}

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Results per page (default: 50)
- `framework` (optional): Filter by compliance framework
- `status` (optional): Filter by implementation status
- `category` (optional): Filter by control category
- `search` (optional): Search in control name or description

**Response 200 OK:**
```json
{
  "controls": [
    {
      "id": "ctl_1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
      "name": "Access Control Policy",
      "description": "The organization maintains an access control policy that defines user access requirements",
      "framework": "SOC2",
      "category": "Logical and Physical Access Controls",
      "referenceId": "CC6.1",
      "status": "implemented",
      "priority": "high",
      "automationEnabled": false,
      "lastAssessedAt": "2026-03-05T10:15:00Z",
      "nextAssessmentDue": "2026-06-05T10:15:00Z",
      "evidenceCount": 5,
      "createdAt": "2025-08-15T09:00:00Z",
      "updatedAt": "2026-03-05T10:15:00Z"
    },
    {
      "id": "ctl_2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e",
      "name": "Background Check Verification",
      "description": "Background checks are performed for all employees prior to employment",
      "framework": "SOC2",
      "category": "Risk Assessment",
      "referenceId": "CC1.4",
      "status": "implemented",
      "priority": "medium",
      "automationEnabled": true,
      "automationConfig": {
        "integration": "bamboohr",
        "syncFrequency": "daily"
      },
      "lastAssessedAt": "2026-03-14T16:45:00Z",
      "nextAssessmentDue": "2026-06-14T16:45:00Z",
      "evidenceCount": 12,
      "createdAt": "2025-08-15T09:00:00Z",
      "updatedAt": "2026-03-14T16:45:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 156,
    "totalPages": 4
  }
}
```

### GET /api/v1/controls/{id}
Returns detailed information about a specific control.

**Request Headers:**
- `Authorization`: Bearer {token}

**Response 200 OK:**
```json
{
  "id": "ctl_1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
  "name": "Access Control Policy",
  "description": "The organization maintains an access control policy that defines user access requirements including authentication, authorization, and access review procedures.",
  "framework": "SOC2",
  "category": "Logical and Physical Access Controls",
  "referenceId": "CC6.1",
  "controlType": "preventive",
  "status": "implemented",
  "implementationStatus": {
    "design": "implemented",
    "operating": "implemented",
    "testing": "completed"
  },
  "priority": "high",
  "riskLevel": "high",
  "automationEnabled": false,
  "owner": {
    "id": "usr_8f2b9c4d-a1e6-4f3b-8c7d-9e0a1b2c3d4e",
    "name": "John Doe",
    "email": "john.doe@company.com"
  },
  "implementationDetails": {
    "summary": "Access control policy documented and approved by management. Annual access reviews scheduled.",
    "procedures": [
      "User access requests require manager approval",
      "Quarterly access reviews performed",
      "Privileged access requires additional MFA"
    ],
    "systems": ["Okta", "AWS IAM", "Active Directory"]
  },
  "evidenceRequirements": [
    {
      "type": "document",
      "description": "Current version of access control policy",
      "frequency": "annual",
      "required": true
    },
    {
      "type": "screenshot",
      "description": "Access review completion records",
      "frequency": "quarterly",
      "required": true
    }
  ],
  "lastAssessedAt": "2026-03-05T10:15:00Z",
  "nextAssessmentDue": "2026-06-05T10:15:00Z",
  "evidenceCount": 5,
  "tags": ["access-control", "policy", "soc2", "cc6"],
  "createdAt": "2025-08-15T09:00:00Z",
  "updatedAt": "2026-03-05T10:15:00Z"
}
```

### PUT /api/v1/controls/{id}
Updates a control's implementation status and details.

**Request Headers:**
- `Authorization`: Bearer {token}
- `Content-Type`: application/json

**Request Body:**
```json
{
  "status": "implemented",
  "implementationStatus": {
    "design": "implemented",
    "operating": "implemented",
    "testing": "in_progress"
  },
  "implementationDetails": {
    "summary": "Updated access control policy with enhanced MFA requirements",
    "procedures": [
      "User access requests require manager approval",
      "Quarterly access reviews performed",
      "All privileged access requires hardware MFA keys"
    ],
    "systems": ["Okta", "AWS IAM", "Active Directory", "YubiKey"]
  },
  "ownerId": "usr_9e3c0d5e-b2f7-5a4c-9d8e-0f1a2b3c4d5e",
  "notes": "Enhanced MFA requirements added per Q1 2026 security review"
}
```

**Response 200 OK:**
```json
{
  "id": "ctl_1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
  "name": "Access Control Policy",
  "framework": "SOC2",
  "referenceId": "CC6.1",
  "status": "implemented",
  "implementationStatus": {
    "design": "implemented",
    "operating": "implemented",
    "testing": "in_progress"
  },
  "priority": "high",
  "owner": {
    "id": "usr_9e3c0d5e-b2f7-5a4c-9d8e-0f1a2b3c4d5e",
    "name": "Jane Smith",
    "email": "jane.smith@company.com"
  },
  "implementationDetails": {
    "summary": "Updated access control policy with enhanced MFA requirements",
    "procedures": [
      "User access requests require manager approval",
      "Quarterly access reviews performed",
      "All privileged access requires hardware MFA keys"
    ],
    "systems": ["Okta", "AWS IAM", "Active Directory", "YubiKey"]
  },
  "notes": "Enhanced MFA requirements added per Q1 2026 security review",
  "updatedAt": "2026-03-15T11:00:00Z"
}
```

---

## Error Codes

The API uses standard HTTP response codes:

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 204 | No Content | Request successful, no body returned |
| 400 | Bad Request | Invalid request parameters |
| 401 | Unauthorized | Missing or invalid authentication |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Resource conflict (e.g., duplicate) |
| 422 | Unprocessable Entity | Validation error |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server error |

---

## Rate Limiting

API requests are rate-limited based on your organization plan:

- **Starter**: 100 requests/minute
- **Professional**: 500 requests/minute
- **Enterprise**: 2000 requests/minute

Rate limit headers are included in all responses:
- `X-RateLimit-Limit`: Maximum requests allowed
- `X-RateLimit-Remaining`: Remaining requests in window
- `X-RateLimit-Reset`: Unix timestamp when limit resets

---

## Pagination

List endpoints support pagination using `page` and `limit` query parameters. The response includes a `pagination` object with navigation metadata.

For large datasets, consider using cursor-based pagination by including `cursor` parameter from previous response's `pagination.nextCursor`.

---

## Versioning

The current API version is **v1**. Version is specified in the URL path (`/api/v1/`). When new versions are released, previous versions remain supported for at least 12 months with deprecation notices.

---

*Document Version: 1.0.0*
*Last Updated: March 15, 2026*
