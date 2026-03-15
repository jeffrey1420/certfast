# Agent Execution Guide - SIMPLIFIED

**For agents executing Sprint #2 tasks**

---

## ⚡ GOLDEN RULE: Read LESS, Do MORE

**You have 15-30 minutes MAX. Don't waste time reading tons of files.**

---

## 📋 Pre-Start Checklist

1. ✅ Read ONLY this task in `tasks.md`
2. ✅ Check type: Quick (15min) / Standard (30min)
3. ✅ Create the deliverable directly
4. ✅ Commit + push

**DO NOT READ:**
- ❌ All architecture files
- ❌ Full CONTEXT.md
- ❌ Other tasks
- ❌ Design files

---

## 🏗️ Bare Metal Architecture (10-Second Summary)

```
Nginx (SSL) → AdonisJS API → PostgreSQL + Redis + ClickHouse + R2
```

**Stack:**
- Backend: AdonisJS v6 (Node.js 20)
- Frontend: React 18 + Vite (already created in `apps/web/`)
- DB: PostgreSQL 15 (Docker)
- Cache: Redis 7 (Docker)
- Analytics: ClickHouse 23 (Docker)
- Storage: Cloudflare R2 (S3-compatible)
- Proxy: Nginx + Let's Encrypt

---

## 💾 Cloudflare R2 (File Storage)

**For TEC-012 (Evidence upload):**

```typescript
// Use AWS S3 SDK (R2-compatible)
import { S3Client } from '@aws-sdk/client-s3'

const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.R2_ACCESS_KEY_ID,
    secretAccessKey: env.R2_SECRET_ACCESS_KEY,
  }
})
```

**Required buckets:**
- `certfast-evidence-{env}` - Evidence files
- `certfast-backups-{env}` - DB backups

---

## 🔧 Sprint #2 Tasks - Quick Guide

### TEC-006: Docker Compose
**Files to create:**
- `infrastructure/docker-compose.yml`
- `infrastructure/.env.example`

**Required services:**
```yaml
# 6 services: app, postgres, redis, clickhouse, nginx, (minio optional)
# Copy structure from architecture doc
```

### TEC-007: AdonisJS Setup
**Command:**
```bash
cd apps/
npm init adonis-ts-app api
cd api
npm install @adonisjs/auth @adonisjs/lucid @adonisjs/redis luxon
npm install @aws-sdk/client-s3 clickhouse
```

### TEC-008: Migrations
**Tables:** users, organizations, organization_users, assessments, controls, evidence, audit_logs
**Copy schema from:** `/work/certfast/architecture/database-schema.md`

### TEC-009: Auth
**Endpoints:** register, login, refresh, logout, forgot-password, reset-password, me
**JWT:** access token 15min, refresh token 7days in Redis

### TEC-010 to TEC-012: APIs
**Base URL:** `/api/v1/`
**Format:** REST JSON
**Auth:** Bearer token

### DSG-008 to DSG-014: Frontend
**Already setup in:** `apps/web/`
**API URL:** use `import.meta.env.VITE_API_URL`
**Components:** shadcn/ui already installed

---

## ✅ SIMPLIFIED Quality Gates

| Check | Quick (15min) | Standard (30min) |
|-------|---------------|------------------|
| File created | ✅ | ✅ |
| Code compiles/parses | ✅ | ✅ |
| `.env.example` updated | - | ✅ |
| Commit + push | ✅ | ✅ |

**Word count:** Not important for code, but comment your code.

---

## 🚨 Anti-Patterns to AVOID

❌ **DON'T:**
- Read 10 files before starting
- Rewrite the entire architecture
- Create complex code generators
- Chase perfection

✅ **DO:**
- Copy patterns from architecture doc
- Use reasonable defaults
- Test that it compiles/starts
- Push quickly

---

## 💡 Reminders

- **15 min = Quick**: Simple file, basic config
- **30 min = Standard**: Complete setup, but not over-engineered
- **NO Deep (60min)** for initial code
- **Commit format:** `tech/backend-developer: setup Adonis project`
- **Push MANDATORY** before finishing

---

## 📁 Expected Structure After Sprint #2

```
/work/certfast/
├── apps/
│   ├── api/              # AdonisJS (TEC-007)
│   │   ├── app/
│   │   ├── config/
│   │   ├── database/
│   │   └── start/
│   └── web/              # React (already created)
├── infrastructure/
│   ├── docker-compose.yml    # (TEC-006)
│   ├── docker-compose.prod.yml
│   └── .env.example
└── architecture/         # Docs already created
```

---

**Questions?** Refer to `/work/certfast/architecture/system-architecture.md` ONLY if blocked on technical decision.

**Now: EXECUTE your task and PUSH!** 🚀
