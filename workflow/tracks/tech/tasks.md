# Tech Track - Task Queue

**Track Owner**: Technical Pipeline
**Current Phase**: Sprint #1.5 - Architecture Realignment (bare metal)

---

## Sprint #1 - Foundation (COMPLETE)

### TEC-001: System Architecture ✅
**Role**: system-architect  
**Status**: ✅ COMPLETE (AWS-based - needs update)  
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
**Status**: ✅ COMPLETE (AWS-based - needs update)  
**Quality Score**: 5/5

---

## Sprint #1.5 - Architecture Realignment (CRITICAL)

### ⚠️ MANDATORY: Update Architecture for Bare Metal

The existing architecture documents (TEC-001, TEC-005) are AWS-focused. They MUST be updated for bare metal deployment before any coding begins.

---

### Active Task (CURRENT)

**Task ID**: TEC-001-UPDATE
**Type**: Deep (60 min)
**Assigned Role**: `system-architect`
**Status**: ACTIVE - EXECUTE NOW
**Priority**: CRITICAL
**Blocking**: All Sprint #2 development tasks

#### Description
Update System Architecture for Bare Metal Deployment

**Current State:**
- `/work/certfast/architecture/system-architecture.md` - AWS-based (EKS, RDS, ElastiCache)
- `/work/certfast/architecture/infrastructure-plan.md` - AWS-focused

**Required Changes:**
Replace AWS services with bare metal equivalents:

| AWS Service | Bare Metal Equivalent |
|-------------|----------------------|
| EKS (Kubernetes) | Docker Compose + single node deployment |
| RDS Aurora | Self-hosted PostgreSQL 15 |
| ElastiCache | Self-hosted Redis 7 |
| S3 | Cloudflare R2 (S3-compatible) OR MinIO |
| CloudFront | Nginx reverse proxy + caching |
| ALB | Nginx load balancing |
| Route53 | DNS handled by domain provider |
| AWS WAF | Nginx rate limiting + fail2ban |

**Deliverables:**
Update `/work/certfast/architecture/system-architecture.md` with:
1. **New Architecture Diagram** - Bare metal stack
2. **Component Changes** - Remove AWS references, add self-hosted
3. **Data Flow** - Update for single-node deployment
4. **Security Model** - Nginx + fail2ban instead of AWS WAF
5. **Backup Strategy** - Local backups + R2 offsite
6. **Monitoring** - Prometheus/Grafana instead of CloudWatch

**Key Sections to Rewrite:**
- Section 1.1 Architecture Diagram
- Section 2 (Application Layer) - Remove EKS references
- Section 3 (Data Layer) - Self-hosted PostgreSQL/Redis
- Section 4 (Storage) - R2 instead of S3
- Section 5 (Security) - Nginx + certbot SSL
- Section 6 (Deployment) - Docker Compose deployment

**Quality Gates:**
- [ ] No AWS-specific references remaining
- [ ] Bare metal architecture clearly documented
- [ ] Cloudflare R2 documented as primary storage
- [ ] Docker Compose deployment described
- [ ] 1500+ words

**Output Location:**
- `/work/certfast/architecture/system-architecture.md` (overwrite with updated version)

**Git Commit:**
Format: `tech/system-architect: updated architecture for bare metal deployment with Docker Compose and Cloudflare R2`

---

## Backlog - Architecture Realignment

### TEC-005-UPDATE: Update Infrastructure Plan
- **Role**: devops-engineer
- **Type**: Deep (60 min)
- **Priority**: CRITICAL
- **Depends on**: TEC-001-UPDATE
- **Blocking**: Sprint #2

**Description:**
Update `/work/certfast/architecture/infrastructure-plan.md` for bare metal.

**Changes Required:**
1. **Remove**: AWS account structure, EKS setup, RDS configuration
2. **Add**: 
   - Bare metal server specs (CPU, RAM, disk)
   - Docker Compose service definitions
   - Nginx configuration for reverse proxy
   - Cloudflare R2 setup guide
   - SSL/TLS with Let's Encrypt (certbot)
   - Backup scripts (local + R2)
   - Monitoring stack (Prometheus + Grafana)

