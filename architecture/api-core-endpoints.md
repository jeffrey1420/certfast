# Core API Endpoints

This document describes the core REST API endpoints for CertFast.

## Authentication

All API requests require an `Authorization` header with a Bearer token:

```
Authorization: Bearer {token}
```

---

## 1. Users API

### GET /api/v1/users
Returns list of users in the organization.

**Headers:**
- Authorization: Bearer {token}

**Response 200:**
```json
{
  "users": [
    {
      "id": "uuid",
      "email": "user@example.com",
      "role": "admin",
      "created_at": "2026-03-15T08:30:00Z"
    }
  ]
}
```

**Response 401:**
```json
{"error": "Unauthorized"}
```

### GET /api/v1/users/{id}
Returns a specific user by ID.

**Headers:**
- Authorization: Bearer {token}

**Response 200:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "role": "admin",
  "created_at": "2026-03-15T08:30:00Z"
}
```

**Response 404:**
```json
{"error": "User not found"}
```

### POST /api/v1/users
Creates a new user.

**Headers:**
- Authorization: Bearer {token}
- Content-Type: application/json

**Request Body:**
```json
{
  "email": "newuser@example.com",
  "role": "member"
}
```

**Response 201:**
```json
{
  "id": "uuid",
  "email": "newuser@example.com",
  "role": "member",
  "created_at": "2026-03-15T08:30:00Z"
}
```

**Response 400:**
```json
{"error": "Invalid email format"}
```

### PUT /api/v1/users/{id}
Updates an existing user.

**Headers:**
- Authorization: Bearer {token}
- Content-Type: application/json

**Request Body:**
```json
{
  "role": "viewer"
}
```

**Response 200:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "role": "viewer",
  "updated_at": "2026-03-15T09:00:00Z"
}
```

### DELETE /api/v1/users/{id}
Deletes a user.

**Headers:**
- Authorization: Bearer {token}

**Response 204:** No content

**Response 404:**
```json
{"error": "User not found"}
```

---

## 2. Organizations API

### GET /api/v1/orgs
Returns list of organizations.

**Headers:**
- Authorization: Bearer {token}

**Response 200:**
```json
{
  "organizations": [
    {
      "id": "uuid",
      "name": "Acme Corp",
      "plan": "pro",
      "created_at": "2026-01-15T10:00:00Z"
    }
  ]
}
```

### GET /api/v1/orgs/{id}
Returns a specific organization.

**Headers:**
- Authorization: Bearer {token}

**Response 200:**
```json
{
  "id": "uuid",
  "name": "Acme Corp",
  "plan": "pro",
  "settings": {
    "timezone": "Europe/Paris",
    "currency": "EUR"
  },
  "created_at": "2026-01-15T10:00:00Z"
}
```

**Response 404:**
```json
{"error": "Organization not found"}
```

### POST /api/v1/orgs
Creates a new organization.

**Headers:**
- Authorization: Bearer {token}
- Content-Type: application/json

**Request Body:**
```json
{
  "name": "New Company",
  "plan": "starter"
}
```

**Response 201:**
```json
{
  "id": "uuid",
  "name": "New Company",
  "plan": "starter",
  "created_at": "2026-03-15T08:30:00Z"
}
```

### PUT /api/v1/orgs/{id}
Updates an organization.

**Headers:**
- Authorization: Bearer {token}
- Content-Type: application/json

**Request Body:**
```json
{
  "name": "Updated Name",
  "plan": "enterprise"
}
```

**Response 200:**
```json
{
  "id": "uuid",
  "name": "Updated Name",
  "plan": "enterprise",
  "updated_at": "2026-03-15T09:00:00Z"
}
```

---

## 3. Assessments API

### GET /api/v1/assessments
Returns list of compliance assessments.

**Headers:**
- Authorization: Bearer {token}

**Response 200:**
```json
{
  "assessments": [
    {
      "id": "uuid",
      "name": "SOC 2 Type I",
      "status": "in_progress",
      "progress_percent": 65,
      "target_date": "2026-06-15"
    }
  ]
}
```

### GET /api/v1/assessments/{id}
Returns a specific assessment.

**Headers:**
- Authorization: Bearer {token}

**Response 200:**
```json
{
  "id": "uuid",
  "name": "SOC 2 Type I",
  "framework": "SOC2",
  "status": "in_progress",
  "progress_percent": 65,
  "controls_count": 42,
  "controls_completed": 27,
  "target_date": "2026-06-15",
  "created_at": "2026-03-01T10:00:00Z"
}
```

**Response 404:**
```json
{"error": "Assessment not found"}
```

### POST /api/v1/assessments
Creates a new assessment.

**Headers:**
- Authorization: Bearer {token}
- Content-Type: application/json

**Request Body:**
```json
{
  "name": "ISO 27001",
  "framework": "ISO27001",
  "target_date": "2026-09-01"
}
```

**Response 201:**
```json
{
  "id": "uuid",
  "name": "ISO 27001",
  "framework": "ISO27001",
  "status": "not_started",
  "target_date": "2026-09-01",
  "created_at": "2026-03-15T08:30:00Z"
}
```

### PUT /api/v1/assessments/{id}
Updates an assessment.

**Headers:**
- Authorization: Bearer {token}
- Content-Type: application/json

**Request Body:**
```json
{
  "status": "in_review",
  "target_date": "2026-07-01"
}
```

**Response 200:**
```json
{
  "id": "uuid",
  "name": "SOC 2 Type I",
  "status": "in_review",
  "target_date": "2026-07-01",
  "updated_at": "2026-03-15T09:00:00Z"
}
```

### GET /api/v1/assessments/{id}/evidence
Returns evidence for an assessment.

**Headers:**
- Authorization: Bearer {token}

**Response 200:**
```json
{
  "evidence": [
    {
      "id": "uuid",
      "control_id": "CC1.1",
      "file_name": "policy.pdf",
      "status": "approved",
      "uploaded_at": "2026-03-10T14:30:00Z"
    }
  ]
}
```

---

## 4. Controls API

### GET /api/v1/controls
Returns list of security controls.

**Headers:**
- Authorization: Bearer {token}

**Response 200:**
```json
{
  "controls": [
    {
      "id": "uuid",
      "code": "CC1.1",
      "name": "Logical Access Security",
      "status": "implemented",
      "priority": "high"
    }
  ]
}
```

### GET /api/v1/controls/{id}
Returns a specific control.

**Headers:**
- Authorization: Bearer {token}

**Response 200:**
```json
{
  "id": "uuid",
  "code": "CC1.1",
  "name": "Logical Access Security",
  "description": "Controls provide reasonable assurance...",
  "status": "implemented",
  "evidence_required": ["access_policy", "user_list"],
  "priority": "high"
}
```

**Response 404:**
```json
{"error": "Control not found"}
```

### PUT /api/v1/controls/{id}
Updates a control status.

**Headers:**
- Authorization: Bearer {token}
- Content-Type: application/json

**Request Body:**
```json
{
  "status": "implemented",
  "notes": "Policy updated and approved"
}
```

**Response 200:**
```json
{
  "id": "uuid",
  "code": "CC1.1",
  "name": "Logical Access Security",
  "status": "implemented",
  "updated_at": "2026-03-15T09:00:00Z"
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": {}
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `204` - No content
- `400` - Bad request
- `401` - Unauthorized
- `404` - Not found
- `500` - Server error
