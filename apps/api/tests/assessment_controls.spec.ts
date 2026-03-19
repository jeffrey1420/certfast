import { test } from '@japa/runner'
import User from '#models/user'
import Organization from '#models/organization'
import Assessment from '#models/assessment'
import Control from '#models/control'
import { resetDatabase } from './helpers.js'

test.group('Assessment Controls', (group) => {
  group.each.setup(async () => {
    await resetDatabase()
  })

  async function setupAuth(client: any) {
    const user = await User.create({
      email: `ac_test_${Date.now()}@example.com`,
      password: 'password123',
      fullName: 'Assessment Control User',
    })

    const org = await Organization.create({
      name: 'Assessment Control Org',
      slug: `ac-org-${Date.now()}`,
      ownerId: user.id,
    })

    const loginRes = await client.post('/api/v1/auth/login').json({
      email: user.email,
      password: 'password123',
    })

    return { token: loginRes.body().token, user, org }
  }

  async function createAssessment(orgId: number, overrides: Partial<Assessment> = {}) {
    return Assessment.create({
      organizationId: orgId,
      title: 'Test Assessment',
      type: 'soc2_type1',
      status: 'active',
      ...overrides,
    })
  }

  async function createControl(orgId: number, overrides: Partial<Control> = {}) {
    return Control.create({
      organizationId: orgId,
      title: 'Test Control',
      description: 'A test control',
      category: 'security',
      code: `CTRL-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      status: 'active',
      ...overrides,
    })
  }

  test('GET /assessments/:id/controls - lists linked controls', async ({ client, assert }) => {
    const { token, org } = await setupAuth(client)
    const assessment = await createAssessment(org.id)
    const control1 = await createControl(org.id, { title: 'Control 1' })
    const control2 = await createControl(org.id, { title: 'Control 2' })

    // Link controls to assessment
    await assessment.related('controls').attach({
      [control1.id]: { status: 'not_started' },
      [control2.id]: { status: 'in_progress' },
    })

    const response = await client
      .get(`/api/v1/assessments/${assessment.id}/controls`)
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)
    assert.lengthOf(response.body(), 2)
    assert.exists(response.body()[0].pivotStatus)
  })

  test('GET /assessments/:id/controls - returns 404 for non-existent assessment', async ({ client }) => {
    const { token } = await setupAuth(client)

    const response = await client
      .get('/api/v1/assessments/99999/controls')
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(404)
    response.assertBodyContains({ error: 'Assessment not found' })
  })

  test('POST /assessments/:id/controls - links a control to assessment', async ({ client }) => {
    const { token, org } = await setupAuth(client)
    const assessment = await createAssessment(org.id)
    const control = await createControl(org.id)

    const response = await client
      .post(`/api/v1/assessments/${assessment.id}/controls`)
      .header('Authorization', `Bearer ${token}`)
      .json({
        controlId: control.id,
        status: 'in_progress',
        notes: 'Initial assessment',
      })

    response.assertStatus(201)
    response.assertBodyContains({
      id: control.id,
      title: 'Test Control',
      pivotStatus: 'in_progress',
      pivotNotes: 'Initial assessment',
    })
  })

  test('POST /assessments/:id/controls - requires controlId', async ({ client }) => {
    const { token, org } = await setupAuth(client)
    const assessment = await createAssessment(org.id)

    const response = await client
      .post(`/api/v1/assessments/${assessment.id}/controls`)
      .header('Authorization', `Bearer ${token}`)
      .json({ status: 'in_progress' })

    response.assertStatus(422)
    response.assertBodyContains({ error: 'Validation failed' })
  })

  test('POST /assessments/:id/controls - returns 422 for control from different org', async ({ client }) => {
    const { token, org } = await setupAuth(client)
    const assessment = await createAssessment(org.id)

    // Create another organization and control
    const otherUser = await User.create({
      email: `other_${Date.now()}@example.com`,
      password: 'password123',
      fullName: 'Other User',
    })
    const otherOrg = await Organization.create({
      name: 'Other Org',
      slug: `other-org-${Date.now()}`,
      ownerId: otherUser.id,
    })
    const otherControl = await createControl(otherOrg.id)

    const response = await client
      .post(`/api/v1/assessments/${assessment.id}/controls`)
      .header('Authorization', `Bearer ${token}`)
      .json({ controlId: otherControl.id })

    response.assertStatus(422)
    response.assertBodyContains({ message: 'Control must belong to the same organization as the assessment' })
  })

  test('POST /assessments/:id/controls - prevents duplicate links', async ({ client }) => {
    const { token, org } = await setupAuth(client)
    const assessment = await createAssessment(org.id)
    const control = await createControl(org.id)

    // First link
    await client
      .post(`/api/v1/assessments/${assessment.id}/controls`)
      .header('Authorization', `Bearer ${token}`)
      .json({ controlId: control.id })

    // Duplicate link attempt
    const response = await client
      .post(`/api/v1/assessments/${assessment.id}/controls`)
      .header('Authorization', `Bearer ${token}`)
      .json({ controlId: control.id })

    response.assertStatus(422)
    response.assertBodyContains({ message: 'Control is already linked to this assessment' })
  })

  test('POST /assessments/:id/controls - validates status values', async ({ client }) => {
    const { token, org } = await setupAuth(client)
    const assessment = await createAssessment(org.id)
    const control = await createControl(org.id)

    const response = await client
      .post(`/api/v1/assessments/${assessment.id}/controls`)
      .header('Authorization', `Bearer ${token}`)
      .json({
        controlId: control.id,
        status: 'invalid_status',
      })

    response.assertStatus(422)
    response.assertBodyContains({ message: 'Invalid status value' })
  })

  test('GET /assessments/:id/controls/:controlId - gets single linked control', async ({ client }) => {
    const { token, org } = await setupAuth(client)
    const assessment = await createAssessment(org.id)
    const control = await createControl(org.id)

    await assessment.related('controls').attach({
      [control.id]: { status: 'implemented', notes: 'Done' },
    })

    const response = await client
      .get(`/api/v1/assessments/${assessment.id}/controls/${control.id}`)
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)
    response.assertBodyContains({
      id: control.id,
      pivotStatus: 'implemented',
      pivotNotes: 'Done',
    })
  })

  test('GET /assessments/:id/controls/:controlId - returns 404 for unlinked control', async ({ client }) => {
    const { token, org } = await setupAuth(client)
    const assessment = await createAssessment(org.id)
    const control = await createControl(org.id)

    const response = await client
      .get(`/api/v1/assessments/${assessment.id}/controls/${control.id}`)
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(404)
    response.assertBodyContains({ error: 'Control not linked to this assessment' })
  })

  test('PUT /assessments/:id/controls/:controlId - updates pivot data', async ({ client, assert }) => {
    const { token, org } = await setupAuth(client)
    const assessment = await createAssessment(org.id)
    const control = await createControl(org.id)

    await assessment.related('controls').attach({
      [control.id]: { status: 'not_started' },
    })

    const response = await client
      .put(`/api/v1/assessments/${assessment.id}/controls/${control.id}`)
      .header('Authorization', `Bearer ${token}`)
      .json({
        status: 'implemented',
        notes: 'Completed review',
      })

    response.assertStatus(200)
    response.assertBodyContains({
      pivotStatus: 'implemented',
      pivotNotes: 'Completed review',
    })
    assert.exists(response.body().pivotCompletedAt)
  })

  test('PUT /assessments/:id/controls/:controlId - clears completed_at when status reverts', async ({ client, assert }) => {
    const { token, org } = await setupAuth(client)
    const assessment = await createAssessment(org.id)
    const control = await createControl(org.id)

    await assessment.related('controls').attach({
      [control.id]: { status: 'implemented', completed_at: new Date() },
    })

    const response = await client
      .put(`/api/v1/assessments/${assessment.id}/controls/${control.id}`)
      .header('Authorization', `Bearer ${token}`)
      .json({ status: 'in_progress' })

    response.assertStatus(200)
    response.assertBodyContains({ pivotStatus: 'in_progress' })
    assert.isNull(response.body().pivotCompletedAt)
  })

  test('PUT /assessments/:id/controls/:controlId - validates assigned user exists', async ({ client }) => {
    const { token, org } = await setupAuth(client)
    const assessment = await createAssessment(org.id)
    const control = await createControl(org.id)

    await assessment.related('controls').attach({
      [control.id]: { status: 'not_started' },
    })

    const response = await client
      .put(`/api/v1/assessments/${assessment.id}/controls/${control.id}`)
      .header('Authorization', `Bearer ${token}`)
      .json({ assignedTo: 99999 })

    response.assertStatus(422)
    response.assertBodyContains({ message: 'Assigned user not found' })
  })

  test('DELETE /assessments/:id/controls/:controlId - unlinks control from assessment', async ({ client }) => {
    const { token, org } = await setupAuth(client)
    const assessment = await createAssessment(org.id)
    const control = await createControl(org.id)

    await assessment.related('controls').attach({
      [control.id]: { status: 'not_started' },
    })

    const response = await client
      .delete(`/api/v1/assessments/${assessment.id}/controls/${control.id}`)
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)
    response.assertBodyContains({ message: 'Control unlinked from assessment successfully' })

    // Verify it's unlinked
    const checkResponse = await client
      .get(`/api/v1/assessments/${assessment.id}/controls/${control.id}`)
      .header('Authorization', `Bearer ${token}`)

    checkResponse.assertStatus(404)
  })

  test('DELETE /assessments/:id/controls/:controlId - returns 404 for non-existent assessment', async ({ client }) => {
    const { token, org } = await setupAuth(client)
    const control = await createControl(org.id)

    const response = await client
      .delete(`/api/v1/assessments/99999/controls/${control.id}`)
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(404)
    response.assertBodyContains({ error: 'Assessment not found' })
  })

  test('POST /assessments/:id/controls - validates assigned user exists', async ({ client }) => {
    const { token, org } = await setupAuth(client)
    const assessment = await createAssessment(org.id)
    const control = await createControl(org.id)

    const response = await client
      .post(`/api/v1/assessments/${assessment.id}/controls`)
      .header('Authorization', `Bearer ${token}`)
      .json({
        controlId: control.id,
        assignedTo: 99999,
      })

    response.assertStatus(422)
    response.assertBodyContains({ message: 'Assigned user not found' })
  })

  test('POST /assessments/:id/controls - accepts valid assigned user', async ({ client }) => {
    const { token, org, user } = await setupAuth(client)
    const assessment = await createAssessment(org.id)
    const control = await createControl(org.id)

    const response = await client
      .post(`/api/v1/assessments/${assessment.id}/controls`)
      .header('Authorization', `Bearer ${token}`)
      .json({
        controlId: control.id,
        assignedTo: user.id,
        status: 'in_progress',
      })

    response.assertStatus(201)
    response.assertBodyContains({
      pivotAssignedTo: user.id,
      pivotStatus: 'in_progress',
    })
  })
})