**Deliverables:**
- Updated infrastructure-plan.md
- Server requirements document
- Deployment runbook

---

### TEC-006: Docker Compose Infrastructure
- **Role**: devops-engineer
- **Type**: Standard (30 min)
- **Priority**: CRITICAL
- **Depends on**: TEC-001-UPDATE, TEC-005-UPDATE
- **Note**: Only AFTER architecture docs are updated

**Description:**
Create Docker Compose setup (was previously defined, now aligns with updated architecture).

**Services:**
1. **app** - AdonisJS API
2. **postgres** - PostgreSQL 15
3. **redis** - Redis 7
4. **clickhouse** - ClickHouse 23
5. **nginx** - Reverse proxy + SSL
6. **minio** (optional) - Local S3-compatible storage

**Files:**
- `docker-compose.yml`
- `docker-compose.prod.yml`
- `.env.example`
- `docker/app/Dockerfile`
- `docker/nginx/nginx.conf`
- `scripts/setup.sh` - Initial setup script
- `scripts/backup.sh` - Backup to R2

---

## Sprint #2 - Development (BLOCKED until 1.5 complete)

### ⚠️ DEPENDENCY CHAIN

```
TEC-001-UPDATE (system-architecture.md)
    ↓
TEC-005-UPDATE (infrastructure-plan.md)
    ↓
TEC-006 (Docker Compose)
    ↓
TEC-007 (Backend Setup) - CAN START
```

### TEC-007: Backend Project Setup
- **Role**: backend-developer
- **Type**: Standard (30 min)
- **Priority**: Critical
- **Depends on**: TEC-006
- **Status**: BLOCKED

**Description:**
Initialize AdonisJS v6 project.

**Key Points:**
- Must reference updated architecture (not AWS)
- Use Cloudflare R2 for storage (not S3)
- PostgreSQL config for Docker (not RDS)
- Redis config for Docker (not ElastiCache)

---

### TEC-008: Database Migrations
- **Role**: backend-developer
- **Type**: Standard (30 min)
- **Depends on**: TEC-007
- **Status**: BLOCKED

---

### TEC-009: Auth System Implementation
- **Role**: backend-developer
- **Type**: Deep (60 min)
- **Depends on**: TEC-008
- **Status**: BLOCKED

---

### TEC-010: Core API Implementation - Users & Orgs
- **Role**: backend-developer
- **Type**: Standard (30 min)
- **Depends on**: TEC-009
- **Status**: BLOCKED

---

### TEC-011: Core API Implementation - Assessments
- **Role**: backend-developer
- **Type**: Standard (30 min)
- **Depends on**: TEC-010
- **Status**: BLOCKED

---

### TEC-012: Core API Implementation - Controls & Evidence
- **Role**: backend-developer
- **Type**: Standard (30 min)
- **Depends on**: TEC-011
- **Status**: BLOCKED

**Note:** Evidence storage uses **Cloudflare R2** (not AWS S3)

---

### TEC-013: ClickHouse Integration
- **Role**: backend-developer
- **Type**: Standard (30 min)
- **Depends on**: TEC-007
- **Status**: BLOCKED

---

### TEC-014: API Testing Suite
- **Role**: backend-developer
- **Type**: Deep (60 min)
- **Depends on**: TEC-012
- **Status**: BLOCKED

---

## Track Status
| Metric | Value |
|--------|-------|
| Sprint #1 Complete | 5/5 tasks |
| Sprint #1.5 (Realignment) | 0/3 tasks |
| Sprint #2 (Development) | 0/8 tasks - **BLOCKED** |
| Quality Average | 5.0/5 |

---

## ⚠️ CRITICAL NOTICE

**NO DEVELOPMENT SHOULD START** until:
1. ✅ TEC-001-UPDATE (System Architecture) - COMPLETE
2. ✅ TEC-005-UPDATE (Infrastructure Plan) - COMPLETE

The existing architecture documents are AWS-based and do not reflect the bare metal + Docker Compose + Cloudflare R2 approach.

**Next Actions:**
1. System Architect updates system-architecture.md
2. DevOps Engineer updates infrastructure-plan.md
3. Then and only then: Docker Compose and development begin
