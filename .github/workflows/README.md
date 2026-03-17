# GitHub Actions Workflows

This directory contains automated CI/CD workflows for the CertFast project.

## Available Workflows

### 🔄 CI Pipeline (`ci.yml`)

**Triggers**: Push and Pull Requests to `main` and `develop` branches

**Jobs**:

1. **API Tests** (`api-tests`)
   - Runs all 73 integration tests against a PostgreSQL test database
   - PostgreSQL 16 Alpine container on port 5433
   - Validates auth, assessments, controls, evidence, policies, and dashboard endpoints
   - Optional: Runs API linting if `lint` script exists

2. **Web Build & Lint** (`web-build`)
   - Lints frontend code with ESLint
   - Builds production bundle with Vite
   - Validates TypeScript compilation

3. **CI Status** (`ci-status`)
   - Combined status check for all jobs
   - Fails if any job fails
   - Provides clear CI status for branch protection rules

**Environment Variables (API Tests)**:
- `DB_HOST_TEST=localhost`
- `DB_PORT_TEST=5433`
- `DB_USER_TEST=certfast`
- `DB_PASSWORD_TEST=certfast_test_password`
- `DB_DATABASE_TEST=certfast_test`
- `NODE_ENV=test`

## Setup Requirements

- Node.js 18+
- PostgreSQL 16 (provided by GitHub Actions service container)
- npm dependencies defined in `apps/api/package.json` and `apps/web/package.json`

## Viewing Workflow Results

1. Navigate to the **Actions** tab on GitHub
2. Select the workflow run you want to inspect
3. View logs for each job step
4. Check test results and error messages

## Branch Protection

To require CI checks before merging:

1. Go to **Settings → Branches** on GitHub
2. Add a branch protection rule for `main`
3. Enable "Require status checks to pass before merging"
4. Select:
   - `API Tests`
   - `Web Build & Lint`
   - `CI Status`

## Local Testing

To replicate CI environment locally:

```bash
# Start test database
docker compose up -d postgres-test

# Run API tests
cd apps/api
npm test

# Run Web checks
cd apps/web
npm run lint
npm run build
```

See [TESTING_SETUP.md](../TESTING_SETUP.md) for detailed local testing instructions.

## Troubleshooting

### Tests Fail in CI But Pass Locally

- **Check environment variables**: CI uses specific test DB credentials
- **Verify Node.js version**: CI uses Node 18, ensure compatibility
- **Review service container logs**: PostgreSQL startup issues

### Workflow Doesn't Trigger

- **Verify trigger branches**: Only `main` and `develop` by default
- **Check workflow syntax**: Use `yamllint` or GitHub's workflow validator
- **Review repository settings**: Ensure Actions are enabled

### Build Timeouts

- **Optimize dependencies**: Use `npm ci` instead of `npm install`
- **Cache node_modules**: Already configured via `cache: 'npm'`
- **Check package-lock.json**: Ensure it's committed and up-to-date

## Future Enhancements

- [ ] Add test coverage reporting
- [ ] Implement deployment workflows (staging/production)
- [ ] Add security scanning (Dependabot, CodeQL)
- [ ] Create release automation workflows
- [ ] Add performance benchmarking
