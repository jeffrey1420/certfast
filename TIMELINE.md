# CertFast Project Timeline

**Generated**: 2026-03-15 19:00 CET  
**Current Phase**: Sprint #1.5 Architecture Realignment  
**Next Phase**: Sprint #2 MVP Development

---

## Current Status

| Metric | Value |
|--------|-------|
| **Sprint #1** | 21/21 tasks complete (100%) ✅ |
| **Sprint #1.5** | 0/2 tasks in progress |
| **Sprint #2** | 23/23 tasks ready (blocked) |
| **Time elapsed** | ~19 hours |
| **Quality Score** | 4.8/5 average |

---

## Phase Overview

```
SPRINT #1 Foundation        [████████████████████] 100% ✅ COMPLETE
SPRINT #1.5 Realignment     [░░░░░░░░░░░░░░░░░░░░] 0%   🟡 IN PROGRESS  
SPRINT #2 MVP Development   [░░░░░░░░░░░░░░░░░░░░] 0%   ⏳ READY (blocked)
```

---

## Sprint #1.5 — Architecture Realignment (ACTIVE)

**Duration**: ~2-3 hours  
**Purpose**: Update AWS-based architecture for bare metal + Docker + R2

### Tasks

| Task | Role | Type | Status |
|------|------|------|--------|
| TEC-001-UPDATE | system-architect | Deep (60 min) | 🔄 Active |
| TEC-005-UPDATE | devops-engineer | Deep (60 min) | ⏳ Waiting |

**Deliverables:**
- Updated `architecture/system-architecture.md` (bare metal stack)
- Updated `architecture/infrastructure-plan.md` (Docker Compose deployment)
- Server requirements specification
- Cloudflare R2 integration guide

**Blocking**: All Sprint #2 development until complete.

---

## Sprint #2 — MVP Development (READY)

**Duration**: ~2-3 days  
**Start**: After Sprint #1.5 complete  
**Total Tasks**: 23 (9 Tech + 8 Design + 6 Strategy)

### Tech Track (9 tasks)

| # | Task | Role | Type | Est. Time |
|---|------|------|------|-----------|
| TEC-006 | Docker Compose Infrastructure | devops-engineer | Standard | 30 min |
| TEC-007 | Backend Project Setup (AdonisJS) | backend-developer | Standard | 30 min |
| TEC-008 | Database Migrations | backend-developer | Standard | 30 min |
| TEC-009 | Auth System Implementation | backend-developer | Deep | 60 min |
| TEC-010 | Core API — Users & Orgs | backend-developer | Standard | 30 min |
| TEC-011 | Core API — Assessments | backend-developer | Standard | 30 min |
| TEC-012 | Core API — Controls & Evidence | backend-developer | Standard | 30 min |
| TEC-013 | ClickHouse Integration | backend-developer | Standard | 30 min |
| TEC-014 | API Testing Suite | backend-developer | Deep | 60 min |

**Tech Subtotal**: 9 tasks, ~5.5 hours raw, ~2.5 hours parallel

### Design Track (8 tasks)

| # | Task | Role | Type | Est. Time |
|---|------|------|------|-----------|
| DSG-007 | React + Vite Project Setup | frontend-developer | Standard | 30 min |
| DSG-008 | Auth Pages Implementation | frontend-developer | Standard | 30 min |
| DSG-009 | Layout Components | frontend-developer | Standard | 30 min |
| DSG-010 | Dashboard Page | frontend-developer | Deep | 60 min |
| DSG-011 | Assessment List Page | frontend-developer | Standard | 30 min |
| DSG-012 | Assessment Detail Page | frontend-developer | Deep | 60 min |
| DSG-013 | Settings Pages | frontend-developer | Standard | 30 min |
| DSG-014 | UI Polish & Responsive | frontend-developer | Standard | 30 min |

**Design Subtotal**: 8 tasks, ~5 hours raw, ~2 hours parallel

### Strategy Track (6 tasks)

