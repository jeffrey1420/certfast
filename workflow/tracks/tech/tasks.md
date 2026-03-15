# Tech Track - Task Queue

**Track Owner**: Technical Pipeline
**Current Phase**: Sprint #2 - Development (SIMPLIFIED)

---

## ✅ Sprint #1 - Foundation (COMPLETE)

| Task | Status | Notes |
|------|--------|-------|
| TEC-001: System Architecture | ✅ | AWS-based, SUPERSEDED by TEC-001-UPDATE |
| TEC-002: Database Schema | ✅ | PostgreSQL with migrations |
| TEC-003: Core API Endpoints | ✅ | RESTful API spec documented |
| TEC-004: Security Architecture | ✅ | Auth, encryption, compliance |
| TEC-005: DevOps & Infrastructure | ✅ | AWS-based, SUPERSEDED by TEC-005-UPDATE |

---

## ✅ Sprint #1.5 - Architecture Realignment (COMPLETE)

| Task | Status | Commit |
|------|--------|--------|
| **TEC-001-UPDATE**: System Architecture (bare metal) | ✅ | `7a7890f` |
| **TEC-005-UPDATE**: Infrastructure Plan (bare metal) | ✅ | Included in above |

**Architecture now aligned:**
- ✅ Bare metal server
- ✅ Docker Compose (not Kubernetes)
- ✅ Cloudflare R2 (not AWS S3)
- ✅ Self-hosted PostgreSQL + Redis + ClickHouse
- ✅ Nginx + Let's Encrypt

---

## 🚀 Sprint #2 - Development (READY)

### ⚡ NEW DOC: `SIMPLIFIED_SPRINT2.md`

**Agents must read:**
1. This task (ACTIVE below)
2. `SIMPLIFIED_SPRINT2.md` for exact code snippets

---

### ✅ TEC-006: Docker Compose Infrastructure - COMPLETE
**Commit**: `10f8ab9`
**Files created**:
- `infrastructure/docker-compose.yml`
- `infrastructure/.env.example`
- `infrastructure/docker/app/Dockerfile`
- `infrastructure/nginx/nginx.conf`

---

### ✅ TEC-007: Backend Project Setup - COMPLETE
**Commit**: `c1ed2ba`
**Files created**:
- `apps/api/package.json` - Dependencies (AdonisJS, Japa tests)
- `apps/api/bin/server.js` - HTTP server with health endpoint
- `apps/api/tests/health.spec.ts` - Japa tests (TDD)
- `apps/api/tsconfig.json` - TypeScript config
- `apps/api/Dockerfile` - Container build
- `apps/api/.env.example` - Environment variables
- `apps/api/config/*` - App, CORS, DB, Auth configs
- `apps/api/app/models/user.ts` - User model

**Features**:
- ✅ HTTP server with /health endpoint
- ✅ Japa test framework configured
- ✅ Tests written FIRST (TDD compliance)
- ✅ Docker support
- ✅ Environment config

---

### Active Task (CURRENT)

**Task ID**: TEC-008
**Type**: Standard (30 min)
**Assigned Role**: `backend-developer`
**Status**: ACTIVE - EXECUTE NOW
**Priority**: Critical
**Depends on**: TEC-007 ✅

#### Description
Database Migrations

**Tables to create:**
1. users - id, email, password, full_name, avatar_url, role, is_active, timestamps
2. organizations - id, name, slug, plan, settings, timestamps
3. organization_users - id, org_id, user_id, role, joined_at
4. assessments - id, org_id, title, type, status, due_date, timestamps
5. controls - id, assessment_id, title, status, evidence_required
6. evidence - id, control_id, file_url, file_type, uploaded_by, timestamps

**REMINDER:** Write tests FIRST per TDD_STRATEGY.md

**Files to create:**
1. `apps/api/database/migrations/001_create_users.ts`
2. `apps/api/database/migrations/002_create_organizations.ts`
3. `apps/api/database/migrations/003_create_organization_users.ts`
4. `apps/api/database/migrations/004_create_assessments.ts`
5. `apps/api/database/migrations/005_create_controls.ts`
6. `apps/api/database/migrations/006_create_evidence.ts`

**Commit:** `tech/backend-developer: created database migrations`

**Quality Gates:**
- [ ] 6 migration files created
- [ ] Tests written FIRST
- [ ] All tables have proper indexes
- [ ] Foreign keys defined
- [ ] Commit + push

---

## Backlog - Sprint #2

### ✅ TEC-007: Backend Project Setup - COMPLETE
- **Role**: backend-developer
- **Type**: Standard (30 min)
- **Commit**: `c1ed2ba`
- **Status**: ✅ COMPLETE

---

### TEC-008: Database Migrations - ACTIVE - EXECUTE NOW
- **Role**: backend-developer
- **Type**: Standard (30 min)
- **Depends on**: TEC-007
- **Doc**: `SIMPLIFIED_SPRINT2.md` section TEC-008

**Tables:** users, organizations, organization_users, assessments, controls, evidence

---

### TEC-009: Auth System
- **Role**: backend-developer
- **Type**: Standard (30 min)
- **Depends on**: TEC-008
- **Doc**: `SIMPLIFIED_SPRINT2.md` section TEC-009

**Endpoints:** register, login, logout, me

---

### TEC-010: Core API - Users & Orgs
- **Role**: backend-developer
- **Type**: Standard (30 min)
- **Depends on**: TEC-009

---

### TEC-011: Core API - Assessments
- **Role**: backend-developer
- **Type**: Standard (30 min)
- **Depends on**: TEC-010

---

### TEC-012: Core API - Controls & Evidence
- **Role**: backend-developer
- **Type**: Standard (30 min)
- **Depends on**: TEC-011

**Note:** Evidence uses Cloudflare R2 (see `SIMPLIFIED_SPRINT2.md`)

---

### TEC-013: ClickHouse Integration
- **Role**: backend-developer
- **Type**: Quick (15 min)
- **Depends on**: TEC-007

**Basic setup for analytics** - Simple event tracking pattern

---

### TEC-014: API Testing Suite
- **Role**: backend-developer
- **Type**: Standard (30 min)
- **Depends on**: TEC-012

**Basic Japa tests** for auth + 1-2 CRUD endpoints

---

## Track Status
| Metric | Value |
|--------|-------|
| Sprint #1 | 5/5 ✅ |
| Sprint #1.5 | 2/2 ✅ |
| Sprint #2 | 0/9 🚀 |
| Quality Average | 5.0/5 |

---

## ⚠️ Anti-Rate-Limit Instructions

1. **Read ONLY** the ACTIVE task + `SIMPLIFIED_SPRINT2.md`
2. **COPY the snippets** - Don't rewrite
3. **1 commit per task** - Push quickly
4. **No perfection** - Functional > Perfect
5. **Word count**: N/A for code, but brief comments

**Complete agent guide:** `/work/certfast/workflow/AGENT_GUIDE.md`
