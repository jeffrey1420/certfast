import { test } from '@japa/runner'
import User from '#models/user'
import Organization from '#models/organization'

test.group('Users & Organizations', () => {
  // Helper to get auth token
  async function getAuthToken(client: any, user?: User) {
    const timestamp = Date.now()
    const email = user?.email || `test_${timestamp}@example.com`

    if (!user) {
      await User.create({
        email: email,
        password: 'password123',
        fullName: 'Test User',
      })
    }

    const loginRes = await client.post('/api/v1/auth/login').json({
      email: email,
      password: 'password123',
    })
    return loginRes.body().token
  }

  test('GET /users - lists all users', async ({ client, assert }) => {
    const token = await getAuthToken(client)

    const response = await client
      .get('/api/v1/users')
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)
    assert.exists(response.body().data)
    assert.isArray(response.body().data)
  })

  test('GET /users/:id - returns user by ID', async ({ client, assert }) => {
    const user = await User.create({
      email: 'getbyid@test.com',
      password: 'password123',
      fullName: 'Get By ID Test',
    })
    const token = await getAuthToken(client, user)

    const response = await client
      .get(`/api/v1/users/${user.id}`)
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)
    assert.equal(response.body().id, user.id)
    assert.equal(response.body().email, user.email)
  })

  test('GET /users/:id - returns 404 for non-existent user', async ({ client }) => {
    const token = await getAuthToken(client)

    const response = await client
      .get('/api/v1/users/99999')
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(404)
    response.assertBodyContains({ error: 'User not found' })
  })

  test('PUT /users/:id - updates user', async ({ client, assert }) => {
    const user = await User.create({
      email: 'update@test.com',
      password: 'password123',
      fullName: 'Update Test',
    })
    const token = await getAuthToken(client, user)

    const response = await client
      .put(`/api/v1/users/${user.id}`)
      .header('Authorization', `Bearer ${token}`)
      .json({ fullName: 'Updated Name' })

    response.assertStatus(200)
    assert.equal(response.body().fullName, 'Updated Name')

    // Verify in database
    await user.refresh()
    assert.equal(user.fullName, 'Updated Name')
  })

  test('GET /organizations - lists user organizations', async ({ client, assert }) => {
    const token = await getAuthToken(client)

    const response = await client
      .get('/api/v1/organizations')
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)
    assert.isArray(response.body())
  })

  test('POST /organizations - creates new organization', async ({ client, assert }) => {
    const user = await User.create({
      email: 'orgcreate@test.com',
      password: 'password123',
      fullName: 'Org Create Test',
    })
    const token = await getAuthToken(client, user)
    const uniqueSlug = `test-org-${Date.now()}`

    const response = await client
      .post('/api/v1/organizations')
      .header('Authorization', `Bearer ${token}`)
      .json({
        name: 'Test Organization',
        slug: uniqueSlug,
      })

    response.assertStatus(201)
    assert.exists(response.body().id)
    assert.equal(response.body().name, 'Test Organization')
    assert.equal(response.body().slug, uniqueSlug)

    // Verify in database
    const org = await Organization.findBy('slug', uniqueSlug)
    assert.isNotNull(org)
    assert.equal(org!.ownerId, user.id)
  })

  test('POST /organizations - validates required fields', async ({ client }) => {
    const token = await getAuthToken(client)

    const response = await client
      .post('/api/v1/organizations')
      .header('Authorization', `Bearer ${token}`)
      .json({ name: 'Missing slug' })

    response.assertStatus(422)
    response.assertBodyContains({ error: 'Validation failed' })
  })

  test('POST /organizations - rejects duplicate slug', async ({ client }) => {
    const user = await User.create({
      email: 'dupslug@test.com',
      password: 'password123',
      fullName: 'Dup Slug Test',
    })
    const token = await getAuthToken(client, user)
    const slug = `dup-slug-${Date.now()}`

    // Create first org
    await Organization.create({
      name: 'First Org',
      slug: slug,
      ownerId: user.id,
    })

    // Try to create second with same slug
    const response = await client
      .post('/api/v1/organizations')
      .header('Authorization', `Bearer ${token}`)
      .json({ name: 'Second Org', slug: slug })

    response.assertStatus(422)
    response.assertBodyContains({ error: 'Slug already taken' })
  })

  test('GET /organizations/:id - returns organization by ID', async ({ client, assert }) => {
    const user = await User.create({
      email: 'getorg@test.com',
      password: 'password123',
      fullName: 'Get Org Test',
    })
    const token = await getAuthToken(client, user)
    const slug = `get-org-${Date.now()}`

    const createRes = await client
      .post('/api/v1/organizations')
      .header('Authorization', `Bearer ${token}`)
      .json({ name: 'Get Test Org', slug: slug })
    const orgId = createRes.body().id

    const response = await client
      .get(`/api/v1/organizations/${orgId}`)
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)
    assert.equal(response.body().id, orgId)
    assert.equal(response.body().name, 'Get Test Org')
  })

  test('PUT /organizations/:id - updates organization', async ({ client, assert }) => {
    const user = await User.create({
      email: 'updateorg@test.com',
      password: 'password123',
      fullName: 'Update Org Test',
    })
    const token = await getAuthToken(client, user)
    const slug = `update-org-${Date.now()}`

    const createRes = await client
      .post('/api/v1/organizations')
      .header('Authorization', `Bearer ${token}`)
      .json({ name: 'Update Test Org', slug: slug })
    const orgId = createRes.body().id

    const response = await client
      .put(`/api/v1/organizations/${orgId}`)
      .header('Authorization', `Bearer ${token}`)
      .json({ name: 'Updated Org Name' })

    response.assertStatus(200)
    assert.equal(response.body().name, 'Updated Org Name')
  })
})