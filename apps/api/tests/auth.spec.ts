import { test } from '@japa/runner'
import User from '#models/user'
import { resetDatabase } from './helpers.js'

test.group('Auth System', (group) => {
  group.each.setup(async () => {
    await resetDatabase()
  })

  test('POST /auth/register - creates new user and returns token', async ({ client, assert }) => {
    const response = await client.post('/api/v1/auth/register').json({
      email: 'test@example.com',
      password: 'password123',
      fullName: 'Test User',
    })

    response.assertStatus(201)
    assert.exists(response.body().token)
    assert.equal(response.body().user.email, 'test@example.com')
    assert.exists(response.body().user.id)
    assert.equal(response.body().user.role, 'user')

    const user = await User.findBy('email', 'test@example.com')
    assert.isNotNull(user)
    assert.isTrue(await user!.verifyPassword('password123'))
  })

  test('POST /auth/register - validates required fields', async ({ client }) => {
    const response = await client.post('/api/v1/auth/register').json({})

    response.assertStatus(422)
    response.assertBodyContains({ error: 'Validation failed' })
  })

  test('POST /auth/register - rejects duplicate email', async ({ client }) => {
    await User.create({
      email: 'dup@example.com',
      password: 'password123',
      fullName: 'First User',
    })

    const response = await client.post('/api/v1/auth/register').json({
      email: 'dup@example.com',
      password: 'password123',
      fullName: 'Second User',
    })

    response.assertStatus(422)
    response.assertBodyContains({ error: 'User already exists' })
  })

  test('POST /auth/login - returns token for valid credentials', async ({ client, assert }) => {
    await User.create({
      email: 'login@test.com',
      password: 'password123',
      fullName: 'Login Test',
    })

    const response = await client.post('/api/v1/auth/login').json({
      email: 'login@test.com',
      password: 'password123',
    })

    response.assertStatus(200)
    assert.exists(response.body().token)
    assert.exists(response.body().user)
    assert.equal(response.body().user.email, 'login@test.com')
  })

  test('POST /auth/login - rejects invalid credentials', async ({ client }) => {
    await User.create({
      email: 'fail@test.com',
      password: 'password123',
      fullName: 'Fail Test',
    })

    const response = await client.post('/api/v1/auth/login').json({
      email: 'fail@test.com',
      password: 'wrongpassword',
    })

    response.assertStatus(401)
    response.assertBodyContains({ error: 'Invalid credentials' })
  })

  test('POST /auth/login - rejects non-existent user', async ({ client }) => {
    const response = await client.post('/api/v1/auth/login').json({
      email: 'nonexistent@test.com',
      password: 'password123',
    })

    response.assertStatus(401)
    response.assertBodyContains({ error: 'Invalid credentials' })
  })

  test('GET /auth/me - returns current user for valid bearer token', async ({ client, assert }) => {
    await User.create({
      email: 'me@test.com',
      password: 'password123',
      fullName: 'Me Test',
    })

    const loginResponse = await client.post('/api/v1/auth/login').json({
      email: 'me@test.com',
      password: 'password123',
    })

    loginResponse.assertStatus(200)
    const token = loginResponse.body().token

    const meResponse = await client.get('/api/v1/auth/me').header('Authorization', `Bearer ${token}`)

    meResponse.assertStatus(200)
    assert.equal(meResponse.body().email, 'me@test.com')
    assert.equal(meResponse.body().fullName, 'Me Test')
    assert.equal(meResponse.body().role, 'user')
    assert.exists(meResponse.body().id)
  })

  test('POST /auth/logout - revokes token and blocks subsequent /auth/me', async ({ client }) => {
    await User.create({
      email: 'logout@test.com',
      password: 'password123',
      fullName: 'Logout Test',
    })

    const loginResponse = await client.post('/api/v1/auth/login').json({
      email: 'logout@test.com',
      password: 'password123',
    })

    loginResponse.assertStatus(200)
    const token = loginResponse.body().token

    const logoutResponse = await client
      .post('/api/v1/auth/logout')
      .header('Authorization', `Bearer ${token}`)

    logoutResponse.assertStatus(200)
    logoutResponse.assertBodyContains({ message: 'Logged out successfully' })

    const meResponseAfterLogout = await client
      .get('/api/v1/auth/me')
      .header('Authorization', `Bearer ${token}`)

    meResponseAfterLogout.assertStatus(401)
    meResponseAfterLogout.assertBodyContains({ error: 'Unauthorized' })
  })
})
