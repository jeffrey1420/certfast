# Tech Track - Sprint #2 SIMPLIFIED

**NEW TASKS: Ultra-simple, executable in 15-30 min**

---

## ⚡ REMINDER: You have LIMITED TIME

- **Quick (15 min)**: 1-2 files, basic setup
- **Standard (30 min)**: 3-5 files, functional but simple
- **DO NOT READ** the full doc, use snippets below

---

## TEC-006: Docker Compose Infrastructure ⏱️ 30 min

**Files to create:**

### 1. `infrastructure/docker-compose.yml`

```yaml
version: '3.8'

services:
  app:
    build:
      context: ../apps/api
      dockerfile: ../../infrastructure/docker/app/Dockerfile
    container_name: certfast-api
    restart: unless-stopped
    environment:
      - NODE_ENV=production
      - PORT=3333
      - HOST=0.0.0.0
      - DB_HOST=postgres
      - DB_PORT=5432
      - DB_USER=certfast
      - DB_PASSWORD=${DB_PASSWORD}
      - DB_NAME=certfast
      - REDIS_HOST=redis
      - REDIS_PORT=6379
      - REDIS_PASSWORD=${REDIS_PASSWORD}
      - CLICKHOUSE_HOST=clickhouse
      - CLICKHOUSE_PORT=8123
      - R2_ACCOUNT_ID=${R2_ACCOUNT_ID}
      - R2_ACCESS_KEY_ID=${R2_ACCESS_KEY_ID}
      - R2_SECRET_ACCESS_KEY=${R2_SECRET_ACCESS_KEY}
      - R2_BUCKET=${R2_BUCKET}
      - JWT_SECRET=${JWT_SECRET}
    ports:
      - "3333:3333"
    depends_on:
      - postgres
      - redis
      - clickhouse
    networks:
      - certfast
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3333/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  postgres:
    image: postgres:15-alpine
    container_name: certfast-postgres
    restart: unless-stopped
    environment:
      - POSTGRES_USER=certfast
      - POSTGRES_PASSWORD=${DB_PASSWORD}
      - POSTGRES_DB=certfast
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    networks:
      - certfast
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U certfast"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: certfast-redis
    restart: unless-stopped
    command: redis-server --requirepass ${REDIS_PASSWORD}
    volumes:
      - redis_data:/data
    ports:
      - "6379:6379"
    networks:
      - certfast
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  clickhouse:
    image: clickhouse/clickhouse-server:23-alpine
    container_name: certfast-clickhouse
    restart: unless-stopped
    environment:
      - CLICKHOUSE_DB=certfast
      - CLICKHOUSE_USER=certfast
      - CLICKHOUSE_PASSWORD=${CLICKHOUSE_PASSWORD}
    volumes:
      - clickhouse_data:/var/lib/clickhouse
    ports:
      - "8123:8123"
      - "9000:9000"
    networks:
      - certfast
    healthcheck:
      test: ["CMD", "wget", "--spider", "-q", "http://localhost:8123/ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  nginx:
    image: nginx:alpine
    container_name: certfast-nginx
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/ssl:/etc/nginx/ssl:ro
      - certfast_static:/var/www/static:ro
    depends_on:
      - app
    networks:
      - certfast

volumes:
  postgres_data:
  redis_data:
  clickhouse_data:
  certfast_static:

networks:
  certfast:
    driver: bridge
```

### 2. `infrastructure/.env.example`

```bash
# Database
DB_PASSWORD=change_me_in_production

# Redis
REDIS_PASSWORD=change_me_in_production

# ClickHouse
CLICKHOUSE_PASSWORD=change_me_in_production

# Cloudflare R2 (for files)
R2_ACCOUNT_ID=your_account_id
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
R2_BUCKET=certfast-evidence

# JWT
JWT_SECRET=generate_random_string_min_32_chars

# App
NODE_ENV=production
```

### 3. `infrastructure/docker/app/Dockerfile`

```dockerfile
FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy app
COPY . .

# Build
RUN npm run build

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3333/health || exit 1

EXPOSE 3333

CMD ["node", "build/server.js"]
```

### 4. `infrastructure/nginx/nginx.conf`

```nginx
events {
    worker_connections 1024;
}

http {
    upstream api {
        server app:3333;
    }

    server {
        listen 80;
        server_name _;

        # Redirect HTTP to HTTPS (when SSL is ready)
        # return 301 https://$server_name$request_uri;

        location / {
            proxy_pass http://api;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }

        # Rate limiting
        limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
        limit_req zone=api burst=20 nodelay;
    }
}
```

