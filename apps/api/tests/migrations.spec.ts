import { test } from '@japa/runner'
import Database from '@adonisjs/lucid/services/db'

test.group('Database Migrations', () => {
  test('users table exists with expected columns', async ({ assert }) => {
    const hasTable = await Database.schema.hasTable('users')
    assert.isTrue(hasTable)

    const hasEmailColumn = await Database.schema.hasColumn('users', 'email')
    const hasPasswordColumn = await Database.schema.hasColumn('users', 'password')
    const hasRoleColumn = await Database.schema.hasColumn('users', 'role')

    assert.isTrue(hasEmailColumn)
    assert.isTrue(hasPasswordColumn)
    assert.isTrue(hasRoleColumn)
  })

  test('organizations table exists with expected columns', async ({ assert }) => {
    const hasTable = await Database.schema.hasTable('organizations')
    assert.isTrue(hasTable)

    const hasNameColumn = await Database.schema.hasColumn('organizations', 'name')
    const hasSlugColumn = await Database.schema.hasColumn('organizations', 'slug')
    const hasOwnerColumn = await Database.schema.hasColumn('organizations', 'owner_id')

    assert.isTrue(hasNameColumn)
    assert.isTrue(hasSlugColumn)
    assert.isTrue(hasOwnerColumn)
  })

  test('assessments table exists with expected columns', async ({ assert }) => {
    const hasTable = await Database.schema.hasTable('assessments')
    assert.isTrue(hasTable)

    const hasOrgIdColumn = await Database.schema.hasColumn('assessments', 'organization_id')
    const hasTitleColumn = await Database.schema.hasColumn('assessments', 'title')
    const hasTypeColumn = await Database.schema.hasColumn('assessments', 'type')
    const hasStatusColumn = await Database.schema.hasColumn('assessments', 'status')

    assert.isTrue(hasOrgIdColumn)
    assert.isTrue(hasTitleColumn)
    assert.isTrue(hasTypeColumn)
    assert.isTrue(hasStatusColumn)
  })

  test('controls table exists with expected columns', async ({ assert }) => {
    const hasTable = await Database.schema.hasTable('controls')
    assert.isTrue(hasTable)

    const hasAssessmentIdColumn = await Database.schema.hasColumn('controls', 'assessment_id')
    const hasNameColumn = await Database.schema.hasColumn('controls', 'name')
    const hasStatusColumn = await Database.schema.hasColumn('controls', 'status')

    assert.isTrue(hasAssessmentIdColumn)
    assert.isTrue(hasNameColumn)
    assert.isTrue(hasStatusColumn)
  })

  test('evidence table exists with expected columns', async ({ assert }) => {
    const hasTable = await Database.schema.hasTable('evidence')
    assert.isTrue(hasTable)

    const hasControlIdColumn = await Database.schema.hasColumn('evidence', 'control_id')
    const hasTypeColumn = await Database.schema.hasColumn('evidence', 'type')
    const hasStatusColumn = await Database.schema.hasColumn('evidence', 'status')

    assert.isTrue(hasControlIdColumn)
    assert.isTrue(hasTypeColumn)
    assert.isTrue(hasStatusColumn)
  })

  test('user_tokens table exists with expected columns', async ({ assert }) => {
    const hasTable = await Database.schema.hasTable('user_tokens')
    assert.isTrue(hasTable)

    const hasUserIdColumn = await Database.schema.hasColumn('user_tokens', 'user_id')
    const hasTokenColumn = await Database.schema.hasColumn('user_tokens', 'token')
    const hasExpiresAtColumn = await Database.schema.hasColumn('user_tokens', 'expires_at')

    assert.isTrue(hasUserIdColumn)
    assert.isTrue(hasTokenColumn)
    assert.isTrue(hasExpiresAtColumn)
  })

  test('migration files can be imported successfully', async ({ assert }) => {
    const migrationFiles = [
      '../database/migrations/001_create_users_table.ts',
      '../database/migrations/002_create_organizations_table.ts',
      '../database/migrations/003_create_organization_members_table.ts',
      '../database/migrations/004_create_assessments_table.ts',
      '../database/migrations/005_create_controls_table.ts',
      '../database/migrations/006_create_evidence_table.ts',
      '../database/migrations/007_create_user_tokens_table.ts',
    ]

    for (const file of migrationFiles) {
      try {
        const migration = await import(file)
        assert.exists(migration.default)
      } catch (error) {
        assert.fail(`Failed to import migration file ${file}: ${error}`)
      }
    }
  })
})
