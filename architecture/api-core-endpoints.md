# CertFast Core API Endpoints

This document describes the core REST API endpoints for the CertFast compliance platform. All endpoints require authentication via Bearer token.

---

## Authentication

All API requests must include an Authorization header with a Bearer token:

```
Authorization: Bearer {access_token}
```

The access token is obtained through the OAuth 2.0 authentication flow or API key management.

---

## Users API

The Users API manages user accounts within the CertFast platform, including administrators, auditors, and organization members.

### GET /api/v1/users

Returns a paginated list of users in the authenticated user's organization.

**Request Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Query Parameters:**
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of results per page (default: 20, max: 100)
- `role` (optional): Filter by user role (admin, auditor, member)
- `status` (optional): Filter by account status (active, inactive, pending)

**Response 200 OK:**
```json
{
  "data": [
    {
      "id": "usr-550e8400-e29b-41d4-a716-446655440000",
      "email": "john.doe@example.com",
      "first_name": "John",
      "last_name": "Doe",
      "role": "admin",
      "status": "active",
      "organization_id": "org-550e8400-e29b-41d4-a716-446655440001",
      "last_login_at": "2024-03-15T09:30:00Z",
      "created_at": "2024-01-10T14:22:00Z",
      "updated_at": "2024-03-15T09:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "total_pages": 3
  }
}
```

### GET /api/v1/users/{id}

Retrieves detailed information about a specific user.

**Path Parameters:**
- `id` (required): Unique identifier of the user

**Response 200 OK:**
```json
{
  "id": "usr-550e8400-e29b-41d4-a716-446655440000",
  "email": "john.doe@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "role": "admin",
  "status": "active",
  "organization_id": "org-550e8400-e29b-41d4-a716-446655440001",
  "phone": "+1-555-0123",
  "timezone": "America/New_York",
  "mfa_enabled": true,
  "last_login_at": "2024-03-15T09:30:00Z",
  "created_at": "2024-01-10T14:22:00Z",
  "updated_at": "2024-03-15T09:30:00Z"
}
```

**Response 404 Not Found:**
```json
{
  "error": "user_not_found",
  "message": "The requested user does not exist or you do not have permission to view it"
}
```

### POST /api/v1/users

Creates a new user account in the organization.

**Request Body:**
```json
{
  "email": "jane.smith@example.com",
  "first_name": "Jane",
  "last_name": "Smith",
  "role": "auditor",
  "phone": "+1-555-0456"
}
```

**Response 201 Created:**
```json
{
  "id": "usr-660f9511-f30c-52e5-b827-557766551111",
  "email": "jane.smith@example.com",
  "first_name": "Jane",
  "last_name": "Smith",
  "role": "auditor",
  "status": "pending",
  "organization_id": "org-550e8400-e29b-41d4-a716-446655440001",
  "invite_sent_at": "2024-03-15T09:50:00Z",
  "created_at": "2024-03-15T09:50:00Z",
  "updated_at": "2024-03-15T09:50:00Z"
}
```

**Response 422 Validation Error:**
```json
{
  "error": "validation_error",
  "message": "Email address is already in use",
  "field": "email"
}
```

### PUT /api/v1/users/{id}

Updates an existing user's information.

**Request Body:**
```json
{
  "first_name": "Johnny",
  "last_name": "Doe-Smith",
  "role": "member",
  "status": "active"
}
```

**Response 200 OK:**
```json
{
  "id": "usr-550e8400-e29b-41d4-a716-446655440000",
  "email": "john.doe@example.com",
  "first_name": "Johnny",
  "last_name": "Doe-Smith",
  "role": "member",
  "status": "active",
  "organization_id": "org-550e8400-e29b-41d4-a716-446655440001",
  "updated_at": "2024-03-15T10:00:00Z"
}
```

### DELETE /api/v1/users/{id}

Deactivates and removes a user account from the organization.

**Response 204 No Content**

**Response 403 Forbidden:**
```json
{
  "error": "cannot_delete_last_admin",
  "message": "Cannot delete the last administrator of the organization"
}
```

---

## Organizations API

The Organizations API manages organizational entities and their configurations.

### GET /api/v1/orgs

Returns a list of organizations accessible to the authenticated user.

**Request Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Results per page (default: 20)
- `industry` (optional): Filter by industry sector

