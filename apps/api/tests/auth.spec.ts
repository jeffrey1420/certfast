import { test } from '@japa/runner'

test.group('Auth System', () => {
  test('POST /auth/register - creates new user', async ({ client, assert }) => {
    const response = await client.post('/auth/register').json({
      email: 'test@example.com',
      password: 'password123',
      fullName: 'Test User'
    })
    
    response.assertStatus(201)
    response.assertBodyContains({ email: 'test@example.com' })
    assert.exists(response.body().id)
    assert.equal(response.body().role, 'user')
  })

  test('POST /auth/register - validates required fields', async ({ client }) => {
    const response = await client.post('/auth/register').json({})
    
    response.assertStatus(422)
    response.assertBodyContains({ error: 'Validation failed' })
  })

  test('POST /auth/login - returns token for valid credentials', async ({ client, assert }) => {
    const response = await client.post('/auth/login').json({
      email: 'test@example.com',
      password: 'password123'
    })
    
    response.assertStatus(200)
    assert.exists(response.body().token)
    assert.exists(response.body().user)
  })

  test('POST /auth/login - rejects invalid credentials', async ({ client }) => {
    const response = await client.post('/auth/login').json({
      email: 'test@example.com',
      password: 'wrongpassword'
    })
    
    response.assertStatus(401)
    response.assertBodyContains({ error: 'Invalid credentials' })
  })

  test('GET /auth/me - returns current user with valid token', async ({ client, assert }) => {
    // First login to get token
    const loginRes = await client.post('/auth/login').json({
      email: 'test@example.com',
      password: 'password123'
    })
    const token = loginRes.body().token

    const response = await client.get('/auth/me').header('Authorization', `Bearer ${token}`)
    
    response.assertStatus(200)
    assert.exists(response.body().id)
    assert.exists(response.body().email)
  })

  test('GET /auth/me - rejects without token', async ({ client }) => {
    const response = await client.get('/auth/me')
    
    response.assertStatus(401)
    response.assertBodyContains({ error: 'Unauthorized' })
  })

  test('POST /auth/logout - invalidates token', async ({ client }) => {
    const loginRes = await client.post('/auth/login').json({
      email: 'test@example.com',
      password: 'password123'
    })
    const token = loginRes.body().token

    const response = await client.post('/auth/logout').header('Authorization', `Bearer ${token}`)
    
    response.assertStatus(200)
    response.assertBodyContains({ message: 'Logged out successfully' })
  })
})
