import { test } from '@japa/runner'

test.group('Database Migrations', () => {
  test('users table has required columns', async ({ assert }) => {
    // Test that users table migration exists and has correct structure
    const migration = await import('../../database/migrations/001_create_users.js')
    assert.isDefined(migration.default)
    assert.isFunction(migration.default.prototype.up)
    assert.isFunction(migration.default.prototype.down)
  })

  test('organizations table has required columns', async ({ assert }) => {
    const migration = await import('../../database/migrations/002_create_organizations.js')
    assert.isDefined(migration.default)
    assert.isFunction(migration.default.prototype.up)
    assert.isFunction(migration.default.prototype.down)
  })

  test('organization_users table has required columns', async ({ assert }) => {
    const migration = await import('../../database/migrations/003_create_organization_users.js')
    assert.isDefined(migration.default)
    assert.isFunction(migration.default.prototype.up)
    assert.isFunction(migration.default.prototype.down)
  })

  test('assessments table has required columns', async ({ assert }) => {
    const migration = await import('../../database/migrations/004_create_assessments.js')
    assert.isDefined(migration.default)
    assert.isFunction(migration.default.prototype.up)
    assert.isFunction(migration.default.prototype.down)
  })

  test('controls table has required columns', async ({ assert }) => {
    const migration = await import('../../database/migrations/005_create_controls.js')
    assert.isDefined(migration.default)
    assert.isFunction(migration.default.prototype.up)
    assert.isFunction(migration.default.prototype.down)
  })

  test('evidence table has required columns', async ({ assert }) => {
    const migration = await import('../../database/migrations/006_create_evidence.js')
    assert.isDefined(migration.default)
    assert.isFunction(migration.default.prototype.up)
    assert.isFunction(migration.default.prototype.down)
  })
})
