import { test } from '@japa/runner'

test.group('Users & Organizations API', () => {
  // Helper to register and get auth token
  async function registerAndGetToken(client: any) {
    const timestamp = Date.now()
    const email = `test${timestamp}@example.com`
    
    // Register a user first
    await client.post('/auth/register').json({
      email,
      password: 'password123',
      fullName: 'Test User'
    })
    
    // Login to get token
    const loginRes = await client.post('/auth/login').json({
      email,
      password: 'password123'
    })
    
    return { token: loginRes.body().token, email }
  }

  test('GET /users - lists all users', async ({ client, assert }) => {
    const { token } = await registerAndGetToken(client)
    
    const response = await client
      .get('/users')
      .header('Authorization', `Bearer ${token}`)
    
    response.assertStatus(200)
    assert.isArray(response.body())
  })

  test('GET /users/:id - returns single user', async ({ client, assert }) => {
    const { token } = await registerAndGetToken(client)
    
    // First get list to find a user ID
    const listRes = await client
      .get('/users')
      .header('Authorization', `Bearer ${token}`)
    const userId = listRes.body()[0].id
    
    const response = await client
      .get(`/users/${userId}`)
      .header('Authorization', `Bearer ${token}`)
    
    response.assertStatus(200)
    assert.equal(response.body().id, userId)
    assert.exists(response.body().email)
  })

  test('GET /users/:id - returns 404 for non-existent user', async ({ client }) => {
    const { token } = await registerAndGetToken(client)
    
    const response = await client
      .get('/users/99999')
      .header('Authorization', `Bearer ${token}`)
    
    response.assertStatus(404)
  })

  test('PUT /users/:id - updates user', async ({ client, assert }) => {
    const { token } = await registerAndGetToken(client)
    
    // First get list to find a user ID
    const listRes = await client
      .get('/users')
      .header('Authorization', `Bearer ${token}`)
    const userId = listRes.body()[0].id
    
    const response = await client
      .put(`/users/${userId}`)
      .header('Authorization', `Bearer ${token}`)
      .json({
        fullName: 'Updated Name'
      })
    
    response.assertStatus(200)
    assert.equal(response.body().fullName, 'Updated Name')
  })

  test('GET /organizations - lists all organizations', async ({ client, assert }) => {
    const { token } = await registerAndGetToken(client)
    
    const response = await client
      .get('/organizations')
      .header('Authorization', `Bearer ${token}`)
    
    response.assertStatus(200)
    assert.isArray(response.body())
  })

  test('POST /organizations - creates new organization', async ({ client, assert }) => {
    const { token } = await registerAndGetToken(client)
    const timestamp = Date.now()
    
    const response = await client
      .post('/organizations')
      .header('Authorization', `Bearer ${token}`)
      .json({
        name: 'New Test Org',
        slug: `new-test-org-${timestamp}`
      })
    
    response.assertStatus(201)
    assert.exists(response.body().id)
    assert.equal(response.body().name, 'New Test Org')
    assert.equal(response.body().plan, 'free')
  })

  test('POST /organizations - validates required fields', async ({ client }) => {
    const { token } = await registerAndGetToken(client)
    
    const response = await client
      .post('/organizations')
      .header('Authorization', `Bearer ${token}`)
      .json({})
    
    response.assertStatus(422)
  })

  test('GET /organizations/:id - returns single organization', async ({ client, assert }) => {
    const { token } = await registerAndGetToken(client)
    const timestamp = Date.now()
    
    // First create an organization
    const createRes = await client
      .post('/organizations')
      .header('Authorization', `Bearer ${token}`)
      .json({
        name: 'Get Org Test',
        slug: `get-org-test-${timestamp}`
      })
    const orgId = createRes.body().id
    
    const response = await client
      .get(`/organizations/${orgId}`)
      .header('Authorization', `Bearer ${token}`)
    
    response.assertStatus(200)
    assert.equal(response.body().id, orgId)
    assert.equal(response.body().name, 'Get Org Test')
  })

  test('GET /organizations/:id - returns 404 for non-existent org', async ({ client }) => {
    const { token } = await registerAndGetToken(client)
    
    const response = await client
      .get('/organizations/99999')
      .header('Authorization', `Bearer ${token}`)
    
    response.assertStatus(404)
  })

  test('PUT /organizations/:id - updates organization', async ({ client, assert }) => {
    const { token } = await registerAndGetToken(client)
    const timestamp = Date.now()
    
    // First create an organization
    const createRes = await client
      .post('/organizations')
      .header('Authorization', `Bearer ${token}`)
      .json({
        name: 'Update Org Test',
        slug: `update-org-test-${timestamp}`
      })
    const orgId = createRes.body().id
    
    const response = await client
      .put(`/organizations/${orgId}`)
      .header('Authorization', `Bearer ${token}`)
      .json({
        name: 'Updated Org Name'
      })
    
    response.assertStatus(200)
    assert.equal(response.body().name, 'Updated Org Name')
  })

  test('GET /users - rejects without authentication', async ({ client }) => {
    const response = await client.get('/users')
    response.assertStatus(401)
  })

  test('GET /organizations - rejects without authentication', async ({ client }) => {
    const response = await client.get('/organizations')
    response.assertStatus(401)
  })

  test('POST /organizations - rejects without authentication', async ({ client }) => {
    const response = await client.post('/organizations').json({ name: 'Test' })
    response.assertStatus(401)
  })
})
