import { test } from '@japa/runner'
import User from '#models/user'
import Organization from '#models/organization'
import Assessment from '#models/assessment'
import { resetDatabase } from './helpers.js'

test.group('Assessments', (group) => {
  group.each.setup(async () => {
    await resetDatabase()
  })

  async function setupAuth(client: any) {
    const user = await User.create({
      email: `assess_${Date.now()}@example.com`,
      password: 'password123',
      fullName: 'Assessment User',
    })

    const org = await Organization.create({
      name: 'Assessment Org',
      slug: `assessment-org-${Date.now()}`,
      ownerId: user.id,
    })

    const loginRes = await client.post('/api/v1/auth/login').json({
      email: user.email,
      password: 'password123',
    })

    return { token: loginRes.body().token, user, org }
  }

  test('POST /assessments - creates new assessment', async ({ client }) => {
    const { token, org } = await setupAuth(client)

    const response = await client
      .post('/api/v1/assessments')
      .header('Authorization', `Bearer ${token}`)
      .json({
        organizationId: org.id,
        title: 'SOC 2 Security Assessment',
        type: 'soc2_type1',
        dueDate: '2025-12-31',
      })

    response.assertStatus(201)
    response.assertBodyContains({
      organizationId: org.id,
      title: 'SOC 2 Security Assessment',
      type: 'soc2_type1',
      status: 'draft',
    })
  })

  test('GET /assessments - lists organization assessments', async ({ client, assert }) => {
    const { token, org } = await setupAuth(client)

    await Assessment.create({
      organizationId: org.id,
      title: 'Assessment 1',
      type: 'soc2_type1',
      status: 'active',
    })

    await Assessment.create({
      organizationId: org.id,
      title: 'Assessment 2',
      type: 'iso27001',
      status: 'draft',
    })

    const response = await client
      .get(`/api/v1/assessments?organizationId=${org.id}`)
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)
    assert.lengthOf(response.body(), 2)
  })

  test('GET /assessments/:id - returns assessment details', async ({ client }) => {
    const { token, org } = await setupAuth(client)

    const assessment = await Assessment.create({
      organizationId: org.id,
      title: 'Detailed Assessment',
      type: 'gdpr',
      status: 'in_review',
    })

    const response = await client
      .get(`/api/v1/assessments/${assessment.id}`)
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)
    response.assertBodyContains({
      id: assessment.id,
      title: 'Detailed Assessment',
      type: 'gdpr',
      status: 'in_review',
    })
  })

  test('PUT /assessments/:id - updates assessment', async ({ client }) => {
    const { token, org } = await setupAuth(client)

    const assessment = await Assessment.create({
      organizationId: org.id,
      title: 'Original Title',
      type: 'soc2_type1',
      status: 'draft',
    })

    const response = await client
      .put(`/api/v1/assessments/${assessment.id}`)
      .header('Authorization', `Bearer ${token}`)
      .json({
        title: 'Updated Title',
        status: 'active',
      })

    response.assertStatus(200)
    response.assertBodyContains({
      title: 'Updated Title',
      status: 'active',
    })
  })

  test('DELETE /assessments/:id - archives assessment', async ({ client }) => {
    const { token, org } = await setupAuth(client)

    const assessment = await Assessment.create({
      organizationId: org.id,
      title: 'To Archive',
      type: 'soc2_type1',
      status: 'active',
    })

    const response = await client
      .delete(`/api/v1/assessments/${assessment.id}`)
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)
    response.assertBodyContains({ message: 'Assessment archived successfully' })

    await assessment.refresh()
    response.assertBodyContains({ message: 'Assessment archived successfully' })
  })
})
