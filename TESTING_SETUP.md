# Testing Setup Guide

**Last Updated**: 2026-03-17  
**Status**: 🔴 Blocked - Docker not available in current environment

---

## Current Blocker

**Problem**: 73 integration tests fail with database connection errors because the PostgreSQL test database isn't running.

**Root Cause**: No Docker installation in the current execution environment.

**Required**: `postgres-test` container running on port 5433 (defined in `docker-compose.yml`)

---

## Quick Start (When Docker Available)

### Prerequisites
- Docker Engine 20.10+
- Docker Compose 2.0+
- Node.js 18+
- npm or pnpm

### 1. Start Test Database

```bash
# From project root
docker compose up -d postgres-test

# Verify it's running
docker compose ps postgres-test
docker compose logs postgres-test

# Check health
docker exec -it certfast-postgres-test pg_isready -U certfast -d certfast_test
```

### 2. Run Tests

```bash
cd apps/api

# Run all tests
npm test

# Run specific test file
npm test -- tests/functional/auth.spec.ts

# Run tests with coverage
npm test -- --coverage
```

---

## Test Database Configuration

### Connection Details

From `apps/api/.env.example`:

```env
DB_HOST_TEST=localhost
DB_PORT_TEST=5433
DB_USER_TEST=certfast
DB_PASSWORD_TEST=certfast_test_password
DB_DATABASE_TEST=certfast_test
```

### Docker Service

From `docker-compose.yml`:

```yaml
postgres-test:
  image: postgres:16-alpine
  container_name: certfast-postgres-test
  environment:
    POSTGRES_USER: certfast
    POSTGRES_PASSWORD: certfast_test_password
    POSTGRES_DB: certfast_test
  ports:
    - "5433:5432"
  tmpfs:
    - /var/lib/postgresql/data  # In-memory for speed
  healthcheck:
    test: ["CMD-SHELL", "pg_isready -U certfast -d certfast_test"]
    interval: 2s
    timeout: 3s
    retries: 10
```

**Key Features**:
- Uses `tmpfs` for in-memory storage (fast test execution)
- Runs on port `5433` (separate from dev DB on `5432`)
- PostgreSQL 16 Alpine (lightweight)
- Health check ensures DB is ready before tests run

---

## Test Architecture

### Test Database Reset Strategy

From `apps/api/tests/helpers.ts`:

```typescript
export async function resetDatabase() {
  await db.truncate('user_tokens')
  await db.truncate('policies')
  await db.truncate('evidence')
  await db.truncate('controls')
  await db.truncate('assessments')
  await db.truncate('users')
  await db.truncate('organizations')
}
```

Each test group calls `resetDatabase()` before running to ensure isolation.

### Test Structure

```
apps/api/tests/
├── helpers.ts           # Test utilities (resetDatabase, etc.)
└── functional/          # Integration tests
    ├── auth.spec.ts     # Auth endpoints (register, login, logout)
    ├── assessments.spec.ts
    ├── controls.spec.ts
    ├── evidence.spec.ts
    ├── policies.spec.ts
    ├── dashboard.spec.ts
    └── ...
```

### Test Count by Module

| Module | Tests | Status |
|--------|-------|--------|
| Auth | ~15 | ⏸️ Blocked |
| Assessments | ~12 | ⏸️ Blocked |
| Controls | ~15 | ⏸️ Blocked |
| Evidence | ~10 | ⏸️ Blocked |
| Policies | ~10 | ⏸️ Blocked |
| Dashboard | ~5 | ⏸️ Blocked |
| Organizations | ~6 | ⏸️ Blocked |
| **TOTAL** | **73** | ⏸️ Blocked on DB |

---

## Installation Script (For Future Use)

Create this file when Docker is available:

**`scripts/setup-test-db.sh`**:

