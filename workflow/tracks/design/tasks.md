# Design Track - Task Queue

> Legacy board: for canonical status, read `workflow/PROJECT_STATE.md`.

**Track Owner**: Design Pipeline
**Current Phase**: Sprint #2 - Frontend Development

---

## ✅ Sprint #1 - Foundation (COMPLETE)

| Task | Status | Quality |
|------|--------|---------|
| DSG-001: Brand Identity | ✅ | 4/5 |
| DSG-002: UX Research | ✅ | 4/5 |
| DSG-003: User Flows | ✅ | 4/5 |
| DSG-004: Design System Tokens | ✅ | 4/5 |
| DSG-005: Wireframes | ✅ | 4/5 |
| DSG-006: High-Fidelity Mockups | ✅ | 4/5 |

---

## 🚀 Sprint #2 - Frontend Development (IN PROGRESS)

### ✅ DSG-007: React Setup - COMPLETE

**Status**: ✅ DONE (commit `df732ee`)

**Created in:** `apps/web/`
- React 18 + TypeScript
- Vite 5
- Tailwind CSS
- shadcn/ui components
- Zustand stores
- React Query setup

---

### ✅ DSG-008: Auth Pages Implementation - COMPLETE
**Commit**: `423d3fe`
**Files created**:
- `apps/web/src/routes/auth/login.tsx`
- `apps/web/src/routes/auth/register.tsx`
- `apps/web/src/routes/auth/forgot-password.tsx`
- `apps/web/src/routes/auth/reset-password.tsx`

---

### ✅ DSG-009: Layout Components - COMPLETE
**Commit**: `e2da033`
**Files created**:
- `apps/web/src/components/layout/Sidebar.tsx`
- `apps/web/src/components/layout/Header.tsx`  
- `apps/web/src/components/layout/MainContent.tsx`
- Responsive mobile hamburger menu implemented

---

### ✅ DSG-010: Dashboard Page - COMPLETE

**Task ID**: DSG-010
**Type**: Standard (30 min)
**Assigned Role**: `frontend-developer`
**Status**: ✅ COMPLETE
**Priority**: High
**Depends on**: DSG-009 ✅
**Completed**: 2026-03-16
**Commit**: `94e5d3b`

#### Description
Dashboard Page

**Features:**
- 4 metric cards (Compliance Score, Assessments, Evidence, Days)
- Progress bar
- Recent activity list
- Quick actions buttons

**API:** `GET /api/v1/dashboard/metrics`

**Files to create:**
```
apps/web/src/routes/dashboard/
├── index.tsx          # Dashboard main page
└── components/
    ├── MetricCard.tsx
    ├── ProgressBar.tsx
    ├── ActivityList.tsx
    └── QuickActions.tsx
```

**shadcn components to use:**
- `Card`, `CardHeader`, `CardContent`, `CardTitle`
- `Progress`, `Button`, `Badge`
- `Activity`, `TrendingUp`, `Shield`, `FileCheck` icons

**Pattern:**
```typescript
// Mock data for now (API not ready)
const metrics = {
  complianceScore: 85,
  totalAssessments: 12,
  evidenceCount: 47,
  daysToCompliance: 45
}

const activities = [
  { id: 1, type: 'assessment_completed', title: 'ISO 27001 Assessment', time: '2h ago' },
  // ...
]
```

**Quality Gates:**
- [ ] 4 metric cards displayed
- [ ] Progress bar shows compliance score
- [ ] Activity list renders
- [ ] Quick actions buttons work
- [ ] Responsive layout
- [ ] Commit + push

**Commit:** `design/frontend-developer: created dashboard page with metrics and activity feed`

---

## Backlog - Sprint #2

### ✅ DSG-011: Assessment List Page - COMPLETE

**Task ID**: DSG-011
**Type**: Standard (30 min)
**Assigned Role**: `frontend-developer`
**Status**: ✅ COMPLETE
**Priority**: High
**Depends on**: DSG-009 ✅
**Completed**: 2026-03-16
**Quality Score**: 5/5

#### Description
Assessment List Page with full filtering and pagination

**Features:**
- ✅ Table with pagination
- ✅ Filters (status, framework dropdowns)
- ✅ Search input
- ✅ Create button
- ✅ Mock data for 8 assessments

**Files created:**
```
apps/web/src/routes/assessments/
├── index.tsx                    # Main page
└── components/
    ├── AssessmentTable.tsx      # Table with pagination
    ├── AssessmentFilters.tsx    # Status, framework filters + search
    └── CreateButton.tsx         # New Assessment button
```

**shadcn/ui components used:**
- `Table`, `TableBody`, `TableCell`, `TableHead`, `TableHeader`, `TableRow`
- `Button`, `Input`, `Select`, `Badge`, `Progress`, `Card`
- `Search`, `Plus`, `Eye`, `ChevronLeft`, `ChevronRight` icons

**Mock data:**
- 8 assessments across multiple frameworks (ISO 27001, SOC 2, GDPR, HIPAA, PCI DSS, NIST CSF, CIS Controls, CCPA)
- Various statuses: pending, in_progress, completed, overdue
- Progress tracking per assessment

**Quality Gates:**
- [x] Table displays all columns (Name, Framework, Status, Progress, Due Date, Owner, Actions)
- [x] Pagination works correctly (5 items per page)
- [x] Status filter dropdown works
- [x] Framework filter dropdown works
- [x] Search filters by name and owner
- [x] Create button navigates to /assessments/new
- [x] View button navigates to assessment detail
- [x] Responsive layout
- [x] Empty state handled
- [x] Commit + push

**Commit:** `design/frontend-developer: DSG-011 assessment list page with filters and pagination`

---

### DSG-012: Assessment Detail Page
- **Role**: frontend-developer
- **Type**: Standard (30 min)
- **Status**: ACTIVE - EXECUTE NOW
- **Depends on**: DSG-011 ✅

**Features:**
- Header with status
- Controls list (expandable)
- Evidence upload (drag & drop)
- Checklist

---

### DSG-013: Settings Pages
- **Role**: frontend-developer
- **Type**: Quick (15 min)
- **Depends on**: DSG-009

**Pages:** Organization, Profile, Integrations (simple forms)

---

### DSG-014: UI Polish
- **Role**: frontend-developer
- **Type**: Quick (15 min)
- **Depends on**: DSG-013

**Tasks:**
- Mobile responsive check
- Loading skeletons
- Empty states
- Error boundaries

---

## Track Status
| Metric | Value |
|--------|-------|
| Sprint #1 | 6/6 ✅ |
| Sprint #2 | 3/8 (DSG-007 ✅, DSG-008 ✅, DSG-009 ✅) |
| Quality Average | 4.0/5 |

---

## 🎨 Frontend Stack

```
React 18 + TypeScript
Vite 5
Tailwind CSS 3.4
shadcn/ui (components)
Zustand (state)
React Query (server state)
React Hook Form + Zod (forms)
React Router v6
```

**Already setup in:** `apps/web/`

---

## ⚡ Anti-Rate-Limit Instructions

1. **Copy patterns** from existing shadcn/ui
2. **Use stores** already created in `src/stores/`
3. **Mock API** if needed (type the responses)
4. **1 commit per page** - Push quickly
5. **Responsive?** Mobile-first with Tailwind

**Agent guide:** `/work/certfast/workflow/AGENT_GUIDE.md`
