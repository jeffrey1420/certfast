import { Database } from '@adonisjs/lucid/database'
import User from '#models/user'
import Organization from '#models/organization'

const TABLES_IN_RESET_ORDER = [
  'user_tokens',
  'organization_members',
  'evidence',
  'controls',
  'assessments',
  'organizations',
  'users',
]

export async function resetDatabase() {
  const db = globalThis.$db as Database
  const tableList = TABLES_IN_RESET_ORDER.join(', ')
  await db.rawQuery(`TRUNCATE TABLE ${tableList} RESTART IDENTITY CASCADE`)
}

export async function createUser(overrides: Partial<User> = {}) {
  return User.create({
    email: `test_${Date.now()}_${Math.random().toString(36).slice(2)}@example.com`,
    password: 'password123',
    fullName: 'Test User',
    role: 'user',
    isActive: true,
    ...overrides,
  })
}

export async function createOrganization(userId: number, overrides: Partial<Organization> = {}) {
  return Organization.create({
    name: 'Test Organization',
    slug: `test-org-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    ownerId: userId,
    plan: 'free',
    status: 'active',
    ...overrides,
  })
}