```bash
#!/bin/bash

set -e

echo "🚀 CertFast Test Database Setup"
echo "================================"
echo ""

# Check Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker not found. Please install Docker first:"
    echo "   https://docs.docker.com/engine/install/"
    exit 1
fi

# Check Docker Compose
if ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose not found. Please install Docker Compose:"
    echo "   https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✅ Docker found: $(docker --version)"
echo "✅ Docker Compose found: $(docker compose version)"
echo ""

# Start test DB
echo "🐘 Starting PostgreSQL test database..."
docker compose up -d postgres-test

# Wait for health check
echo "⏳ Waiting for database to be ready..."
timeout 30 bash -c 'until docker compose ps postgres-test | grep -q "healthy"; do sleep 1; done' || {
    echo "❌ Database failed to become healthy"
    docker compose logs postgres-test
    exit 1
}

echo "✅ PostgreSQL test database is ready on port 5433"
echo ""

# Verify connection
echo "🔍 Testing database connection..."
docker exec certfast-postgres-test psql -U certfast -d certfast_test -c "SELECT version();" > /dev/null 2>&1 || {
    echo "❌ Failed to connect to database"
    exit 1
}

echo "✅ Database connection verified"
echo ""

# Check .env file
if [ ! -f "apps/api/.env" ]; then
    echo "⚠️  No .env file found. Creating from .env.example..."
    cp apps/api/.env.example apps/api/.env
    echo "✅ Created apps/api/.env"
    echo ""
    echo "⚠️  IMPORTANT: Update the following in apps/api/.env:"
    echo "   - APP_KEY (generate with: node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\")"
    echo "   - JWT_SECRET (same command)"
fi

echo ""
echo "🎉 Setup complete! You can now run tests:"
echo ""
echo "   cd apps/api"
echo "   npm test"
echo ""
```

Make it executable:
```bash
chmod +x scripts/setup-test-db.sh
```

---

## Troubleshooting

### Tests Fail with "Connection Refused"

**Symptoms**:
```
PostgresError: connect ECONNREFUSED 127.0.0.1:5433
```

**Solutions**:
1. Check if database is running:
   ```bash
   docker compose ps postgres-test
   ```

2. Check database logs:
   ```bash
   docker compose logs postgres-test
   ```

3. Restart database:
   ```bash
   docker compose restart postgres-test
   ```

4. Verify port not in use:
   ```bash
   lsof -i :5433  # macOS/Linux
   netstat -ano | findstr :5433  # Windows
   ```

### Database Won't Start

**Symptoms**:
- Container exits immediately
- Health check never passes

**Solutions**:
1. Check Docker logs:
   ```bash
   docker compose logs postgres-test
   ```

2. Remove and recreate:
   ```bash
   docker compose down
   docker volume prune  # Optional: remove volumes
   docker compose up -d postgres-test
   ```

3. Verify Docker resources:
   - Ensure Docker Desktop has enough memory (4GB+ recommended)

### Migrations Fail

**Symptoms**:
```
Migration failed: relation "..." does not exist
```

**Solutions**:
1. Reset test database:
   ```bash
   docker compose down
   docker compose up -d postgres-test
   ```

2. Run migrations manually:
   ```bash
   cd apps/api
   node ace migration:run --connection=test
   ```

---

## CI/CD Integration (Future)

When setting up CI/CD (GitHub Actions, GitLab CI, etc.), use this pattern:

### GitHub Actions Example

```yaml
name: API Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:16-alpine
        env:
          POSTGRES_USER: certfast
          POSTGRES_PASSWORD: certfast_test_password
          POSTGRES_DB: certfast_test
        ports:
          - 5433:5432
        options: >-
          --health-cmd "pg_isready -U certfast -d certfast_test"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: |
          cd apps/api
          npm ci
      
      - name: Run tests
        run: |
          cd apps/api
          npm test
        env:
          DB_HOST_TEST: localhost
          DB_PORT_TEST: 5433
          DB_USER_TEST: certfast
          DB_PASSWORD_TEST: certfast_test_password
          DB_DATABASE_TEST: certfast_test
```

---

## Next Steps

1. **Immediate** (when Docker available):
   - Run `scripts/setup-test-db.sh`
   - Execute `cd apps/api && npm test`
   - Fix any failing tests

2. **Short-term** (within 1 week):
   - Add test script to `apps/api/package.json` scripts
   - Document test writing guidelines
   - Set up CI/CD with automated test runs

3. **Medium-term** (within 1 month):
   - Add test coverage reporting
   - Implement pre-commit hooks for tests
   - Add performance benchmarks for API endpoints

---

## References

- **Docker Compose Config**: `/docker-compose.yml`
- **Test Helpers**: `/apps/api/tests/helpers.ts`
- **Environment Example**: `/apps/api/.env.example`
- **Project State**: `/workflow/PROJECT_STATE.md`
- **TDD Strategy**: `/TDD_STRATEGY.md`
- **Testing Guide**: `/TESTING_GUIDE.md`
