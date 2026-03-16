import { test as japaTest } from '@japa/runner'
import { Database } from '@adonisjs/lucid/database'

// Extended test helper with transaction support
export function test(name: string, callback: (context: any) => Promise<void> | void) {
  return japaTest(name, async (context) => {
    const db = globalThis.$db as Database
    
    // Start transaction
    const trx = await db.connection().transaction()
    
    // Replace default connection with transaction for this test
    const originalConnection = db.connection()
    const connectionProxy = new Proxy(originalConnection, {
      get(target, prop) {
        if (prop === 'query' || prop === 'insertQuery' || prop === 'modelQuery') {
          return (...args: any[]) => (trx as any)[prop](...args)
        }
        return (trx as any)[prop]
      },
    })
    
    // Monkey-patch connection for the duration of the test
    const manager = db.manager as any
    const originalGet = manager.get
    manager.get = () => connectionProxy
    
    try {
      // Run the actual test
      await callback(context)
    } finally {
      // Always rollback, even if test fails
      await trx.rollback()
      // Restore original connection
      manager.get = originalGet
    }
  })
}

// Transaction wrapper for test groups
export function testGroup(name: string, callback: (group: any) => void) {
  return japaTest.group(name, (group) => {
    let trx: any = null
    const db = () => globalThis.$db as Database
    
    group.each.setup(async () => {
      trx = await db().connection().transaction()
    })
    
    group.each.teardown(async () => {
      if (trx) {
        await trx.rollback()
        trx = null
      }
    })
    
    callback(group)
  })
}

// Factory helpers for tests
export async function createUser(overrides: any = {}) {
  const User = (await import('#models/user')).default
  return User.create({
    email: `test_${Date.now()}@example.com`,
    password: 'password123',
    fullName: 'Test User',
    ...overrides,
  })
}

export async function createOrganization(userId: number, overrides: any = {}) {
  const Organization = (await import('#models/organization')).default
  return Organization.create({
    name: 'Test Organization',
    slug: `test-org-${Date.now()}`,
    ownerId: userId,
    ...overrides,
  })
}