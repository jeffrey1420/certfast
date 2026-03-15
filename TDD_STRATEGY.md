# Backend TDD Strategy - CertFast

**Document Version**: 1.0  
**Applies to**: All backend development (TEC-007 through TEC-014)  
**Mandate**: STRICT TDD - Tests FIRST, implementation SECOND

---

## Philosophy

> "If it's not tested, it doesn't exist. If it doesn't fail first, it's not TDD."

Every feature, endpoint, and service MUST follow the Red-Green-Refactor cycle.

---

## The TDD Cycle (Mandatory)

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   WRITE     │────▶│   MAKE IT   │────▶│   REFACTOR  │
│    TEST     │     │    PASS     │     │   (if needed)│
│  (Red 🔴)   │     │  (Green 🟢) │     │             │
└─────────────┘     └─────────────┘     └─────────────┘
        ▲                                        │
        └────────────────────────────────────────┘
```

### Step-by-Step Protocol

1. **RED** - Write a failing test
   - Start with the spec/test file
   - Define expected behavior
   - Run test → Confirm it FAILS
   - Commit: `test(auth): add register endpoint spec`

2. **GREEN** - Write minimal code to pass
   - Implement just enough to make the test pass
   - No refactoring yet
   - All tests must pass
   - Commit: `feat(auth): implement register endpoint`

3. **REFACTOR** - Clean up (if needed)
   - Only after green
   - Keep tests passing
   - Commit: `refactor(auth): extract validation logic`

---

## Test Structure

### File Organization

```
apps/api/
├── app/
│   ├── controllers/
│   │   ├── auth_controller.ts      # Implementation
│   │   └── auth_controller.spec.ts # Tests FIRST
│   ├── services/
│   │   ├── user_service.ts
│   │   └── user_service.spec.ts    # Tests FIRST
│   └── models/
│       ├── user.ts
│       └── user.spec.ts            # Tests FIRST
├── tests/
│   ├── functional/                 # API endpoint tests
│   │   ├── auth.spec.ts
│   │   └── assessments.spec.ts
│   └── unit/                       # Unit tests
│       ├── services/
│       └── utils/
```

### Naming Convention

| Component | Test File Pattern | Example |
|-----------|-------------------|---------|
| Controller | `{name}.controller.spec.ts` | `auth_controller.spec.ts` |
| Service | `{name}.service.spec.ts` | `user_service.spec.ts` |
| Model | `{name}.spec.ts` | `user.spec.ts` |
| Functional | `{feature}.spec.ts` | `auth.spec.ts` |

---

## Testing Pyramid (Follow Strictly)

```
       /\
      /  \     E2E Tests (1%)
     /----\    - Full API flows
    /      \   - Slow, expensive
   /--------\  
  /          \ Integration Tests (20%)
 /------------\ - Controller + DB
/              \ - Service boundaries
----------------
   Unit Tests (79%)
   - Services
   - Utilities
   - Pure functions
```

### Time Budget per Task

| Task Type | Test Time | Impl Time | Ratio |
|-----------|-----------|-----------|-------|
| Quick (15min) | 5 min | 8 min | 40% |
| Standard (30min) | 12 min | 15 min | 44% |
| Deep (60min) | 25 min | 30 min | 45% |

---

## Test Categories

### 1. Unit Tests (Services)

**What to test:**
- Business logic
- Input validation
- Error handling
- Edge cases

**Example:**
```typescript
// app/services/user_service.spec.ts
import { test } from '@japa/runner'
import UserService from './user_service.js'

test.group('UserService', () => {
  test('createUser - creates user with hashed password', async ({ assert }) => {
    // Arrange
    const data = { email: 'test@example.com', password: 'secret123' }
    
    // Act
    const user = await UserService.createUser(data)
    
    // Assert
    assert.equal(user.email, 'test@example.com')
    assert.notEqual(user.password, 'secret123') // hashed
    assert.isTrue(await Hash.verify(user.password, 'secret123'))
  })

  test('createUser - throws on duplicate email', async ({ assert }) => {
    // Arrange
    await UserService.createUser({ email: 'dup@example.com', password: 'pass' })
    
    // Act & Assert
    await assert.rejects(async () => {
      await UserService.createUser({ email: 'dup@example.com', password: 'pass' })
    }, /Email already exists/)
  })
})
```

### 2. Integration Tests (Controllers)

**What to test:**
- Request/response flow
- Authentication
- Database interactions
- Validation errors

**Example:**
```typescript
// tests/functional/auth.spec.ts
import { test } from '@japa/runner'
import { apiClient } from '@japa/api-client'

