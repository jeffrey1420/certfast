import { test } from '@japa/runner'
import User from '#models/user'
import Organization from '#models/organization'
import Policy from '#models/policy'
import { resetDatabase } from './helpers.js'

test.group('Policies', (group) => {
  group.each.setup(async () => {
    await resetDatabase()
  })

  async function setupAuth(client: any) {
    const user = await User.create({
      email: `policy_${Date.now()}@example.com`,
      password: 'password123',
      fullName: 'Policy User',
    })

    const org = await Organization.create({
      name: 'Policy Org',
      slug: `policy-org-${Date.now()}`,
      ownerId: user.id,
    })

    const loginRes = await client.post('/api/v1/auth/login').json({
      email: user.email,
      password: 'password123',
    })

    return { token: loginRes.body().token, user, org }
  }

  test('POST /policies - creates new policy', async ({ client }) => {
    const { token, org } = await setupAuth(client)

    const response = await client
      .post('/api/v1/policies')
      .header('Authorization', `Bearer ${token}`)
      .json({
        organizationId: org.id,
        title: 'Data Protection Policy',
        content: 'This policy describes how we protect data...',
      })

    response.assertStatus(201)
    response.assertBodyContains({
      organizationId: org.id,
      title: 'Data Protection Policy',
      content: 'This policy describes how we protect data...',
      status: 'draft',
      version: '1.0.0',
    })
  })

  test('POST /policies - creates policy with custom version', async ({ client }) => {
    const { token, org } = await setupAuth(client)

    const response = await client
      .post('/api/v1/policies')
      .header('Authorization', `Bearer ${token}`)
      .json({
        organizationId: org.id,
        title: 'Security Policy',
        content: 'Security policy content...',
        status: 'published',
        version: '2.1.0',
      })

    response.assertStatus(201)
    response.assertBodyContains({
      title: 'Security Policy',
      status: 'published',
      version: '2.1.0',
    })
  })

  test('POST /policies - validates required fields', async ({ client }) => {
    const { token, org } = await setupAuth(client)

    const response = await client
      .post('/api/v1/policies')
      .header('Authorization', `Bearer ${token}`)
      .json({
        organizationId: org.id,
        // Missing title and content
      })

    response.assertStatus(400)
    response.assertBodyContains({ error: 'Validation failed' })
  })

  test('POST /policies - validates status', async ({ client }) => {
    const { token, org } = await setupAuth(client)

    const response = await client
      .post('/api/v1/policies')
      .header('Authorization', `Bearer ${token}`)
      .json({
        organizationId: org.id,
        title: 'Test Policy',
        content: 'Test content',
        status: 'invalid_status',
      })

    response.assertStatus(400)
    response.assertBodyContains({ error: 'Validation failed' })
  })

  test('GET /policies - lists organization policies', async ({ client, assert }) => {
    const { token, org } = await setupAuth(client)

    await Policy.create({
      organizationId: org.id,
      title: 'Policy 1',
      content: 'Content 1',
      status: 'published',
      version: '1.0.0',
    })

    await Policy.create({
      organizationId: org.id,
      title: 'Policy 2',
      content: 'Content 2',
      status: 'draft',
      version: '1.0.0',
    })

    const response = await client
      .get(`/api/v1/policies?organizationId=${org.id}`)
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)
    assert.lengthOf(response.body(), 2)
  })

  test('GET /policies - filters by status', async ({ client, assert }) => {
    const { token, org } = await setupAuth(client)

    await Policy.create({
      organizationId: org.id,
      title: 'Published Policy',
      content: 'Published content',
      status: 'published',
      version: '1.0.0',
    })

    await Policy.create({
      organizationId: org.id,
      title: 'Draft Policy',
      content: 'Draft content',
      status: 'draft',
      version: '1.0.0',
    })

    const response = await client
      .get(`/api/v1/policies?organizationId=${org.id}&status=published`)
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)
    assert.lengthOf(response.body(), 1)
    assert.equal(response.body()[0].status, 'published')
  })

  test('GET /policies/:id - returns policy details', async ({ client }) => {
    const { token, org } = await setupAuth(client)

    const policy = await Policy.create({
      organizationId: org.id,
      title: 'Detailed Policy',
      content: 'Detailed policy content with full description',
      status: 'published',
      version: '1.5.0',
    })

    const response = await client
      .get(`/api/v1/policies/${policy.id}`)
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)
    response.assertBodyContains({
      id: policy.id,
      title: 'Detailed Policy',
      content: 'Detailed policy content with full description',
      status: 'published',
      version: '1.5.0',
    })
  })

  test('GET /policies/:id - returns 404 for non-existent', async ({ client }) => {
    const { token } = await setupAuth(client)

    const response = await client
      .get('/api/v1/policies/99999')
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(404)
    response.assertBodyContains({ error: 'Policy not found' })
  })

  test('GET /policies/:id - returns 400 for invalid id', async ({ client }) => {
    const { token } = await setupAuth(client)

    const response = await client
      .get('/api/v1/policies/invalid')
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(400)
    response.assertBodyContains({ error: 'Invalid policy ID' })
  })

  test('PUT /policies/:id - updates policy', async ({ client }) => {
    const { token, org } = await setupAuth(client)

    const policy = await Policy.create({
      organizationId: org.id,
      title: 'Original Title',
      content: 'Original content',
      status: 'draft',
      version: '1.0.0',
    })

    const response = await client
      .put(`/api/v1/policies/${policy.id}`)
      .header('Authorization', `Bearer ${token}`)
      .json({
        title: 'Updated Title',
        content: 'Updated content',
        status: 'published',
        version: '2.0.0',
      })

    response.assertStatus(200)
    response.assertBodyContains({
      title: 'Updated Title',
      content: 'Updated content',
      status: 'published',
      version: '2.0.0',
    })
  })

  test('PUT /policies/:id - validates status', async ({ client }) => {
    const { token, org } = await setupAuth(client)

    const policy = await Policy.create({
      organizationId: org.id,
      title: 'Test Policy',
      content: 'Test content',
      status: 'draft',
      version: '1.0.0',
    })

    const response = await client
      .put(`/api/v1/policies/${policy.id}`)
      .header('Authorization', `Bearer ${token}`)
      .json({
        status: 'invalid_status',
      })

    response.assertStatus(400)
    response.assertBodyContains({ error: 'Validation failed' })
  })

  test('DELETE /policies/:id - archives policy', async ({ client, assert }) => {
    const { token, org } = await setupAuth(client)

    const policy = await Policy.create({
      organizationId: org.id,
      title: 'To Archive',
      content: 'Content to archive',
      status: 'published',
      version: '1.0.0',
    })

    const response = await client
      .delete(`/api/v1/policies/${policy.id}`)
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)
    response.assertBodyContains({ message: 'Policy archived successfully' })

    // Verify it was archived
    await policy.refresh()
    assert.equal(policy.status, 'archived')
  })

  test('DELETE /policies/:id - returns 404 for non-existent', async ({ client }) => {
    const { token } = await setupAuth(client)

    const response = await client
      .delete('/api/v1/policies/99999')
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(404)
    response.assertBodyContains({ error: 'Policy not found' })
  })
})
