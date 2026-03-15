# Design Track - Task Queue

**Track Owner**: Design Pipeline
**Current Phase**: Sprint #2 - Frontend Development

---

## Sprint #1 - Foundation (COMPLETE)

### DSG-001: Brand Identity ✅
**Role**: brand-designer  
**Type**: Deep (60 min)  
**Status**: ✅ COMPLETE  
**Quality Score**: 4/5

### DSG-002: UX Research ✅
**Role**: ux-researcher  
**Status**: ✅ COMPLETE  
**Quality Score**: 4/5

### DSG-003: User Flows ✅
**Role**: ux-researcher  
**Status**: ✅ COMPLETE  
**Quality Score**: 4/5

### DSG-004: Design System Tokens ✅
**Role**: ui-designer  
**Status**: ✅ COMPLETE  
**Quality Score**: 4/5

### DSG-005: Wireframes ✅
**Role**: ui-designer  
**Status**: ✅ COMPLETE  
**Quality Score**: 4/5

### DSG-006: High-Fidelity Mockups ✅
**Role**: ui-designer  
**Status**: ✅ COMPLETE  
**Quality Score**: 4/5

---

## Sprint #2 - Frontend Development

### Active Task (CURRENT)

**Task ID**: DSG-007
**Type**: Standard (30 min)
**Assigned Role**: `frontend-developer`
**Status**: ACTIVE - EXECUTE NOW
**Priority**: Critical
**Sprint**: #2

#### Description
React + Vite Project Setup

**Context:**
Backend will be AdonisJS on bare metal with Docker Compose. API base URL will be configurable via environment variable.

**Tech Stack:**
- **Framework**: React 18 + TypeScript
- **Build**: Vite 5
- **Styling**: Tailwind CSS 3.4
- **UI Components**: shadcn/ui
- **State**: Zustand
- **Query**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod
- **Router**: React Router v6
- **Icons**: Lucide React
- **Charts**: Recharts
- **Notifications**: Sonner

**Setup checklist:**
```bash
npm create vite@latest certfast-web -- --template react-ts
cd certfast-web
npm install

# Core packages
npm install react-router-dom zustand @tanstack/react-query axios

# Forms & validation
npm install react-hook-form @hookform/resolvers zod

# UI (shadcn/ui will handle most)
npx shadcn-ui@latest init

# Additional
npm install lucide-react recharts sonner clsx tailwind-merge
npm install -D tailwindcss postcss autoprefixer
```

**Deliverables:**
```
/work/certfast/apps/web/
├── src/
│   ├── components/
│   │   └── ui/           # shadcn components
│   ├── lib/
│   │   ├── api.ts        # Axios instance with env-based baseURL
│   │   ├── utils.ts      # cn() helper
│   │   └── constants.ts  # App constants
│   ├── hooks/
│   ├── stores/           # Zustand stores
│   ├── types/            # TypeScript types
│   ├── routes/           # Route components
│   ├── App.tsx
│   └── main.tsx
├── public/
├── index.html
├── .env.example          # VITE_API_URL=http://localhost:3333
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
└── package.json
```

**Configuration:**
- Tailwind with custom colors from design tokens
- Path aliases (`@/components`, `@/lib`, etc.)
- Environment variables (`.env.example`) with `VITE_API_URL`
- ESLint + Prettier config
- **API client configured for bare metal backend**

**Quality Gates:**
- [ ] Project starts with `npm run dev`
- [ ] TypeScript compiles without errors
- [ ] Tailwind styles apply correctly
- [ ] shadcn/ui components render
- [ ] Build succeeds (`npm run build`)
- [ ] `.env.example` includes API URL configuration

**Output Location:**
- `/work/certfast/apps/web/` - Complete React project

**Git Commit:**
Format: `design/frontend-developer: initialized React + Vite project with Tailwind and shadcn/ui`

---

## Backlog - Sprint #2

### DSG-008: Auth Pages Implementation
- **Role**: frontend-developer
- **Type**: Standard (30 min)
- **Depends on**: DSG-007 ✅
- **Priority**: Critical

**Pages:**
1. **Login** (`/login`)
2. **Register** (`/register`)
3. **Forgot Password** (`/forgot-password`)
4. **Reset Password** (`/reset-password`)

**Note:** Backend auth endpoints will be at `/api/v1/auth/*`

---

### DSG-009: Layout Components
- **Role**: frontend-developer
- **Type**: Standard (30 min)
- **Depends on**: DSG-008
- **Priority**: High

**Components:** AppShell, Sidebar, Header, MainContent

---

### DSG-010: Dashboard Page
- **Role**: frontend-developer
- **Type**: Deep (60 min)
- **Depends on**: DSG-009
- **Priority**: High

**Features:** Metrics cards, progress, recent activity, quick actions

---

### DSG-011: Assessment List Page
- **Role**: frontend-developer
- **Type**: Standard (30 min)
- **Depends on**: DSG-009
- **Priority**: High

**Features:** Table, filters, search, create button

---

### DSG-012: Assessment Detail Page
- **Role**: frontend-developer
- **Type**: Deep (60 min)
- **Depends on**: DSG-011
- **Priority**: High

**Features:** Controls list, evidence upload, checklist

**Note:** Evidence upload uses Cloudflare R2 (S3-compatible)

---

### DSG-013: Settings Pages
- **Role**: frontend-developer
- **Type**: Standard (30 min)
- **Depends on**: DSG-009
- **Priority**: Medium

**Pages:** Organization, Profile, Integrations

---

### DSG-014: UI Polish & Responsive
- **Role**: frontend-developer
- **Type**: Standard (30 min)
- **Depends on**: DSG-013
- **Priority**: Medium

**Tasks:** Mobile responsive, dark mode, loading states, error boundaries

---

## Track Status
| Metric | Value |
|--------|-------|
| Sprint #1 Complete | 6/6 tasks |
| Sprint #2 Progress | 0/8 tasks |
| Quality Average | 4.0/5 |

---

## Cross-Track Dependencies

| Design Task | Depends On | Status |
|-------------|-----------|--------|
| DSG-008 Auth Pages | Tech TEC-009 (Auth API) | Can develop with mocks |
| DSG-010 Dashboard | Tech TEC-010 (Users/Orgs API) | Can develop with mocks |
| DSG-012 Assessment Detail | Tech TEC-012 (Evidence API) | Can develop with mocks |

**Note:** Frontend can be developed against mock API responses. Integration happens when backend is ready.
