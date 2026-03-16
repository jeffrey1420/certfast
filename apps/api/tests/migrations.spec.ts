import { test } from '@japa/runner'

test.group('Database Migrations', () => {
  test('users table migration loads', async ({ assert }) => {
    const migration = await import('../../database/migrations/001_create_users_table.js')
    assert.isDefined(migration.default)
    assert.isFunction(migration.default.prototype.up)
    assert.isFunction(migration.default.prototype.down)
  })

  test('organizations table migration loads', async ({ assert }) => {
    const migration = await import('../../database/migrations/002_create_organizations_table.js')
    assert.isDefined(migration.default)
    assert.isFunction(migration.default.prototype.up)
    assert.isFunction(migration.default.prototype.down)
  })

  test('organization_members table migration loads', async ({ assert }) => {
    const migration = await import('../../database/migrations/003_create_organization_members_table.js')
    assert.isDefined(migration.default)
    assert.isFunction(migration.default.prototype.up)
    assert.isFunction(migration.default.prototype.down)
  })

  test('assessments table migration loads', async ({ assert }) => {
    const migration = await import('../../database/migrations/004_create_assessments.js')
    assert.isDefined(migration.default)
    assert.isFunction(migration.default.prototype.up)
    assert.isFunction(migration.default.prototype.down)
  })

  test('controls table migration loads', async ({ assert }) => {
    const migration = await import('../../database/migrations/005_create_controls.js')
    assert.isDefined(migration.default)
    assert.isFunction(migration.default.prototype.up)
    assert.isFunction(migration.default.prototype.down)
  })

  test('evidence table migration loads', async ({ assert }) => {
    const migration = await import('../../database/migrations/006_create_evidence.js')
    assert.isDefined(migration.default)
    assert.isFunction(migration.default.prototype.up)
    assert.isFunction(migration.default.prototype.down)
  })
})