**Response 200 OK:**
```json
{
  "data": [
    {
      "id": "org-550e8400-e29b-41d4-a716-446655440001",
      "name": "Acme Corporation",
      "slug": "acme-corp",
      "industry": "technology",
      "size": "201-500",
      "plan": "enterprise",
      "status": "active",
      "created_at": "2024-01-10T14:22:00Z",
      "updated_at": "2024-03-15T09:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1,
    "total_pages": 1
  }
}
```

### GET /api/v1/orgs/{id}

Retrieves detailed information about a specific organization.

**Response 200 OK:**
```json
{
  "id": "org-550e8400-e29b-41d4-a716-446655440001",
  "name": "Acme Corporation",
  "slug": "acme-corp",
  "description": "Leading provider of compliance automation solutions",
  "industry": "technology",
  "size": "201-500",
  "website": "https://acme.example.com",
  "plan": "enterprise",
  "status": "active",
  "settings": {
    "timezone": "America/New_York",
    "date_format": "MM/DD/YYYY",
    "mfa_required": true,
    "audit_logging": true
  },
  "address": {
    "street": "123 Business Ave",
    "city": "New York",
    "state": "NY",
    "postal_code": "10001",
    "country": "US"
  },
  "created_at": "2024-01-10T14:22:00Z",
  "updated_at": "2024-03-15T09:30:00Z"
}
```

### POST /api/v1/orgs

Creates a new organization. Typically used during initial onboarding.

**Request Body:**
```json
{
  "name": "New Ventures Inc",
  "slug": "new-ventures",
  "industry": "finance",
  "size": "51-200",
  "website": "https://newventures.example.com",
  "address": {
    "street": "456 Finance Street",
    "city": "San Francisco",
    "state": "CA",
    "postal_code": "94105",
    "country": "US"
  }
}
```

**Response 201 Created:**
```json
{
  "id": "org-770g0622-g41d-63f6-c938-668877662222",
  "name": "New Ventures Inc",
  "slug": "new-ventures",
  "industry": "finance",
  "size": "51-200",
  "plan": "trial",
  "status": "pending_verification",
  "created_at": "2024-03-15T10:15:00Z",
  "updated_at": "2024-03-15T10:15:00Z"
}
```

### PUT /api/v1/orgs/{id}

Updates an organization's information and settings.

**Request Body:**
```json
{
  "name": "Acme Corporation Global",
  "size": "501-1000",
  "settings": {
    "timezone": "UTC",
    "mfa_required": true
  }
}
```

**Response 200 OK:**
Returns the updated organization object with all fields.

---

## Assessments API

The Assessments API manages compliance assessments, audits, and their associated evidence.

### GET /api/v1/assessments

Returns a list of assessments for the organization.

**Request Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Results per page (default: 20)
- `status` (optional): Filter by status (draft, in_progress, completed, archived)
- `framework` (optional): Filter by compliance framework (soc2, iso27001, gdpr, etc.)
- `assignee` (optional): Filter by assigned user ID

**Response 200 OK:**
```json
{
  "data": [
    {
      "id": "asm-880i1733-h52e-74g7-d049-779988773333",
      "title": "SOC 2 Type II Annual Assessment",
      "description": "Annual SOC 2 Type II compliance assessment",
      "framework": "soc2",
      "status": "in_progress",
      "progress": 65,
      "assignee_id": "usr-550e8400-e29b-41d4-a716-446655440000",
      "organization_id": "org-550e8400-e29b-41d4-a716-446655440001",
      "start_date": "2024-01-15",
      "target_date": "2024-06-30",
      "completed_at": null,
      "created_at": "2024-01-10T14:22:00Z",
      "updated_at": "2024-03-15T09:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 5,
    "total_pages": 1
  }
}
```

### GET /api/v1/assessments/{id}

Retrieves detailed information about a specific assessment.

