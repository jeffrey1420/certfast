# Tech Track - Task Queue

**Track Owner**: Technical Pipeline
**Current Phase**: Sprint #2 - Development Setup

---

## Sprint #1 - Foundation (COMPLETE)

### TEC-001: System Architecture ✅
**Role**: system-architect  
**Status**: ✅ COMPLETE  
**Quality Score**: 5/5

### TEC-002: Database Schema ✅
**Role**: database-architect  
**Status**: ✅ COMPLETE  
**Quality Score**: 5/5

### TEC-003: Core API Endpoints ✅
**Role**: api-designer  
**Status**: ✅ COMPLETE  
**Quality Score**: 5/5

### TEC-004: Security Architecture ✅
**Role**: security-architect  
**Status**: ✅ COMPLETE  
**Quality Score**: 5/5

### TEC-005: DevOps & Infrastructure ✅
**Role**: devops-engineer  
**Status**: ✅ COMPLETE  
**Quality Score**: 5/5

---

## Sprint #2 - Development Setup

### Active Task (CURRENT)

**Task ID**: TEC-006
**Type**: Standard (30 min)
**Assigned Role**: `devops-engineer`
**Status**: ACTIVE - EXECUTE NOW
**Priority**: Critical
**Sprint**: #2

#### Description
Docker Compose Infrastructure Setup

Create production-ready Docker Compose setup for bare metal deployment.

**Services Required:**
1. **App (AdonisJS)** - Node.js 20, healthcheck, graceful shutdown
2. **PostgreSQL** - v15, persistent volume, backups
3. **Redis** - v7, cache + sessions
4. **ClickHouse** - v23, analytics/events storage
5. **MinIO OR Cloudflare R2** - S3-compatible object storage for evidence files
6. **Nginx** - reverse proxy, SSL termination

**Deliverables:**
- `docker-compose.yml` - All services configured
- `docker-compose.prod.yml` - Production overrides (replicas, resources)
- `.env.example` - Environment variables template
- `docker/` folder with:
  - `app/Dockerfile` - Multi-stage build
  - `nginx/nginx.conf` - Reverse proxy config
  - `postgres/init.sql` - Initial schema if needed

**Technical Requirements:**
- Healthchecks on all services
- Restart policies (unless-stopped for dev, always for prod)
- Network isolation (frontend/backend/database networks)
- Volume persistence for data
- Resource limits (mem_limit, cpus)

**Quality Gates:**
- [ ] All 6 services defined
- [ ] Services start with `docker-compose up`
- [ ] Healthchecks configured
- [ ] Networks isolated
- [ ] Volumes persistent
- [ ] Min 400 lines or comprehensive setup

**Output Location:**
- `/work/certfast/infrastructure/docker-compose.yml`
- `/work/certfast/infrastructure/docker-compose.prod.yml`
- `/work/certfast/infrastructure/.env.example`
- `/work/certfast/infrastructure/docker/`

**Git Commit:**
Format: `tech/devops-engineer: created Docker Compose infrastructure with all services`

---

## Backlog - Sprint #2

### TEC-007: Backend Project Setup
- **Role**: backend-developer
- **Type**: Standard (30 min)
- **Depends on**: TEC-006 ✅
- **Priority**: Critical

**Description:**
Initialize AdonisJS v6 project with core dependencies.

**Setup checklist:**
```bash
npm init adonis-ts-app certfast-api
cd certfast-api
# Install packages:
# - @adonisjs/auth (JWT)
# - @adonisjs/lucid (ORM)
# - @adonisjs/redis
# - @adonisjs/mail
# - luxon (datetime)
# - @aws-sdk/client-s3 (for R2 compatibility)
# - clickhouse (official client)
```

**Configuration:**
- `config/database.ts` - PostgreSQL + ClickHouse config
- `config/redis.ts` - Redis sessions/cache
- `config/auth.ts` - JWT setup
- `config/mail.ts` - SMTP config
- `.env.example` - All required env vars

**Deliverables:**
- `/work/certfast/apps/api/` - Full Adonis project
- All config files properly typed
- README with setup instructions

---

### TEC-008: Database Migrations
- **Role**: backend-developer
- **Type**: Standard (30 min)
- **Depends on**: TEC-007
- **Priority**: High

**Description:**
Create Lucid migrations for all entities.

**Migrations needed:**
1. `users` - id, email, password, role, timestamps
2. `organizations` - id, name, plan, settings, timestamps
3. `organization_users` - pivot table with roles
4. `assessments` - id, org_id, name, framework, status, target_date
5. `controls` - id, assessment_id, code, name, status
6. `evidence` - id, control_id, file_key, file_name, status
7. `audit_logs` - id, user_id, action, entity, metadata