| # | Task | Role | Type | Est. Time |
|---|------|------|------|-----------|
| STR-011 | Investor Pitch Deck Outline | product-strategist | Quick | 15 min |
| STR-012 | Beta Program Definition | product-strategist | Standard | 30 min |
| STR-013 | Landing Page Copywriting | content-strategist | Standard | 30 min |
| STR-014 | Sales Playbook v1 | business-analyst | Deep | 60 min |
| STR-015 | Launch Checklist | product-strategist | Standard | 30 min |
| STR-016 | First 100 Customers Plan | business-analyst | Standard | 30 min |

**Strategy Subtotal**: 6 tasks, ~3 hours raw, ~1.5 hours parallel

---

## Sprint #2 Time Calculation

### Raw Work Total
- **Tech**: 330 minutes (5.5h)
- **Design**: 300 minutes (5h)  
- **Strategy**: 195 minutes (3.25h)
- **Total**: 825 minutes (13.75h)

### Parallel Execution
With 3 tracks running simultaneously:
- **Parallel factor**: ~2.5x (not 3x due to dependencies)
- **Parallel time**: ~330 minutes (5.5h)

### Overhead
- Review loops (4 Deep tasks): +80 min
- PM synchronization (every 6h): +30 min
- Integration testing: +60 min
- Buffer: +40 min

### Total Sprint #2 Time
**~8-10 hours** (1-1.5 days with parallel agents)

---

## Overall Completion Estimate

| Phase | Duration | Cumulative |
|-------|----------|------------|
| Sprint #1 Foundation | ~19h | ✅ Complete |
| Sprint #1.5 Realignment | ~2-3h | 🟡 In Progress |
| Sprint #2 MVP Development | ~8-10h | ⏳ Ready |
| **Total to MVP** | **~12-15h** | **~1.5-2 days** |

**MVP Ready**: Tuesday/Wednesday March 17-18, 2026 (assuming continuous agent operation)

---

## What "MVP" Means

Upon Sprint #2 completion you will have:

### 🎯 Strategy
- Complete GTM strategy documentation
- Sales playbook for first hire
- Beta program structure
- Investor pitch deck

### 🎨 Design
- Complete React frontend with:
  - Authentication pages
  - Dashboard with metrics
  - Assessment management UI
  - Settings and profile
- Responsive design
- All screens functional

### 🏗️ Tech
- Complete backend with:
  - Docker Compose infrastructure (bare metal ready)
  - AdonisJS API with all endpoints
  - PostgreSQL + Redis + ClickHouse
  - JWT authentication
  - Cloudflare R2 file storage
  - API test suite

### ✅ Running System
```bash
docker-compose up -d
# → Web app at https://localhost
# → API at https://localhost/api/v1
```

---

## Dependencies & Critical Path

```
Sprint #1.5
├── TEC-001-UPDATE (System Architecture)
│   └── TEC-005-UPDATE (Infrastructure Plan)
│       └── TEC-006 (Docker Compose)
│           ├── TEC-007 (Backend Setup) ──┐
│           │   ├── TEC-008 (Migrations)  │
│           │   ├── TEC-013 (ClickHouse)  │
│           │   └── TEC-009 (Auth) ───────┤
│           │       ├── TEC-010 (Users)   │
│           │       ├── TEC-011 (Assess.) │
│           │       └── TEC-012 (Evidence)│
│           │                             │
│           └── DSG-007 (React Setup) ────┤
│               ├── DSG-008 (Auth UI)     │
│               ├── DSG-009 (Layout)      │
│               ├── DSG-010 (Dashboard)   │
│               ├── DSG-011 (List)        │
│               ├── DSG-012 (Detail)      │
│               ├── DSG-013 (Settings)    │
│               └── DSG-014 (Polish)      │
│                                         │
Strategy tracks (independent) ────────────┘
```

**Critical Path**: TEC-001-UPDATE → TEC-005-UPDATE → TEC-006 → TEC-007 → TEC-009 → Rest of dev

---

## Risk Factors

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| API rate limits | Medium | Delays | Reduced task frequency (45min) |
| Architecture complexity | Low | 2-4h delay | Clear bare metal requirements |
| Integration issues | Medium | 1-2h delay | Mock APIs for parallel dev |
| Agent failures | Low | 1h delay | Guardian auto-recovery |

---

*Generated by Project Manager Agent*  
*Last Updated: 2026-03-15 19:00 CET*
