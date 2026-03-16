import { test } from '@japa/runner'
import User from '#models/user'
import Organization from '#models/organization'
import { resetDatabase } from './helpers.js'

test.group('Users & Organizations', (group) => {
  group.each.setup(async () => {
    await resetDatabase()
  })

  async function getAuthToken(client: any, user?: User) {
    const email = user?.email || `test_${Date.now()}@example.com`

    if (!user) {
      await User.create({
        email,
        password: 'password123',
        fullName: 'Test User',
      })
    }

    const loginRes = await client.post('/api/v1/auth/login').json({
      email,
      password: 'password123',
    })

    return loginRes.body().token
  }

  test('GET /users/me - returns authenticated user profile', async ({ client }) => {
    const user = await User.create({
      email: 'profile@test.com',
      password: 'password123',
      fullName: 'Profile User',
      role: 'user',
    })

    const token = await getAuthToken(client, user)

    const response = await client
      .get('/api/v1/users/me')
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)
    response.assertBodyContains({
      id: user.id,
      email: 'profile@test.com',
      fullName: 'Profile User',
      role: 'user',
    })
  })

  test('PUT /users/me - updates user profile', async ({ client }) => {
    const user = await User.create({
      email: 'update@test.com',
      password: 'password123',
      fullName: 'Old Name',
    })

    const token = await getAuthToken(client, user)

    const response = await client
      .put('/api/v1/users/me')
      .header('Authorization', `Bearer ${token}`)
      .json({
        fullName: 'New Name',
        avatarUrl: 'https://example.com/avatar.jpg',
      })

    response.assertStatus(200)
    response.assertBodyContains({
      fullName: 'New Name',
      avatarUrl: 'https://example.com/avatar.jpg',
    })

    await user.refresh()
    response.assertBodyContains({ id: user.id })
  })

  test('POST /organizations - creates organization', async ({ client }) => {
    const token = await getAuthToken(client)

    const response = await client
      .post('/api/v1/organizations')
      .header('Authorization', `Bearer ${token}`)
      .json({
        name: 'Test Company',
        slug: 'test-company',
      })

    response.assertStatus(201)
    response.assertBodyContains({
      name: 'Test Company',
      slug: 'test-company',
      plan: 'free',
      status: 'active',
    })
  })

  test('GET /organizations - lists user organizations', async ({ client, assert }) => {
    const user = await User.create({
      email: 'orgs@test.com',
      password: 'password123',
      fullName: 'Org User',
    })

    await Organization.create({
      name: 'Org One',
      slug: `org-one-${Date.now()}`,
      ownerId: user.id,
    })

    await Organization.create({
      name: 'Org Two',
      slug: `org-two-${Date.now()}`,
      ownerId: user.id,
    })

    const token = await getAuthToken(client, user)

    const response = await client
      .get('/api/v1/organizations')
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)
    assert.lengthOf(response.body(), 2)
  })

  test('GET /organizations/:id - returns organization details', async ({ client }) => {
    const user = await User.create({
      email: 'org-detail@test.com',
      password: 'password123',
      fullName: 'Org Detail User',
    })

    const org = await Organization.create({
      name: 'Detail Org',
      slug: `detail-org-${Date.now()}`,
      ownerId: user.id,
      plan: 'pro',
    })

    const token = await getAuthToken(client, user)

    const response = await client
      .get(`/api/v1/organizations/${org.id}`)
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)
    response.assertBodyContains({
      id: org.id,
      name: 'Detail Org',
      plan: 'pro',
    })
  })
})
