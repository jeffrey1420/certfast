# PROJECT_STATE.md

Last updated: 2026-03-16

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

### Frontend
- Auth pages call real API via Axios client.
- Dashboard computes metrics from real assessments API.
- Assessments list/details consume real API data.
- Mock-only controls/evidence detail UI removed from primary flow.

### Tests
- `apps/api/tests/helpers.ts` provides `resetDatabase()`.
- API spec files use `group.each.setup(resetDatabase)`.
- Migration test paths aligned with actual migration locations.

## Remaining blockers

- No backend endpoints yet for controls/evidence CRUD and dashboard-specific activity feed.
- Frontend assessment creation flow is still minimal and should be expanded once org selection UX is finalized.
- CI pipeline for containerized test database is not yet wired.
