import { test } from '@japa/runner'

test.group('Users & Organizations', () => {
  // Helper to get auth token
  async function getAuthToken(client: any) {
    const timestamp = Date.now()
    const email = `test_${timestamp}@example.com`
    
    // Register a test user first
    await client.post('/auth/register').json({
      email: email,
      password: 'password123',
      fullName: 'Test User'
    })
    
    const loginRes = await client.post('/auth/login').json({
      email: email,
      password: 'password123'
    })
    return loginRes.body().token
  }

  test('GET /users - lists all users', async ({ client, assert }) => {
    const token = await getAuthToken(client)
    
    const response = await client.get('/users').header('Authorization', `Bearer ${token}`)
    
    response.assertStatus(200)
    assert.isArray(response.body())
    assert.isAtLeast(response.body().length, 1)
  })

  test('GET /users/:id - returns user by ID', async ({ client, assert }) => {
    const token = await getAuthToken(client)
    
    // Get users list first
    const listRes = await client.get('/users').header('Authorization', `Bearer ${token}`)
    const userId = listRes.body()[0].id
    
    const response = await client.get(`/users/${userId}`).header('Authorization', `Bearer ${token}`)
    
    response.assertStatus(200)
    assert.exists(response.body().id)
    assert.exists(response.body().email)
  })

  test('GET /users/:id - returns 404 for non-existent user', async ({ client }) => {
    const token = await getAuthToken(client)
    
    const response = await client.get('/users/99999').header('Authorization', `Bearer ${token}`)
    
    response.assertStatus(404)
    response.assertBodyContains({ error: 'User not found' })
  })

  test('PUT /users/:id - updates user', async ({ client, assert }) => {
    const token = await getAuthToken(client)
    
    // Get users list first
    const listRes = await client.get('/users').header('Authorization', `Bearer ${token}`)
    const userId = listRes.body()[0].id
    
    const response = await client.put(`/users/${userId}`)
      .header('Authorization', `Bearer ${token}`)
      .json({ fullName: 'Updated Name' })
    
    response.assertStatus(200)
    assert.equal(response.body().fullName, 'Updated Name')
  })

  test('GET /organizations - lists all organizations', async ({ client, assert }) => {
    const token = await getAuthToken(client)
    
    const response = await client.get('/organizations').header('Authorization', `Bearer ${token}`)
    
    response.assertStatus(200)
    assert.isArray(response.body())
  })

  test('POST /organizations - creates new organization', async ({ client, assert }) => {
    const token = await getAuthToken(client)
    const uniqueSlug = `test-org-${Date.now()}`
    
    const response = await client.post('/organizations')
      .header('Authorization', `Bearer ${token}`)
      .json({
        name: 'Test Organization',
        slug: uniqueSlug
      })
    
    response.assertStatus(201)
    assert.exists(response.body().id)
    assert.equal(response.body().name, 'Test Organization')
    assert.equal(response.body().slug, uniqueSlug)
  })

  test('POST /organizations - validates required fields', async ({ client }) => {
    const token = await getAuthToken(client)
    
    const response = await client.post('/organizations')
      .header('Authorization', `Bearer ${token}`)
      .json({ name: 'Missing slug' })
    
    response.assertStatus(422)
    response.assertBodyContains({ error: 'Validation failed' })
  })

  test('GET /organizations/:id - returns organization by ID', async ({ client, assert }) => {
    const token = await getAuthToken(client)
    const uniqueSlug = `get-org-${Date.now()}`
    
    // Create an org first
    const createRes = await client.post('/organizations')
      .header('Authorization', `Bearer ${token}`)
      .json({ name: 'Get Test Org', slug: uniqueSlug })
    const orgId = createRes.body().id
    
    const response = await client.get(`/organizations/${orgId}`).header('Authorization', `Bearer ${token}`)
    
    response.assertStatus(200)
    assert.equal(response.body().id, orgId)
    assert.equal(response.body().name, 'Get Test Org')
  })

  test('GET /organizations/:id - returns 404 for non-existent org', async ({ client }) => {
    const token = await getAuthToken(client)
    
    const response = await client.get('/organizations/99999').header('Authorization', `Bearer ${token}`)
    
    response.assertStatus(404)
    response.assertBodyContains({ error: 'Organization not found' })
  })

  test('PUT /organizations/:id - updates organization', async ({ client, assert }) => {
    const token = await getAuthToken(client)
    const uniqueSlug = `update-org-${Date.now()}`
    
    // Create an org first
    const createRes = await client.post('/organizations')
      .header('Authorization', `Bearer ${token}`)
      .json({ name: 'Update Test Org', slug: uniqueSlug })
    const orgId = createRes.body().id
    
    const response = await client.put(`/organizations/${orgId}`)
      .header('Authorization', `Bearer ${token}`)
      .json({ name: 'Updated Org Name' })
    
    response.assertStatus(200)
    assert.equal(response.body().name, 'Updated Org Name')
  })
})
