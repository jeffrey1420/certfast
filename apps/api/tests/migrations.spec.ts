import { test } from '@japa/runner'
import type { Database } from '@adonisjs/lucid/database'

function schema() {
  const db = globalThis.$db as Database
  return db.connection().schema
}

test.group('Database Migrations', () => {
  test('users table exists with expected columns', async ({ assert }) => {
    const hasTable = await schema().hasTable('users')
    assert.isTrue(hasTable)

    const hasEmailColumn = await schema().hasColumn('users', 'email')
    const hasPasswordColumn = await schema().hasColumn('users', 'password')
    const hasRoleColumn = await schema().hasColumn('users', 'role')

    assert.isTrue(hasEmailColumn)
    assert.isTrue(hasPasswordColumn)
    assert.isTrue(hasRoleColumn)
  })

  test('organizations table exists with expected columns', async ({ assert }) => {
    const hasTable = await schema().hasTable('organizations')
    assert.isTrue(hasTable)

    const hasNameColumn = await schema().hasColumn('organizations', 'name')
    const hasSlugColumn = await schema().hasColumn('organizations', 'slug')
    const hasOwnerColumn = await schema().hasColumn('organizations', 'owner_id')

    assert.isTrue(hasNameColumn)
    assert.isTrue(hasSlugColumn)
    assert.isTrue(hasOwnerColumn)
  })

  test('assessments table exists with expected columns', async ({ assert }) => {
    const hasTable = await schema().hasTable('assessments')
    assert.isTrue(hasTable)

    const hasOrgIdColumn = await schema().hasColumn('assessments', 'organization_id')
    const hasTitleColumn = await schema().hasColumn('assessments', 'title')
    const hasTypeColumn = await schema().hasColumn('assessments', 'type')
    const hasStatusColumn = await schema().hasColumn('assessments', 'status')

    assert.isTrue(hasOrgIdColumn)
    assert.isTrue(hasTitleColumn)
    assert.isTrue(hasTypeColumn)
    assert.isTrue(hasStatusColumn)
  })

  test('controls table exists with expected columns', async ({ assert }) => {
    const hasTable = await schema().hasTable('controls')
    assert.isTrue(hasTable)

    const hasAssessmentIdColumn = await schema().hasColumn('controls', 'assessment_id')
    const hasNameColumn = await schema().hasColumn('controls', 'name')
    const hasStatusColumn = await schema().hasColumn('controls', 'status')

    assert.isTrue(hasAssessmentIdColumn)
    assert.isTrue(hasNameColumn)
    assert.isTrue(hasStatusColumn)
  })

  test('evidence table exists with expected columns', async ({ assert }) => {
    const hasTable = await schema().hasTable('evidence')
    assert.isTrue(hasTable)

    const hasControlIdColumn = await schema().hasColumn('evidence', 'control_id')
    const hasTypeColumn = await schema().hasColumn('evidence', 'type')
    const hasStatusColumn = await schema().hasColumn('evidence', 'status')

    assert.isTrue(hasControlIdColumn)
    assert.isTrue(hasTypeColumn)
    assert.isTrue(hasStatusColumn)
  })

  test('user_tokens table exists with expected columns', async ({ assert }) => {
    const hasTable = await schema().hasTable('user_tokens')
    assert.isTrue(hasTable)

    const hasUserIdColumn = await schema().hasColumn('user_tokens', 'user_id')
    const hasTokenColumn = await schema().hasColumn('user_tokens', 'token')
    const hasExpiresAtColumn = await schema().hasColumn('user_tokens', 'expires_at')

    assert.isTrue(hasUserIdColumn)
    assert.isTrue(hasTokenColumn)
    assert.isTrue(hasExpiresAtColumn)
  })

  test('policies table exists with expected columns', async ({ assert }) => {
    const hasTable = await schema().hasTable('policies')
    assert.isTrue(hasTable)

    const hasOrgIdColumn = await schema().hasColumn('policies', 'organization_id')
    const hasTitleColumn = await schema().hasColumn('policies', 'title')
    const hasContentColumn = await schema().hasColumn('policies', 'content')
    const hasStatusColumn = await schema().hasColumn('policies', 'status')
    const hasVersionColumn = await schema().hasColumn('policies', 'version')

    assert.isTrue(hasOrgIdColumn)
    assert.isTrue(hasTitleColumn)
    assert.isTrue(hasContentColumn)
    assert.isTrue(hasStatusColumn)
    assert.isTrue(hasVersionColumn)
  })

  test('migration files can be imported successfully', async ({ assert }) => {
    const migrationFiles = [
      '../database/migrations/001_create_users_table.ts',
      '../database/migrations/002_create_organizations_table.ts',
      '../database/migrations/003_create_organization_members_table.ts',
      '../database/migrations/004_create_assessments.ts',
      '../database/migrations/006_create_evidence.ts',
      '../database/migrations/007_create_user_tokens_table.ts',
      '../database/migrations/008_create_controls_table.ts',
      '../database/migrations/009_create_policies_table.ts',
      '../database/migrations/010_fix_control_code_uniqueness.ts',
      '../database/migrations/011_create_assessment_controls_table.ts',
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