**Commit:** `tech/devops-engineer: created Docker Compose with postgres, redis, clickhouse, nginx`

---

## TEC-007: AdonisJS Setup ⏱️ 30 min

**Commands to run:**

```bash
cd /work/certfast/apps
# Create project
npm init adonis-ts-app@latest api -- --eslint --prettier

# Wait for completion...
cd api

# Install essential packages
npm install @adonisjs/auth @adonisjs/lucid @adonisjs/redis
npm install luxon @aws-sdk/client-s3
npm install clickhouse

# Configure providers
node ace configure @adonisjs/lucid
node ace configure @adonisjs/redis
node ace configure @adonisjs/auth
```

**Config files to create/modify:**

1. `apps/api/.env.example`:
```bash
PORT=3333
HOST=0.0.0.0
NODE_ENV=development
APP_KEY=generate_with_node_ace_generate_key
DB_CONNECTION=pg
PG_HOST=localhost
PG_PORT=5432
PG_USER=certfast
PG_PASSWORD=secret
PG_DB_NAME=certfast
REDIS_CONNECTION=local
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=secret
```

**Commit:** `tech/backend-developer: initialized AdonisJS with auth, lucid, redis`

---

## TEC-008: Database Migrations ⏱️ 30 min

**Commands:**

```bash
cd /work/certfast/apps/api

# Create migrations
node ace make:migration users
node ace make:migration organizations
node ace make:migration organization_users
node ace make:migration assessments
node ace make:migration controls
node ace make:migration evidence
```

**Edit each file in `database/migrations/` with this pattern:**

### `users`:
```typescript
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('gen_random_uuid()'))
      table.string('email', 255).notNullable().unique()
      table.string('password', 255).notNullable()
      table.string('first_name', 100)
      table.string('last_name', 100)
      table.enum('role', ['admin', 'member', 'viewer']).defaultTo('member')
      table.boolean('is_email_verified').defaultTo(false)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
```

**Commit:** `tech/backend-developer: created migrations for users, orgs, assessments, controls, evidence`

---

## TEC-009: Auth System ⏱️ 30 min

**Files to create:**

1. `apps/api/app/controllers/auth_controller.ts`:

```typescript
import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const data = request.only(['email', 'password', 'firstName', 'lastName'])
    const user = await User.create(data)
    return response.created(user)
  }

  async login({ request, response, auth }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.verifyCredentials(email, password)
    const token = await auth.use('api').generate(user)
    return response.ok({ user, token })
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('api').revoke()
    return response.ok({ message: 'Logged out' })
  }

  async me({ auth, response }: HttpContext) {
    const user = auth.use('api').user
    return response.ok(user)
  }
}
```

2. `apps/api/start/routes.ts` (add):

```typescript
import router from '@adonisjs/core/services/router'
const AuthController = () => import('#controllers/auth_controller')

router.group(() => {
  router.post('/auth/register', [AuthController, 'register'])
  router.post('/auth/login', [AuthController, 'login'])
  router.post('/auth/logout', [AuthController, 'logout']).use(middleware.auth())
  router.get('/auth/me', [AuthController, 'me']).use(middleware.auth())
}).prefix('/api/v1')
```

**Commit:** `tech/backend-developer: implemented auth endpoints (register, login, logout, me)`

---

## TEC-010 to TEC-012: API CRUD ⏱️ 30 min each

**Pattern for each resource:**

1. Create model: `node ace make:model Assessment`
2. Create controller: `node ace make:controller assessment`
3. Add routes in `start/routes.ts`

**Example for Assessments:**

```typescript
// app/models/assessment.ts
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Organization from './organization.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Assessment extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare organizationId: string

  @column()
  declare name: string

  @column()
  declare framework: string

  @column()
  declare status: 'not_started' | 'in_progress' | 'complete'

  @column()
  declare targetDate: Date

  @belongsTo(() => Organization)
  declare organization: BelongsTo<typeof Organization>
}
```

**Commit format:** `tech/backend-developer: implemented [resource] CRUD endpoints`

---

## Rules to AVOID Rate Limits

1. **COPY the snippets above** - Don't rewrite them
2. **1 commit = 1 task** - Push quickly
3. **No perfection** - Functional > Perfect
4. **Minimal comments** - Code should speak
5. **Tests?** Optional for now

**If stuck:** Read ONLY `/work/certfast/architecture/system-architecture.md` relevant section.

---

**GO! Create your files and PUSH!** 🚀