test.group('Auth Endpoints', (group) => {
  group.setup(async () => {
    // Setup: clean database
    await Database.truncate('users')
  })

  test('POST /api/v1/auth/register - creates new user', async ({ client, assert }) => {
    // Arrange
    const payload = {
      email: 'new@example.com',
      password: 'SecurePass123!',
      firstName: 'John',
      lastName: 'Doe'
    }
    
    // Act
    const response = await client
      .post('/api/v1/auth/register')
      .json(payload)
    
    // Assert
    response.assertStatus(201)
    response.assertBodyContains({ email: 'new@example.com' })
    assert.exists(response.body().id)
    assert.notExists(response.body().password) // never return password
  })

  test('POST /api/v1/auth/register - returns 422 on invalid email', async ({ client }) => {
    const response = await client
      .post('/api/v1/auth/register')
      .json({ email: 'invalid', password: 'short' })
    
    response.assertStatus(422)
    response.assertBodyContains({ errors: [{ field: 'email' }] })
  })

  test('POST /api/v1/auth/login - returns token on valid credentials', async ({ client, assert }) => {
    // Arrange: create user first
    await User.create({ email: 'login@test.com', password: 'password123' })
    
    // Act
    const response = await client
      .post('/api/v1/auth/login')
      .json({ email: 'login@test.com', password: 'password123' })
    
    // Assert
    response.assertStatus(200)
    assert.exists(response.body().token)
    assert.exists(response.body().user)
  })
})
```

---

## Required Test Coverage

### Minimum Coverage Thresholds

| Layer | Minimum Coverage | Enforced |
|-------|------------------|----------|
| Services | 90% | ✅ Yes |
| Controllers | 80% | ✅ Yes |
| Models | 70% | ⚠️ Recommended |
| Utils | 100% | ✅ Yes |

### Critical Paths (100% Coverage Required)

- [ ] Authentication (register, login, logout, refresh)
- [ ] Authorization (role checks, permissions)
- [ ] Payment flows (if applicable)
- [ ] Data validation (all inputs)
- [ ] Error handling (all error paths)

---

## TDD Workflow for Agents

### When Starting a Task

1. **Read this document** (TDD_STRATEGY.md)
2. **Create test file first**
   ```bash
   # Example for TEC-009 (Auth System)
   touch tests/functional/auth.spec.ts
   ```
3. **Write ONE failing test**
4. **Commit**: `test(auth): add register endpoint spec`
5. **Implement to pass**
6. **Commit**: `feat(auth): implement register endpoint`
7. **Next test** → Repeat

### Commit Sequence Example

```
test(auth): add register endpoint spec                    [RED]
test(auth): add login endpoint spec                       [RED]
feat(auth): implement register and login                  [GREEN]
test(auth): add logout endpoint spec                      [RED]
feat(auth): implement logout                              [GREEN]
refactor(auth): extract token generation to service       [REFACTOR]
test(auth): add password reset spec                       [RED]
feat(auth): implement password reset                      [GREEN]
```

---

## Testing Utilities

### Standard Setup (Include in Every Test)

```typescript
// tests/bootstrap.ts
import { configure, processCliArgs } from '@japa/runner'
import { apiClient } from '@japa/api-client'
import { expect } from '@japa/expect'
import { specReporter } from '@japa/spec-reporter'
import { Database } from '@adonisjs/lucid/database'

configure({
  ...processCliArgs(process.argv.slice(2)),
  files: ['tests/**/*.spec.ts'],
  plugins: [expect(), apiClient('http://localhost:3333')],
  reporters: [specReporter()],
  setup: [
    async () => {
      // Global setup: seed test database
    }
  ],
  teardown: [
    async () => {
      // Global cleanup
      await Database.truncate('users')
      await Database.truncate('organizations')
      await Database.truncate('assessments')
    }
  ]
})
```

### Test Helpers

```typescript
// tests/helpers.ts
import User from '#models/user'
import Organization from '#models/organization'

export async function createUser(overrides = {}) {
  return User.create({
    email: 'test@example.com',
    password: 'password123',
    firstName: 'Test',
    lastName: 'User',
    ...overrides
  })
}

export async function createOrganization(userId: string, overrides = {}) {
  return Organization.create({
    name: 'Test Org',
    ownerId: userId,
    ...overrides
  })
}

export async function login(client, email: string, password: string) {
  const response = await client
    .post('/api/v1/auth/login')
    .json({ email, password })
  return response.body().token
}
```

---

## Common Patterns

### Pattern 1: CRUD Resource

```typescript
// 1. Write all test cases first
test.group('Assessments', () => {
  test('GET /assessments - lists user assessments')
  test('GET /assessments/:id - returns single assessment')
  test('POST /assessments - creates new assessment')
  test('PUT /assessments/:id - updates assessment')
  test('DELETE /assessments/:id - deletes assessment')
})

