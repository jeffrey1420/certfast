import { test } from '@japa/runner'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

test.group('Auth System', () => {
  test('POST /auth/register - creates new user', async ({ client, assert }) => {
    const response = await client.post('/api/v1/auth/register').json({
      email: 'test@example.com',
      password: 'password123',
      fullName: 'Test User',
    })

    response.assertStatus(201)
    response.assertBodyContains({ email: 'test@example.com' })
    assert.exists(response.body().id)
    assert.equal(response.body().role, 'user')

    // Verify in database
    const user = await User.findBy('email', 'test@example.com')
    assert.isNotNull(user)
    assert.isTrue(await hash.verify(user!.password, 'password123'))
  })

  test('POST /auth/register - validates required fields', async ({ client }) => {
    const response = await client.post('/api/v1/auth/register').json({})

    response.assertStatus(422)
    response.assertBodyContains({ error: 'Validation failed' })
  })

  test('POST /auth/register - rejects duplicate email', async ({ client }) => {
    // Create first user
    await User.create({
      email: 'dup@example.com',
      password: 'password123',
      fullName: 'First User',
    })

    // Try to create second with same email
    const response = await client.post('/api/v1/auth/register').json({
      email: 'dup@example.com',
      password: 'password123',
      fullName: 'Second User',
    })

    response.assertStatus(422)
    response.assertBodyContains({ error: 'User already exists' })
  })

  test('POST /auth/login - returns token for valid credentials', async ({ client, assert }) => {
    // Create user first
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
    // Create user
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
})