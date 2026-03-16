import { test } from '@japa/runner'
import User from '#models/user'
import Organization from '#models/organization'
import Control from '#models/control'
import { resetDatabase } from './helpers.js'

test.group('Controls', (group) => {
  group.each.setup(async () => {
    await resetDatabase()
  })

  async function setupAuth(client: any) {
    const user = await User.create({
      email: `control_${Date.now()}@example.com`,
      password: 'password123',
      fullName: 'Control User',
    })

    const org = await Organization.create({
      name: 'Control Org',
      slug: `control-org-${Date.now()}`,
      ownerId: user.id,
    })

    const loginRes = await client.post('/api/v1/auth/login').json({
      email: user.email,
      password: 'password123',
    })

    return { token: loginRes.body().token, user, org }
  }

  test('POST /controls - creates new control', async ({ client }) => {
    const { token, org } = await setupAuth(client)

    const response = await client
      .post('/api/v1/controls')
      .header('Authorization', `Bearer ${token}`)
      .json({
        organizationId: org.id,
        title: 'Access Control Policy',
        description: 'Controls for system access management',
        category: 'Security',
        code: 'SEC-001',
      })

    response.assertStatus(201)
    response.assertBodyContains({
      organizationId: org.id,
      title: 'Access Control Policy',
      description: 'Controls for system access management',
      category: 'Security',
      code: 'SEC-001',
      status: 'draft',
    })
  })

  test('POST /controls - validates required fields', async ({ client }) => {
    const { token, org } = await setupAuth(client)

    const response = await client
      .post('/api/v1/controls')
      .header('Authorization', `Bearer ${token}`)
      .json({
        organizationId: org.id,
        // Missing title, category, code
      })

    response.assertStatus(400)
    response.assertBodyContains({ error: 'Validation failed' })
  })

  test('POST /controls - validates status', async ({ client }) => {
    const { token, org } = await setupAuth(client)

    const response = await client
      .post('/api/v1/controls')
      .header('Authorization', `Bearer ${token}`)
      .json({
        organizationId: org.id,
        title: 'Test Control',
        category: 'Security',
        code: 'SEC-002',
        status: 'invalid_status',
      })

    response.assertStatus(400)
    response.assertBodyContains({ error: 'Validation failed' })
  })

  test('POST /controls - prevents duplicate code', async ({ client }) => {
    const { token, org } = await setupAuth(client)

    // Create first control
    await client
      .post('/api/v1/controls')
      .header('Authorization', `Bearer ${token}`)
      .json({
        organizationId: org.id,
        title: 'First Control',
        category: 'Security',
        code: 'SEC-DUPLICATE',
      })

    // Try to create second with same code
    const response = await client
      .post('/api/v1/controls')
      .header('Authorization', `Bearer ${token}`)
      .json({
        organizationId: org.id,
        title: 'Second Control',
        category: 'Compliance',
        code: 'SEC-DUPLICATE',
      })

    response.assertStatus(400)
    response.assertBodyContains({ error: 'Validation failed' })
  })

  test('GET /controls - lists organization controls', async ({ client, assert }) => {
    const { token, org } = await setupAuth(client)

    await Control.create({
      organizationId: org.id,
      title: 'Control 1',
      category: 'Security',
      code: 'SEC-001',
      status: 'active',
    })

    await Control.create({
      organizationId: org.id,
      title: 'Control 2',
      category: 'Compliance',
      code: 'COMP-001',
      status: 'draft',
    })

    const response = await client
      .get(`/api/v1/controls?organizationId=${org.id}`)
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)
    assert.lengthOf(response.body(), 2)
  })

  test('GET /controls - filters by status', async ({ client, assert }) => {
    const { token, org } = await setupAuth(client)

    await Control.create({
      organizationId: org.id,
      title: 'Active Control',
      category: 'Security',
      code: 'SEC-ACTIVE',
      status: 'active',
    })

    await Control.create({
      organizationId: org.id,
      title: 'Draft Control',
      category: 'Security',
      code: 'SEC-DRAFT',
      status: 'draft',
    })

    const response = await client
      .get(`/api/v1/controls?organizationId=${org.id}&status=active`)
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)
    assert.lengthOf(response.body(), 1)
    assert.equal(response.body()[0].status, 'active')
  })

  test('GET /controls/:id - returns control details', async ({ client }) => {
    const { token, org } = await setupAuth(client)

    const control = await Control.create({
      organizationId: org.id,
      title: 'Detailed Control',
      category: 'Security',
      code: 'SEC-DETAIL',
      status: 'active',
      description: 'A detailed control description',
    })

    const response = await client
      .get(`/api/v1/controls/${control.id}`)
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)
    response.assertBodyContains({
      id: control.id,
      title: 'Detailed Control',
      category: 'Security',
      code: 'SEC-DETAIL',
      status: 'active',
    })
  })

  test('GET /controls/:id - returns 404 for non-existent', async ({ client }) => {
    const { token } = await setupAuth(client)

    const response = await client
      .get('/api/v1/controls/99999')
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(404)
    response.assertBodyContains({ error: 'Control not found' })
  })

  test('GET /controls/:id - returns 400 for invalid id', async ({ client }) => {
    const { token } = await setupAuth(client)

    const response = await client
      .get('/api/v1/controls/invalid')
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(400)
    response.assertBodyContains({ error: 'Invalid control ID' })
  })

  test('PUT /controls/:id - updates control', async ({ client }) => {
    const { token, org } = await setupAuth(client)

    const control = await Control.create({
      organizationId: org.id,
      title: 'Original Title',
      category: 'Security',
      code: 'SEC-UPDATE',
      status: 'draft',
    })

    const response = await client
      .put(`/api/v1/controls/${control.id}`)
      .header('Authorization', `Bearer ${token}`)
      .json({
        title: 'Updated Title',
        status: 'active',
        description: 'Updated description',
      })

    response.assertStatus(200)
    response.assertBodyContains({
      title: 'Updated Title',
      status: 'active',
      description: 'Updated description',
    })
  })

  test('PUT /controls/:id - validates status', async ({ client }) => {
    const { token, org } = await setupAuth(client)

    const control = await Control.create({
      organizationId: org.id,
      title: 'Test Control',
      category: 'Security',
      code: 'SEC-VALIDATE',
      status: 'draft',
    })

    const response = await client
      .put(`/api/v1/controls/${control.id}`)
      .header('Authorization', `Bearer ${token}`)
      .json({
        status: 'invalid_status',
      })

    response.assertStatus(400)
    response.assertBodyContains({ error: 'Validation failed' })
  })

  test('DELETE /controls/:id - archives control', async ({ client, assert }) => {
    const { token, org } = await setupAuth(client)

    const control = await Control.create({
      organizationId: org.id,
      title: 'To Archive',
      category: 'Security',
      code: 'SEC-ARCHIVE',
      status: 'active',
    })

    const response = await client
      .delete(`/api/v1/controls/${control.id}`)
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)
    response.assertBodyContains({ message: 'Control archived successfully' })

    // Verify it was archived
    await control.refresh()
    assert.equal(control.status, 'archived')
  })

  test('DELETE /controls/:id - returns 404 for non-existent', async ({ client }) => {
    const { token } = await setupAuth(client)

    const response = await client
      .delete('/api/v1/controls/99999')
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(404)
    response.assertBodyContains({ error: 'Control not found' })
  })
})
