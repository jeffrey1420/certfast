# Design Track - Task Queue

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

### Active Task (CURRENT)

**Task ID**: DSG-009
**Type**: Quick (15 min)
**Assigned Role**: `frontend-developer`
**Status**: ACTIVE - EXECUTE NOW
**Priority**: High
**Depends on**: DSG-008 ✅

#### Description
Layout Components

**Components:** Sidebar, Header, MainContent
**Responsive:** Mobile hamburger menu

**Pages to create:**
1. **Login** (`/login`) - Email + password, errors, loading
2. **Register** (`/register`) - Email, password, org name
3. **Forgot Password** (`/forgot-password`) - Email input
4. **Reset Password** (`/reset-password`) - New password form

**API:** `POST /api/v1/auth/login`, etc.

**Files to create:**
```
apps/web/src/routes/auth/
├── login.tsx
├── register.tsx
├── forgot-password.tsx
└── reset-password.tsx
```

**shadcn components to use:**
- `Button`, `Input`, `Label`, `Card`
- `Form` (with React Hook Form + Zod)

**Pattern:**
```typescript
// stores/auth.ts already exists
import { useAuthStore } from '@/stores/auth'

// API call
const response = await fetch('/api/v1/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
})
```

**Quality Gates:**
- [ ] 4 pages created
- [ ] Forms validated (Zod)
- [ ] Loading/error states handled
- [ ] Redirect after login
- [ ] Commit + push

**Commit:** `design/frontend-developer: created auth pages (login, register, forgot, reset)`

---

## Backlog - Sprint #2

### DSG-009: Layout Components
- **Role**: frontend-developer
- **Type**: Quick (15 min)
- **Depends on**: DSG-008

**Components:** Sidebar, Header, MainContent
**Responsive:** Mobile hamburger menu

---

### DSG-010: Dashboard Page
- **Role**: frontend-developer
- **Type**: Standard (30 min)
- **Depends on**: DSG-009

**Features:**
- 4 metric cards (Compliance Score, Assessments, Evidence, Days)
- Progress bar
- Recent activity list
- Quick actions buttons

**API:** `GET /api/v1/dashboard/metrics`

---

### DSG-011: Assessment List Page
- **Role**: frontend-developer
- **Type**: Standard (30 min)
- **Depends on**: DSG-009

**Features:**
- Table with pagination
- Filters (status, framework)
- Search
- Create button

---

### DSG-012: Assessment Detail Page
- **Role**: frontend-developer
- **Type**: Standard (30 min)
- **Depends on**: DSG-011

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
| Sprint #2 | 1/8 (DSG-007 ✅) |
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
