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

### Active Task (CURRENT)

**Task ID**: TEC-007
**Type**: Standard (30 min)
**Assigned Role**: `backend-developer`
**Status**: ACTIVE - EXECUTE NOW
**Priority**: Critical
**Depends on**: TEC-006 ✅

#### Description
Backend Project Setup (AdonisJS)

**REMINDER:** You have 30 minutes MAX. Follow TDD_STRATEGY.md - tests FIRST.

**REMINDER:** You have 30 minutes MAX. Copy snippets from `SIMPLIFIED_SPRINT2.md`, don't write from scratch.

**Files to create:**
1. `infrastructure/docker-compose.yml` - 6 services (app, postgres, redis, clickhouse, nginx)
2. `infrastructure/.env.example` - Environment variables
3. `infrastructure/docker/app/Dockerfile` - AdonisJS build
4. `infrastructure/nginx/nginx.conf` - Reverse proxy

**Quality Gates:**
- [ ] Valid `docker-compose.yml` (test with `docker-compose config`)
- [ ] 6 services defined
- [ ] Healthchecks configured
- [ ] Commit + push

**Commit:** `tech/devops-engineer: created Docker Compose infrastructure`

---

## Backlog - Sprint #2

### TEC-007: Backend Project Setup
- **Role**: backend-developer
- **Type**: Standard (30 min)
- **Depends on**: TEC-006 ✅
- **Doc**: `SIMPLIFIED_SPRINT2.md` section TEC-007

**Exact commands to run:**
```bash
cd /work/certfast/apps
npm init adonis-ts-app@latest api -- --eslint --prettier
# ... (see SIMPLIFIED_SPRINT2.md for rest)
```

---

### TEC-008: Database Migrations
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