**Response 200 OK:**
```json
{
  "id": "asm-880i1733-h52e-74g7-d049-779988773333",
  "title": "SOC 2 Type II Annual Assessment",
  "description": "Annual SOC 2 Type II compliance assessment covering security, availability, and confidentiality trust service criteria",
  "framework": "soc2",
  "framework_version": "2017",
  "status": "in_progress",
  "progress": 65,
  "assignee_id": "usr-550e8400-e29b-41d4-a716-446655440000",
  "assignee": {
    "id": "usr-550e8400-e29b-41d4-a716-446655440000",
    "email": "john.doe@example.com",
    "first_name": "John",
    "last_name": "Doe"
  },
  "organization_id": "org-550e8400-e29b-41d4-a716-446655440001",
  "start_date": "2024-01-15",
  "target_date": "2024-06-30",
  "completed_at": null,
  "control_count": 24,
  "completed_controls": 16,
  "evidence_count": 156,
  "created_at": "2024-01-10T14:22:00Z",
  "updated_at": "2024-03-15T09:30:00Z"
}
```

### POST /api/v1/assessments

Creates a new compliance assessment.

**Request Body:**
```json
{
  "title": "ISO 27001 Initial Certification",
  "description": "Initial certification assessment for ISO 27001:2022",
  "framework": "iso27001",
  "framework_version": "2022",
  "assignee_id": "usr-550e8400-e29b-41d4-a716-446655440000",
  "start_date": "2024-04-01",
  "target_date": "2024-09-30"
}
```

**Response 201 Created:**
```json
{
  "id": "asm-990j2844-i63f-85h8-e150-880099884444",
  "title": "ISO 27001 Initial Certification",
  "description": "Initial certification assessment for ISO 27001:2022",
  "framework": "iso27001",
  "framework_version": "2022",
  "status": "draft",
  "progress": 0,
  "assignee_id": "usr-550e8400-e29b-41d4-a716-446655440000",
  "organization_id": "org-550e8400-e29b-41d4-a716-446655440001",
  "start_date": "2024-04-01",
  "target_date": "2024-09-30",
  "completed_at": null,
  "created_at": "2024-03-15T10:30:00Z",
  "updated_at": "2024-03-15T10:30:00Z"
}
```

### PUT /api/v1/assessments/{id}

Updates an assessment's details or status.

**Request Body:**
```json
{
  "title": "SOC 2 Type II Annual Assessment - Updated",
  "status": "in_progress",
  "progress": 75,
  "target_date": "2024-07-15"
}
```

**Response 200 OK:**
Returns the updated assessment object.

### GET /api/v1/assessments/{id}/evidence

Retrieves all evidence collected for a specific assessment.

**Response 200 OK:**
```json
{
  "data": [
    {
      "id": "evd-aa0k3955-j74g-96i9-f261-991100995555",
      "assessment_id": "asm-880i1733-h52e-74g7-d049-779988773333",
      "control_id": "ctrl-cc2m6177-l96i-18k1-h483-113322117777",
      "title": "Firewall Configuration Audit",
      "description": "Quarterly firewall configuration audit report",
      "evidence_type": "document",
      "file_url": "https://storage.certfast.io/evidence/firewall-audit-q1-2024.pdf",
      "file_name": "firewall-audit-q1-2024.pdf",
      "file_size": 2457600,
      "mime_type": "application/pdf",
      "uploaded_by": "usr-550e8400-e29b-41d4-a716-446655440000",
      "uploaded_at": "2024-03-10T14:30:00Z",
      "review_status": "approved",
      "reviewed_by": "usr-660f9511-f30c-52e5-b827-557766551111",
      "reviewed_at": "2024-03-12T09:15:00Z",
      "created_at": "2024-03-10T14:30:00Z",
      "updated_at": "2024-03-12T09:15:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 156,
    "total_pages": 8
  }
}
```

---

## Controls API

The Controls API manages security controls and their compliance status within assessments.

### GET /api/v1/controls

Returns a list of security controls.

**Request Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Results per page (default: 20)
- `assessment_id` (optional): Filter by assessment
- `category` (optional): Filter by control category
- `status` (optional): Filter by compliance status (compliant, non_compliant, partially_compliant, not_applicable)

**Response 200 OK:**
```json
{
  "data": [
    {
      "id": "ctrl-cc2m6177-l96i-18k1-h483-113322117777",
      "assessment_id": "asm-880i1733-h52e-74g7-d049-779988773333",
      "control_id": "CC6.1",
      "title": "Logical Access Security",
      "description": "The entity implements logical access security measures to protect against threats",
      "category": "access_control",
      "status": "compliant",
      "priority": "high",
      "evidence_count": 5,
      "assigned_to": "usr-550e8400-e29b-41d4-a716-446655440000",
      "due_date": "2024-03-31",
      "completed_at": "2024-03-10T14:30:00Z",
      "created_at": "2024-01-10T14:22:00Z",
      "updated_at": "2024-03-15T09:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 24,
    "total_pages": 2
  }
}
```