// 2. Implement one by one
```

### Pattern 2: Service with External Call

```typescript
// Mock external services
test('uploadEvidence - uploads to R2', async ({ assert }) => {
  // Arrange
  const mockR2 = {
    upload: async () => ({ key: 'evidence/123.pdf' })
  }
  
  // Inject mock
  const service = new EvidenceService(mockR2)
  
  // Act
  const result = await service.uploadEvidence(file)
  
  // Assert
  assert.equal(result.url, 'https://r2.../evidence/123.pdf')
})
```

### Pattern 3: Database Transactions

```typescript
test('createAssessment - rolls back on error', async ({ assert }) => {
  await Database.transaction(async (trx) => {
    // Test code
    const assessment = await Assessment.create({ name: 'Test' }, { client: trx })
    
    // Force error
    throw new Error('Simulated error')
  })
  
  // Assert: no assessment in database
  const count = await Assessment.query().count('*')
  assert.equal(count[0].count, 0)
})
```

---

## Quality Gates (Enforced)

Before marking a task complete:

- [ ] All tests written FIRST (RED phase documented in commits)
- [ ] All tests passing (GREEN phase)
- [ ] Coverage meets minimum threshold
- [ ] No skipped tests (`.skip` or `.todo`)
- [ ] No console.log in tests
- [ ] Test names describe behavior, not implementation

### Bad Test Names
- ❌ `test('user test 1')`
- ❌ `test('createUser works')`
- ❌ `test('should return 200')`

### Good Test Names
- ✅ `test('createUser - hashes password before saving')`
- ✅ `test('createUser - throws ValidationError on invalid email')`
- ✅ `test('GET /users - returns paginated list ordered by created_at')`

---

## Running Tests

### Commands

```bash
# All tests
cd apps/api && npm test

# Single file
npm test -- tests/functional/auth.spec.ts

# With coverage
npm test -- --coverage

# Watch mode (development)
npm test -- --watch

# Fail fast (stop on first failure)
npm test -- --bail
```

### Pre-commit Hook

```bash
# .husky/pre-commit
npm test
npm run lint
```

---

## Anti-Patterns (STRICTLY FORBIDDEN)

🚫 **NEVER:**
- Write implementation before tests
- Skip tests because "it's simple"
- Test implementation details (test behavior)
- Use `console.log` to debug tests
- Share mutable state between tests
- Depend on test execution order
- Mock what you don't own (use real DB)

✅ **ALWAYS:**
- Watch test FAIL before implementation
- Test one concept per test
- Use descriptive test names
- Clean up in `teardown` or `afterEach`
- Test edge cases (null, empty, max length)
- Test error paths, not just happy path

---

## Task-Specific TDD Breakdown

### TEC-007: Backend Setup
- [ ] Configure Japa test runner
- [ ] Setup test database (SQLite or PostgreSQL)
- [ ] Create test utilities/helpers
- [ ] Add test script to package.json

### TEC-008: Migrations
- [ ] Test migrations run successfully
- [ ] Test rollback works
- [ ] Test seeders create valid data

### TEC-009: Auth System
- [ ] Test all 4 endpoints (register, login, logout, me)
- [ ] Test token generation
- [ ] Test token refresh
- [ ] Test unauthorized access (401)
- [ ] Test input validation (422)

### TEC-010 to TEC-012: CRUD APIs
- [ ] Test CREATE with valid data
- [ ] Test CREATE with invalid data
- [ ] Test READ (list + single)
- [ ] Test UPDATE
- [ ] Test DELETE
- [ ] Test 404 for missing resources
- [ ] Test authorization (can user X access Y?)

### TEC-013: ClickHouse
- [ ] Test event tracking
- [ ] Test aggregation queries

### TEC-014: API Testing Suite
- [ ] Collection of all previous tests
- [ ] Add CI/CD integration tests

---

## Summary for Agents

**Your workflow:**
1. Read TDD_STRATEGY.md (this file)
2. Create `.spec.ts` file FIRST
3. Write ONE failing test
4. Commit: `test(scope): description`
5. Implement to pass
6. Commit: `feat(scope): description`
7. Repeat for next test
8. Verify coverage threshold
9. Push

**Remember:**
- Red → Green → Refactor
- Tests FIRST, always
- Quality over speed
- If it's not tested, it doesn't exist

---

*Document enforced by: CertFast Quality Standards*  
*Last updated: 2026-03-15*
