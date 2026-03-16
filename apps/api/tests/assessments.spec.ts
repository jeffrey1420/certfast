import { test } from '@japa/runner'

test.group('Assessments', () => {
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

  // Helper to create an organization
  async function createOrganization(client: any, token: string) {
    const uniqueSlug = `test-org-${Date.now()}-${Math.random().toString(36).substring(7)}`
    const response = await client.post('/organizations')
      .header('Authorization', `Bearer ${token}`)
      .json({
        name: 'Test Organization',
        slug: uniqueSlug
      })
    return response.body()
  }

  test('GET /assessments - lists all assessments', async ({ client, assert }) => {
    const token = await getAuthToken(client)
    
    const response = await client.get('/assessments').header('Authorization', `Bearer ${token}`)
    
    response.assertStatus(200)
    assert.isArray(response.body())
  })

  test('POST /assessments - creates new assessment', async ({ client, assert }) => {
    const token = await getAuthToken(client)
    const org = await createOrganization(client, token)
    
    const response = await client.post('/assessments')
      .header('Authorization', `Bearer ${token}`)
      .json({
        organizationId: org.id,
        title: 'SOC 2 Type II Assessment',
        type: 'soc2_type2',
        description: 'Annual SOC 2 compliance assessment',
        dueDate: '2026-06-30'
      })
    
    response.assertStatus(201)
    assert.exists(response.body().id)
    assert.equal(response.body().title, 'SOC 2 Type II Assessment')
    assert.equal(response.body().type, 'soc2_type2')
    assert.equal(response.body().status, 'draft')
  })

  test('POST /assessments - validates required fields', async ({ client }) => {
    const token = await getAuthToken(client)
    
    const response = await client.post('/assessments')
      .header('Authorization', `Bearer ${token}`)
      .json({ description: 'Missing title and type' })
    
    response.assertStatus(422)
    response.assertBodyContains({ error: 'Validation failed' })
  })

  test('POST /assessments - validates type enum', async ({ client }) => {
    const token = await getAuthToken(client)
    const org = await createOrganization(client, token)
    
    const response = await client.post('/assessments')
      .header('Authorization', `Bearer ${token}`)
      .json({
        organizationId: org.id,
        title: 'Invalid Type Test',
        type: 'invalid_type'
      })
    
    response.assertStatus(422)
    response.assertBodyContains({ error: 'Validation failed' })
  })

  test('GET /assessments/:id - returns assessment by ID', async ({ client, assert }) => {
    const token = await getAuthToken(client)
    const org = await createOrganization(client, token)
    
    // Create assessment first
    const createRes = await client.post('/assessments')
      .header('Authorization', `Bearer ${token}`)
      .json({
        organizationId: org.id,
        title: 'Get Test Assessment',
        type: 'iso27001'
      })
    const assessmentId = createRes.body().id
    
    const response = await client.get(`/assessments/${assessmentId}`)
      .header('Authorization', `Bearer ${token}`)
    
    response.assertStatus(200)
    assert.equal(response.body().id, assessmentId)
    assert.equal(response.body().title, 'Get Test Assessment')
    assert.equal(response.body().type, 'iso27001')
  })

  test('GET /assessments/:id - returns 404 for non-existent assessment', async ({ client }) => {
    const token = await getAuthToken(client)
    
    const response = await client.get('/assessments/99999')
      .header('Authorization', `Bearer ${token}`)
    
    response.assertStatus(404)
    response.assertBodyContains({ error: 'Assessment not found' })
  })

  test('PUT /assessments/:id - updates assessment', async ({ client, assert }) => {
    const token = await getAuthToken(client)
    const org = await createOrganization(client, token)
    
    // Create assessment first
    const createRes = await client.post('/assessments')
      .header('Authorization', `Bearer ${token}`)
      .json({
        organizationId: org.id,
        title: 'Update Test Assessment',
        type: 'gdpr'
      })
    const assessmentId = createRes.body().id
    
    const response = await client.put(`/assessments/${assessmentId}`)
      .header('Authorization', `Bearer ${token}`)
      .json({
        title: 'Updated Assessment Title',
        status: 'active'
      })
    
    response.assertStatus(200)
    assert.equal(response.body().id, assessmentId)
    assert.equal(response.body().title, 'Updated Assessment Title')
    assert.equal(response.body().status, 'active')
  })

  test('PUT /assessments/:id - returns 404 for non-existent assessment', async ({ client }) => {
    const token = await getAuthToken(client)
    
    const response = await client.put('/assessments/99999')
      .header('Authorization', `Bearer ${token}`)
      .json({ title: 'Updated Title' })
    
    response.assertStatus(404)
    response.assertBodyContains({ error: 'Assessment not found' })
  })

  test('DELETE /assessments/:id - deletes assessment', async ({ client }) => {
    const token = await getAuthToken(client)
    const org = await createOrganization(client, token)
    
    // Create assessment first
    const createRes = await client.post('/assessments')
      .header('Authorization', `Bearer ${token}`)
      .json({
        organizationId: org.id,
        title: 'Delete Test Assessment',
        type: 'hipaa'
      })
    const assessmentId = createRes.body().id
    
    const response = await client.delete(`/assessments/${assessmentId}`)
      .header('Authorization', `Bearer ${token}`)
    
    response.assertStatus(200)
    response.assertBodyContains({ message: 'Assessment deleted successfully' })
    
    // Verify it's deleted
    const getRes = await client.get(`/assessments/${assessmentId}`)
      .header('Authorization', `Bearer ${token}`)
    getRes.assertStatus(404)
  })

  test('DELETE /assessments/:id - returns 404 for non-existent assessment', async ({ client }) => {
    const token = await getAuthToken(client)
    
    const response = await client.delete('/assessments/99999')
      .header('Authorization', `Bearer ${token}`)
    
    response.assertStatus(404)
    response.assertBodyContains({ error: 'Assessment not found' })
  })

  test('GET /assessments - filters by organization', async ({ client, assert }) => {
    const token = await getAuthToken(client)
    const org = await createOrganization(client, token)
    
    // Create assessment
    await client.post('/assessments')
      .header('Authorization', `Bearer ${token}`)
      .json({
        organizationId: org.id,
        title: 'Filtered Assessment',
        type: 'custom'
      })
    
    const response = await client.get(`/assessments?organizationId=${org.id}`)
      .header('Authorization', `Bearer ${token}`)
    
    response.assertStatus(200)
    assert.isArray(response.body())
    // All returned assessments should belong to the org
    response.body().forEach((assessment: any) => {
      assert.equal(assessment.organizationId, org.id)
    })
  })

  test('GET /assessments - requires authentication', async ({ client }) => {
    const response = await client.get('/assessments')
    
    response.assertStatus(401)
    response.assertBodyContains({ error: 'Unauthorized' })
  })

  test('POST /assessments - requires authentication', async ({ client }) => {
    const response = await client.post('/assessments').json({
      organizationId: 1,
      title: 'Test',
      type: 'soc2_type1'
    })
    
    response.assertStatus(401)
    response.assertBodyContains({ error: 'Unauthorized' })
  })
})