### GET /api/v1/controls/{id}

Retrieves detailed information about a specific control.

**Response 200 OK:**
```json
{
  "id": "ctrl-cc2m6177-l96i-18k1-h483-113322117777",
  "assessment_id": "asm-880i1733-h52e-74g7-d049-779988773333",
  "control_id": "CC6.1",
  "title": "Logical Access Security",
  "description": "The entity implements logical access security measures to protect against threats to system resources",
  "category": "access_control",
  "subcategory": "authentication",
  "status": "compliant",
  "priority": "high",
  "implementation_details": "Multi-factor authentication implemented across all critical systems. Access reviews conducted quarterly.",
  "test_plan": "Verify MFA is enforced for all admin accounts. Review access logs for unauthorized attempts.",
  "evidence_count": 5,
  "notes": "Control fully implemented as of Q4 2023",
  "assigned_to": "usr-550e8400-e29b-41d4-a716-446655440000",
  "due_date": "2024-03-31",
  "completed_at": "2024-03-10T14:30:00Z",
  "created_at": "2024-01-10T14:22:00Z",
  "updated_at": "2024-03-15T09:30:00Z"
}
```

### PUT /api/v1/controls/{id}

Updates a control's status and compliance information.

**Request Body:**
```json
{
  "status": "compliant",
  "implementation_details": "MFA has been rolled out to all user accounts. Quarterly access reviews are scheduled.",
  "notes": "Evidence collected and reviewed by security team",
  "assigned_to": "usr-550e8400-e29b-41d4-a716-446655440000",
  "due_date": "2024-04-15"
}
```

**Response 200 OK:**
```json
{
  "id": "ctrl-cc2m6177-l96i-18k1-h483-113322117777",
  "assessment_id": "asm-880i1733-h52e-74g7-d049-779988773333",
  "control_id": "CC6.1",
  "title": "Logical Access Security",
  "category": "access_control",
  "status": "compliant",
  "priority": "high",
  "implementation_details": "MFA has been rolled out to all user accounts. Quarterly access reviews are scheduled.",
  "notes": "Evidence collected and reviewed by security team",
  "assigned_to": "usr-550e8400-e29b-41d4-a716-446655440000",
  "due_date": "2024-04-15",
  "updated_at": "2024-03-15T10:45:00Z"
}
```

**Response 400 Bad Request:**
```json
{
  "error": "invalid_status",
  "message": "Status must be one of: compliant, non_compliant, partially_compliant, not_applicable",
  "valid_values": ["compliant", "non_compliant", "partially_compliant", "not_applicable"]
}
```

---

## Error Handling

All API endpoints return consistent error responses:

### Standard Error Format

```json
{
  "error": "error_code",
  "message": "Human-readable error description",
  "details": {},
  "request_id": "req-unique-identifier"
}
```

### Common HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 OK | Request successful |
| 201 Created | Resource created successfully |
| 204 No Content | Request successful, no body returned |
| 400 Bad Request | Invalid request parameters |
| 401 Unauthorized | Missing or invalid authentication |
| 403 Forbidden | Insufficient permissions |
| 404 Not Found | Resource does not exist |
| 422 Unprocessable Entity | Validation error |
| 429 Too Many Requests | Rate limit exceeded |
| 500 Internal Server Error | Server error |

### Rate Limiting

API requests are rate-limited per organization:
- Standard tier: 1000 requests/hour
- Professional tier: 5000 requests/hour
- Enterprise tier: 20000 requests/hour

Rate limit headers are included in all responses:
```
X-RateLimit-Limit: 5000
X-RateLimit-Remaining: 4992
X-RateLimit-Reset: 1710505800
```

---

## Pagination

All list endpoints support cursor-based and offset pagination using the following query parameters:

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | integer | Page number (1-indexed) |
| `limit` | integer | Items per page (max: 100) |
| `cursor` | string | Cursor for cursor-based pagination (optional) |

All paginated responses include a `pagination` object with total counts and navigation information.

---

## Versioning

The current API version is **v1**. Version is specified in the URL path:
```
/api/v1/{resource}
```

When breaking changes are introduced, a new version will be released with advance notice to all API consumers.