**Deliverables:**
- `/work/certfast/apps/api/database/migrations/*.ts`
- Migration rollback tested

---

### TEC-009: Auth System Implementation
- **Role**: backend-developer
- **Type**: Deep (60 min)
- **Depends on**: TEC-008
- **Priority**: Critical

**Description:**
Implement complete authentication system.

**Endpoints:**
- `POST /api/v1/auth/register` - Email/password registration
- `POST /api/v1/auth/login` - JWT token generation
- `POST /api/v1/auth/refresh` - Token refresh
- `POST /api/v1/auth/logout` - Token revocation
- `POST /api/v1/auth/forgot-password` - Password reset email
- `POST /api/v1/auth/reset-password` - Reset with token
- `GET /api/v1/auth/me` - Current user profile

**Features:**
- JWT access tokens (15min expiry)
- Refresh tokens (7 days, stored in Redis)
- Password hashing (Argon2)
- Email verification required
- Rate limiting on auth endpoints

**Deliverables:**
- Auth controller + validators
- Auth middleware
- Mail templates (verify email, reset password)
- Tests for all endpoints

---

### TEC-010: Core API Implementation - Users & Orgs
- **Role**: backend-developer
- **Type**: Standard (30 min)
- **Depends on**: TEC-009
- **Priority**: High

**Endpoints:**
Users:
- `GET /api/v1/users` - List (admin only)
- `GET /api/v1/users/:id` - Get one
- `PUT /api/v1/users/:id` - Update profile
- `DELETE /api/v1/users/:id` - Soft delete

Organizations:
- `GET /api/v1/orgs` - List my orgs
- `POST /api/v1/orgs` - Create org
- `GET /api/v1/orgs/:id` - Get org details
- `PUT /api/v1/orgs/:id` - Update org
- `DELETE /api/v1/orgs/:id` - Delete org

---

### TEC-011: Core API Implementation - Assessments
- **Role**: backend-developer
- **Type**: Standard (30 min)
- **Depends on**: TEC-010
- **Priority**: High

**Endpoints:**
- `GET /api/v1/assessments` - List by org
- `POST /api/v1/assessments` - Create assessment
- `GET /api/v1/assessments/:id` - Get with progress
- `PUT /api/v1/assessments/:id` - Update
- `DELETE /api/v1/assessments/:id` - Delete
- `GET /api/v1/assessments/:id/progress` - Completion stats

---

### TEC-012: Core API Implementation - Controls & Evidence
- **Role**: backend-developer
- **Type**: Standard (30 min)
- **Depends on**: TEC-011
- **Priority**: High

**Endpoints:**
Controls:
- `GET /api/v1/assessments/:id/controls` - List controls
- `PUT /api/v1/controls/:id` - Update status
- `GET /api/v1/controls/:id` - Get details

Evidence:
- `POST /api/v1/controls/:id/evidence` - Upload file
- `GET /api/v1/evidence/:id` - Get evidence details
- `DELETE /api/v1/evidence/:id` - Remove evidence
- `GET /api/v1/evidence/:id/download` - Download file

**Storage:**
- Use Cloudflare R2 (S3-compatible)
- Signed URLs for downloads
- File type validation (PDF, images, docs)
- Size limit: 50MB per file

---

### TEC-013: ClickHouse Integration
- **Role**: backend-developer
- **Type**: Standard (30 min)
- **Depends on**: TEC-007
- **Priority**: Medium

**Description:**
Setup ClickHouse for analytics and audit logging.

**Tables:**
- `events` - All user actions
- `audit_logs` - Compliance audit trail
- `metrics` - Performance metrics

**Features:**
- Event tracking middleware
- Batch inserts for performance
- Automated partitioning

---

### TEC-014: API Testing Suite
- **Role**: backend-developer
- **Type**: Deep (60 min)
- **Depends on**: TEC-012
- **Priority**: High

**Description:**
Complete test coverage for all endpoints.

**Tests needed:**
- Unit tests for models
- Functional tests for controllers
- Authentication flow tests
- File upload/download tests
- Rate limiting tests

**Coverage target:** 80%+

---

## Track Status
| Metric | Value |
|--------|-------|
| Sprint #1 Complete | 5/5 tasks |
| Sprint #2 Progress | 0/9 tasks |
| Quality Average | 5.0/5 |
