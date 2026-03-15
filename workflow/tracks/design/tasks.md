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

Initialize modern React frontend with all required tooling.

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
│   │   ├── api.ts        # Axios instance
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
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
└── package.json
```

**Configuration:**
- Tailwind with custom colors from design tokens
- Path aliases (`@/components`, `@/lib`, etc.)
- Environment variables (`.env.example`)
- ESLint + Prettier config

**Quality Gates:**
- [ ] Project starts with `npm run dev`
- [ ] TypeScript compiles without errors
- [ ] Tailwind styles apply correctly
- [ ] shadcn/ui components render
- [ ] Build succeeds (`npm run build`)

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
   - Email + password form
   - "Remember me" checkbox
   - "Forgot password?" link
   - Error handling

2. **Register** (`/register`)
   - Email, password, confirm password
   - Organization name
   - Terms acceptance
   - Email validation

3. **Forgot Password** (`/forgot-password`)
   - Email input
   - Success state

4. **Reset Password** (`/reset-password`)
   - New password form
   - Token validation

**Deliverables:**
- `/work/certfast/apps/web/src/routes/auth/`
- Form validation with Zod
- API integration with auth endpoints
- Loading states
- Error messages

---

### DSG-009: Layout Components
- **Role**: frontend-developer
- **Type**: Standard (30 min)
- **Depends on**: DSG-008
- **Priority**: High

**Components:**
1. **AppShell** - Main layout wrapper
2. **Sidebar** - Navigation menu
   - Logo
   - Navigation items (Dashboard, Assessments, Settings)
   - User menu (profile, logout)
   - Collapsible on mobile

3. **Header** - Top bar
   - Page title
   - Breadcrumbs
   - Notification bell
   - User avatar dropdown

4. **MainContent** - Content area with proper padding

**Deliverables:**
- `/work/certfast/apps/web/src/components/layout/`
- Responsive design (mobile hamburger menu)
- Active state for current route

---

### DSG-010: Dashboard Page
- **Role**: frontend-developer
- **Type**: Deep (60 min)
- **Depends on**: DSG-009
- **Priority**: High

**Features:**
1. **Metrics Cards** (4 cards):
   - Compliance Score (donut chart)
   - Active Assessments (count)
   - Evidence Uploaded (count)
   - Days to Next Audit (countdown)

2. **Progress Section**:
   - Current assessment progress bar
   - % completion per framework

3. **Recent Activity**:
   - Last 5 actions (evidence uploaded, status changed)
   - Click to view details

4. **Quick Actions**:
   - "Upload Evidence" button
   - "View Assessments" button

**Deliverables:**
- `/work/certfast/apps/web/src/routes/dashboard/`
- API integration for metrics
- Loading skeletons
- Empty states

---

### DSG-011: Assessment List Page
- **Role**: frontend-developer
- **Type**: Standard (30 min)
- **Depends on**: DSG-009
- **Priority**: High

**Features:**
1. **Table/List** of assessments:
   - Name
   - Framework (SOC2, ISO27001, etc.)
   - Status badge (In Progress, Complete, Overdue)
   - Progress bar
   - Target date
   - Actions (View, Edit)

2. **Filters**:
   - By status
   - By framework
   - Search by name

3. **Create Button** - Opens modal

**Deliverables:**
- `/work/certfast/apps/web/src/routes/assessments/`
- Data table component
- Filter logic
- Empty state

---

### DSG-012: Assessment Detail Page
- **Role**: frontend-developer
- **Type**: Deep (60 min)
- **Depends on**: DSG-011
- **Priority**: High

**Features:**
1. **Header**:
   - Assessment name + edit
   - Status badge
   - Progress bar
   - Target date

2. **Controls List**:
   - Expandable sections by category
   - Control code + name
   - Status (Implemented, Partial, Not Started)
   - Evidence count

3. **Control Detail Panel**:
   - Description
   - Requirements checklist
   - Evidence upload zone
   - Upload history

4. **Evidence Upload**:
   - Drag & drop zone
   - File type validation
   - Progress indicator
   - Preview for images/PDFs

**Deliverables:**
- `/work/certfast/apps/web/src/routes/assessments/[id]/`
- File upload component
- Progress tracking
- Real-time updates

---

### DSG-013: Settings Pages
- **Role**: frontend-developer
- **Type**: Standard (30 min)
- **Depends on**: DSG-009
- **Priority**: Medium

**Pages:**
1. **Organization Settings** (`/settings/org`):
   - Org name, logo
   - Plan details
   - Member management (invite, remove, change roles)

2. **Profile Settings** (`/settings/profile`):
   - Personal info
   - Change password
   - Notification preferences

3. **Integrations** (`/settings/integrations`):
   - API keys
   - Webhook configuration

**Deliverables:**
- `/work/certfast/apps/web/src/routes/settings/`
- Form components
- Member invite flow

---

### DSG-014: UI Polish & Responsive
- **Role**: frontend-developer
- **Type**: Standard (30 min)
- **Depends on**: DSG-013
- **Priority**: Medium

**Tasks:**
1. Mobile responsiveness check
2. Dark mode support (if time permits)
3. Loading states throughout
4. Error boundaries
5. Toast notifications for actions
6. Confirm dialogs for destructive actions

---

## Track Status
| Metric | Value |
|--------|-------|
| Sprint #1 Complete | 6/6 tasks |
| Sprint #2 Progress | 0/8 tasks |
| Quality Average | 4.0/5 |
