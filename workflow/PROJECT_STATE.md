# PROJECT_STATE.md

Last updated: 2026-03-18

## Canonical source of truth

This file is the **single source of truth** for project execution state.

The following files are now legacy status boards and are informational only:
- `workflow/current-sprint/ASSIGNED_TASK.md`
- `workflow/tracks/strategy/tasks.md`
- `workflow/tracks/design/tasks.md`
- `workflow/tracks/tech/tasks.md`

## Recovery decisions (accepted)

1. Canonical backend stack is **AdonisJS + PostgreSQL** (no in-memory auth/session state).
2. Frontend must consume real `/api/v1/*` endpoints for auth and assessments.
3. Automated monitor/guardian cron workflows are disabled until repo consistency is restored.
4. Test strategy:
   - real Postgres test database (`postgres-test`)
   - deterministic DB reset before each test
   - integration tests only for now (API + DB), with explicit fixture setup.

## Current implementation baseline

### Backend
- Auth tokens persisted in Postgres (`user_tokens` table).
- Auth middleware validates token against database.
- Register/login return `{ token, user }`.
- **Full CRUD endpoints implemented for:**
  - Controls (`/api/v1/controls`) - create, list, get, update, archive
  - Evidence (`/api/v1/evidence`) - create, list, get, update, delete (linked to controls)
  - Policies (`/api/v1/policies`) - full CRUD operations
  - Dashboard activity feed (`/api/v1/dashboard/activity`) - returns recent assessment updates

### Frontend
- Auth pages call real API via Axios client.
- Dashboard computes metrics from real assessments API.
- Assessments list/details consume real API data.
- Mock-only controls/evidence detail UI removed from primary flow.

### Tests
- `apps/api/tests/helpers.ts` provides `resetDatabase()`.
- API spec files use `group.each.setup(resetDatabase)`.
- Migration test paths aligned with actual migration locations.
- **Comprehensive integration tests exist for:**
  - Auth (register, login, logout, token validation)
  - Assessments (full CRUD)
  - Controls (full CRUD with organization ownership checks)
  - Evidence (full CRUD with control relationships)
  - Policies (full CRUD)
  - Dashboard (activity feed)
  - Organizations and Users
- **Test status:** 73 tests written, currently failing due to PostgreSQL test database not running (see infrastructure blocker below).

## Remaining blockers

### Infrastructure
- **PostgreSQL test database not running:** Tests require `postgres-test` on port 5433 (defined in docker-compose.yml). Current environment has no Docker and no PostgreSQL installation, causing all 73 integration tests to fail with connection errors. This blocks automated testing and CI/CD pipeline.
  
  **Solution Path**: Complete setup documentation and scripts now available:
  - 📖 **[TESTING_SETUP.md](../TESTING_SETUP.md)** - Comprehensive testing setup guide
  - 🔧 **[scripts/setup-test-db.sh](../scripts/setup-test-db.sh)** - Automated setup script for test database
  
  **Next Steps (when Docker available)**:
  1. Run `./scripts/setup-test-db.sh` from project root
  2. Execute `cd apps/api && npm test` to verify all 73 tests pass
  3. Add CI/CD pipeline with automated test runs (GitHub Actions example in TESTING_SETUP.md)

### Frontend
- Frontend assessment creation flow is still minimal and should be expanded once org selection UX is finalized.
- Controls and Evidence UI components exist but integration with backend CRUD endpoints needs verification and polish.
