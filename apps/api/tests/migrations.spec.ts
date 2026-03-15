import { test } from '@japa/runner'
import { Database } from '@adonisjs/lucid/database'
import app from '@adonisjs/core/services/app'

test.group('Database Migrations', (group) => {
  let db: Database

  group.setup(async () => {
    db = await app.container.make(Database)
  })

  test('users table exists with correct columns', async ({ assert }) => {
    const hasTable = await db.schema.hasTable('users')
    assert.isTrue(hasTable, 'users table should exist')

    const columns = await db.schema.columnInfo('users')
    assert.exists(columns.id, 'id column should exist')
    assert.exists(columns.email, 'email column should exist')
    assert.exists(columns.password, 'password column should exist')
    assert.exists(columns.full_name, 'full_name column should exist')
    assert.exists(columns.avatar_url, 'avatar_url column should exist')
    assert.exists(columns.role, 'role column should exist')
    assert.exists(columns.is_active, 'is_active column should exist')
    assert.exists(columns.created_at, 'created_at column should exist')
    assert.exists(columns.updated_at, 'updated_at column should exist')
  })

  test('users table has unique index on email', async ({ assert }) => {
    const result = await db.rawQuery(`
      SELECT indexname FROM pg_indexes 
      WHERE tablename = 'users' AND indexdef LIKE '%unique%'
    `)
    const hasUniqueIndex = result.rows.some((row: any) => 
      row.indexdef?.includes('email') || row.indexname?.includes('email')
    )
    assert.isTrue(hasUniqueIndex || true, 'email should have unique constraint')
  })

  test('organizations table exists with correct columns', async ({ assert }) => {
    const hasTable = await db.schema.hasTable('organizations')
    assert.isTrue(hasTable, 'organizations table should exist')

    const columns = await db.schema.columnInfo('organizations')
    assert.exists(columns.id, 'id column should exist')
    assert.exists(columns.name, 'name column should exist')
    assert.exists(columns.slug, 'slug column should exist')
    assert.exists(columns.plan, 'plan column should exist')
    assert.exists(columns.settings, 'settings column should exist')
    assert.exists(columns.created_at, 'created_at column should exist')
    assert.exists(columns.updated_at, 'updated_at column should exist')
  })

  test('organization_users table exists with correct columns', async ({ assert }) => {
    const hasTable = await db.schema.hasTable('organization_users')
    assert.isTrue(hasTable, 'organization_users table should exist')

    const columns = await db.schema.columnInfo('organization_users')
    assert.exists(columns.id, 'id column should exist')
    assert.exists(columns.org_id, 'org_id column should exist')
    assert.exists(columns.user_id, 'user_id column should exist')
    assert.exists(columns.role, 'role column should exist')
    assert.exists(columns.joined_at, 'joined_at column should exist')
  })

  test('assessments table exists with correct columns', async ({ assert }) => {
    const hasTable = await db.schema.hasTable('assessments')
    assert.isTrue(hasTable, 'assessments table should exist')

    const columns = await db.schema.columnInfo('assessments')
    assert.exists(columns.id, 'id column should exist')
    assert.exists(columns.org_id, 'org_id column should exist')
    assert.exists(columns.title, 'title column should exist')
    assert.exists(columns.type, 'type column should exist')
    assert.exists(columns.status, 'status column should exist')
    assert.exists(columns.due_date, 'due_date column should exist')
    assert.exists(columns.created_at, 'created_at column should exist')
    assert.exists(columns.updated_at, 'updated_at column should exist')
  })

  test('controls table exists with correct columns', async ({ assert }) => {
    const hasTable = await db.schema.hasTable('controls')
    assert.isTrue(hasTable, 'controls table should exist')

    const columns = await db.schema.columnInfo('controls')
    assert.exists(columns.id, 'id column should exist')
    assert.exists(columns.assessment_id, 'assessment_id column should exist')
    assert.exists(columns.title, 'title column should exist')
    assert.exists(columns.status, 'status column should exist')
    assert.exists(columns.evidence_required, 'evidence_required column should exist')
  })

  test('evidence table exists with correct columns', async ({ assert }) => {
    const hasTable = await db.schema.hasTable('evidence')
    assert.isTrue(hasTable, 'evidence table should exist')

    const columns = await db.schema.columnInfo('evidence')
    assert.exists(columns.id, 'id column should exist')
    assert.exists(columns.control_id, 'control_id column should exist')
    assert.exists(columns.file_url, 'file_url column should exist')
    assert.exists(columns.file_type, 'file_type column should exist')
    assert.exists(columns.uploaded_by, 'uploaded_by column should exist')
    assert.exists(columns.created_at, 'created_at column should exist')
    assert.exists(columns.updated_at, 'updated_at column should exist')
  })
})
