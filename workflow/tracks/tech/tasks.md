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

**Architecture maintenant alignée :**
- ✅ Bare metal server
- ✅ Docker Compose (pas Kubernetes)
- ✅ Cloudflare R2 (pas AWS S3)
- ✅ Self-hosted PostgreSQL + Redis + ClickHouse
- ✅ Nginx + Let's Encrypt

---

## 🚀 Sprint #2 - Development (READY)

### ⚡ NOUVELLE DOC : `SIMPLIFIED_SPRINT2.md`

**Les agents doivent lire :**
1. Cette tâche (ACTIVE ci-dessous)
2. `SIMPLIFIED_SPRINT2.md` pour le snippet de code exact

---

### Active Task (CURRENT)

**Task ID**: TEC-006
**Type**: Standard (30 min)
**Assigned Role**: `devops-engineer`
**Status**: ACTIVE - EXECUTE NOW
**Priority**: Critical

#### Description
Docker Compose Infrastructure

**RAPPEL :** Tu as 30 minutes MAX. Copie les snippets de `SIMPLIFIED_SPRINT2.md`, n'écris pas from scratch.

**Fichiers à créer :**
1. `infrastructure/docker-compose.yml` - 6 services (app, postgres, redis, clickhouse, nginx)
2. `infrastructure/.env.example` - Variables d'environnement
3. `infrastructure/docker/app/Dockerfile` - Build AdonisJS
4. `infrastructure/nginx/nginx.conf` - Reverse proxy

**Quality Gates:**
- [ ] `docker-compose.yml` valide (teste avec `docker-compose config`)
- [ ] 6 services définis
- [ ] Healthchecks configurés
- [ ] Commit + push

**Commit:** `tech/devops-engineer: created Docker Compose infrastructure`

---

## Backlog - Sprint #2

### TEC-007: Backend Project Setup
- **Role**: backend-developer
- **Type**: Standard (30 min)
- **Depends on**: TEC-006 ✅
- **Doc**: `SIMPLIFIED_SPRINT2.md` section TEC-007

**Commandes exactes à exécuter :**
```bash
cd /work/certfast/apps
npm init adonis-ts-app@latest api -- --eslint --prettier
# ... (voir SIMPLIFIED_SPRINT2.md pour la suite)
```

---

### TEC-008: Database Migrations
- **Role**: backend-developer
- **Type**: Standard (30 min)
- **Depends on**: TEC-007
- **Doc**: `SIMPLIFIED_SPRINT2.md` section TEC-008

**Tables :** users, organizations, organization_users, assessments, controls, evidence

---

### TEC-009: Auth System
- **Role**: backend-developer
- **Type**: Standard (30 min)
- **Depends on**: TEC-008
- **Doc**: `SIMPLIFIED_SPRINT2.md` section TEC-009

**Endpoints :** register, login, logout, me

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

**Note :** Evidence utilise Cloudflare R2 (voir `SIMPLIFIED_SPRINT2.md`)

---

### TEC-013: ClickHouse Integration
- **Role**: backend-developer
- **Type**: Quick (15 min)
- **Depends on**: TEC-007

**Setup basique pour analytics** - Pattern event tracking simple

---

### TEC-014: API Testing Suite
- **Role**: backend-developer
- **Type**: Standard (30 min)
- **Depends on**: TEC-012

**Tests Japa basiques** pour auth + 1-2 endpoints CRUD

---

## Track Status
| Metric | Value |
|--------|-------|
| Sprint #1 | 5/5 ✅ |
| Sprint #1.5 | 2/2 ✅ |
| Sprint #2 | 0/9 🚀 |
| Quality Average | 5.0/5 |

---

## ⚠️ Instructions Anti-Rate-Limit

1. **Lis SEULEMENT** la tâche ACTIVE + `SIMPLIFIED_SPRINT2.md`
2. **COPIE les snippets** - Ne réécris pas
3. **1 commit par tâche** - Push rapidement
4. **Pas de perfection** - Fonctionnel > Parfait
5. **Word count** : N/A pour le code, mais commente brièvement

**Guide complet pour agents :** `/work/certfast/workflow/AGENT_GUIDE.md`
