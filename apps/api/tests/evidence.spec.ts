import { test } from '@japa/runner'
import User from '#models/user'
import Organization from '#models/organization'
import Control from '#models/control'
import Evidence from '#models/evidence'
import { resetDatabase } from './helpers.js'

test.group('Evidence', (group) => {
  group.each.setup(async () => {
    await resetDatabase()
  })

  async function setupAuth(client: any, suffix: string = 'evidence') {
    const user = await User.create({
      email: `${suffix}_${Date.now()}@example.com`,
      password: 'password123',
      fullName: 'Evidence User',
    })

    const org = await Organization.create({
      name: `Evidence Org ${suffix}`,
      slug: `evidence-org-${suffix}-${Date.now()}`,
      ownerId: user.id,
    })

    const control = await Control.create({
      organizationId: org.id,
      title: `Test Control ${suffix}`,
      category: 'Security',
      code: `SEC-${suffix.toUpperCase()}-${Date.now()}`,
      status: 'active',
    })

    const loginRes = await client.post('/api/v1/auth/login').json({
      email: user.email,
      password: 'password123',
    })

    return { token: loginRes.body().token, user, org, control }
  }

  test('POST /evidence - creates new evidence', async ({ client }) => {
    const { token, control, user } = await setupAuth(client, 'create')

    const response = await client
      .post('/api/v1/evidence')
      .header('Authorization', `Bearer ${token}`)
      .json({
        controlId: control.id,
        fileUrl: 'https://example.com/evidence/audit-log.pdf',
        fileName: 'audit-log.pdf',
        fileType: 'application/pdf',
        fileSize: 102400,
        description: 'System access audit log for Q4 2025',
      })

    response.assertStatus(201)
    response.assertBodyContains({
      controlId: control.id,
      fileUrl: 'https://example.com/evidence/audit-log.pdf',
      fileName: 'audit-log.pdf',
      fileType: 'application/pdf',
      fileSize: 102400,
      description: 'System access audit log for Q4 2025',
      status: 'pending',
      uploadedBy: user.id,
    })
  })

  test('POST /evidence - validates required fields', async ({ client }) => {
    const { token, control } = await setupAuth(client, 'validate')

    const response = await client
      .post('/api/v1/evidence')
      .header('Authorization', `Bearer ${token}`)
      .json({
        controlId: control.id,
        // Missing fileUrl, fileName, fileType
        description: 'Some description',
      })

    response.assertStatus(422)
    response.assertBodyContains({ error: 'Validation failed' })
  })

  test('POST /evidence - returns 404 for non-existent control', async ({ client }) => {
    const { token } = await setupAuth(client, 'notfound')

    const response = await client
      .post('/api/v1/evidence')
      .header('Authorization', `Bearer ${token}`)
      .json({
        controlId: 99999,
        fileUrl: 'https://example.com/file.pdf',
        fileName: 'file.pdf',
        fileType: 'application/pdf',
      })

    response.assertStatus(404)
    response.assertBodyContains({ error: 'Control not found' })
  })

  test('POST /evidence - prevents evidence upload for other users controls', async ({ client }) => {
    const { control: otherControl } = await setupAuth(client, 'other')
    const { token } = await setupAuth(client, 'unauthorized')

    const response = await client
      .post('/api/v1/evidence')
      .header('Authorization', `Bearer ${token}`)
      .json({
        controlId: otherControl.id,
        fileUrl: 'https://example.com/file.pdf',
        fileName: 'file.pdf',
        fileType: 'application/pdf',
      })

    response.assertStatus(404)
    response.assertBodyContains({ error: 'Control not found' })
  })

  test('GET /evidence - lists evidence for a control', async ({ client, assert }) => {
    const { token, control, user } = await setupAuth(client, 'list')

    await Evidence.create({
      controlId: control.id,
      fileUrl: 'https://example.com/evidence1.pdf',
      fileName: 'evidence1.pdf',
      fileType: 'application/pdf',
      status: 'pending',
      uploadedBy: user.id,
    })

    await Evidence.create({
      controlId: control.id,
      fileUrl: 'https://example.com/evidence2.pdf',
      fileName: 'evidence2.pdf',
      fileType: 'application/pdf',
      status: 'approved',
      uploadedBy: user.id,
    })

    const response = await client
      .get(`/api/v1/evidence?controlId=${control.id}`)
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)
    assert.lengthOf(response.body(), 2)
  })

  test('GET /evidence - requires controlId parameter', async ({ client }) => {
    const { token } = await setupAuth(client, 'nocontrol')

    const response = await client
      .get('/api/v1/evidence')
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(422)
    response.assertBodyContains({ error: 'Validation failed' })
  })

  test('GET /evidence - returns 404 for control from other organization', async ({ client }) => {
    const { control: otherControl } = await setupAuth(client, 'other2')
    const { token } = await setupAuth(client, 'unauthorized2')

    const response = await client
      .get(`/api/v1/evidence?controlId=${otherControl.id}`)
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(404)
    response.assertBodyContains({ error: 'Control not found' })
  })

  test('GET /evidence/:id - returns evidence details', async ({ client }) => {
    const { token, control, user } = await setupAuth(client, 'detail')

    const evidence = await Evidence.create({
      controlId: control.id,
      fileUrl: 'https://example.com/detailed.pdf',
      fileName: 'detailed.pdf',
      fileType: 'application/pdf',
      fileSize: 204800,
      description: 'Detailed evidence document',
      status: 'pending',
      uploadedBy: user.id,
    })

    const response = await client
      .get(`/api/v1/evidence/${evidence.id}`)
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)
    response.assertBodyContains({
      id: evidence.id,
      controlId: control.id,
      fileName: 'detailed.pdf',
      fileSize: 204800,
      description: 'Detailed evidence document',
      status: 'pending',
    })
  })

  test('GET /evidence/:id - returns 404 for non-existent evidence', async ({ client }) => {
    const { token } = await setupAuth(client, 'notfound2')

    const response = await client
      .get('/api/v1/evidence/99999')
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(404)
    response.assertBodyContains({ error: 'Evidence not found' })
  })

  test('GET /evidence/:id - returns 404 for evidence from other organization', async ({ client }) => {
    const { control: otherControl, user: otherUser } = await setupAuth(client, 'other3')
    const otherEvidence = await Evidence.create({
      controlId: otherControl.id,
      fileUrl: 'https://example.com/other.pdf',
      fileName: 'other.pdf',
      fileType: 'application/pdf',
      status: 'pending',
      uploadedBy: otherUser.id,
    })

    const { token } = await setupAuth(client, 'unauthorized3')

    const response = await client
      .get(`/api/v1/evidence/${otherEvidence.id}`)
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(404)
    response.assertBodyContains({ error: 'Evidence not found' })
  })

  test('PUT /evidence/:id - updates evidence description', async ({ client }) => {
    const { token, control, user } = await setupAuth(client, 'update')

    const evidence = await Evidence.create({
      controlId: control.id,
      fileUrl: 'https://example.com/original.pdf',
      fileName: 'original.pdf',
      fileType: 'application/pdf',
      description: 'Original description',
      status: 'pending',
      uploadedBy: user.id,
    })

    const response = await client
      .put(`/api/v1/evidence/${evidence.id}`)
      .header('Authorization', `Bearer ${token}`)
      .json({
        description: 'Updated description',
      })

    response.assertStatus(200)
    response.assertBodyContains({
      description: 'Updated description',
      status: 'pending',
    })
  })

  test('PUT /evidence/:id - updates status to approved with review metadata', async ({ client, assert }) => {
    const { token, control, user } = await setupAuth(client, 'approve')

    const evidence = await Evidence.create({
      controlId: control.id,
      fileUrl: 'https://example.com/toapprove.pdf',
      fileName: 'toapprove.pdf',
      fileType: 'application/pdf',
      status: 'pending',
      uploadedBy: user.id,
    })

    const response = await client
      .put(`/api/v1/evidence/${evidence.id}`)
      .header('Authorization', `Bearer ${token}`)
      .json({
        status: 'approved',
      })

    response.assertStatus(200)
    response.assertBodyContains({
      status: 'approved',
      reviewedBy: user.id,
    })

    const body = response.body()
    assert.isNotNull(body.reviewedAt)
  })

  test('PUT /evidence/:id - updates status to rejected with review metadata', async ({ client, assert }) => {
    const { token, control, user } = await setupAuth(client, 'reject')

    const evidence = await Evidence.create({
      controlId: control.id,
      fileUrl: 'https://example.com/toreject.pdf',
      fileName: 'toreject.pdf',
      fileType: 'application/pdf',
      status: 'pending',
      uploadedBy: user.id,
    })

    const response = await client
      .put(`/api/v1/evidence/${evidence.id}`)
      .header('Authorization', `Bearer ${token}`)
      .json({
        status: 'rejected',
        description: 'Document does not meet requirements',
      })

    response.assertStatus(200)
    response.assertBodyContains({
      status: 'rejected',
      description: 'Document does not meet requirements',
      reviewedBy: user.id,
    })

    const body = response.body()
    assert.isNotNull(body.reviewedAt)
  })

  test('PUT /evidence/:id - validates status', async ({ client }) => {
    const { token, control, user } = await setupAuth(client, 'invalidstatus')

    const evidence = await Evidence.create({
      controlId: control.id,
      fileUrl: 'https://example.com/test.pdf',
      fileName: 'test.pdf',
      fileType: 'application/pdf',
      status: 'pending',
      uploadedBy: user.id,
    })

    const response = await client
      .put(`/api/v1/evidence/${evidence.id}`)
      .header('Authorization', `Bearer ${token}`)
      .json({
        status: 'invalid_status',
      })

    response.assertStatus(422)
    response.assertBodyContains({ error: 'Invalid status' })
  })

  test('PUT /evidence/:id - returns 404 for evidence from other organization', async ({ client }) => {
    const { control: otherControl, user: otherUser } = await setupAuth(client, 'other4')
    const otherEvidence = await Evidence.create({
      controlId: otherControl.id,
      fileUrl: 'https://example.com/other2.pdf',
      fileName: 'other2.pdf',
      fileType: 'application/pdf',
      status: 'pending',
      uploadedBy: otherUser.id,
    })

    const { token } = await setupAuth(client, 'unauthorized4')

    const response = await client
      .put(`/api/v1/evidence/${otherEvidence.id}`)
      .header('Authorization', `Bearer ${token}`)
      .json({
        description: 'Trying to update',
      })

    response.assertStatus(404)
    response.assertBodyContains({ error: 'Evidence not found' })
  })

  test('DELETE /evidence/:id - deletes evidence', async ({ client, assert }) => {
    const { token, control, user } = await setupAuth(client, 'delete')

    const evidence = await Evidence.create({
      controlId: control.id,
      fileUrl: 'https://example.com/todelete.pdf',
      fileName: 'todelete.pdf',
      fileType: 'application/pdf',
      status: 'pending',
      uploadedBy: user.id,
    })

    const response = await client
      .delete(`/api/v1/evidence/${evidence.id}`)
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)
    response.assertBodyContains({ message: 'Evidence deleted successfully' })

    // Verify it was actually deleted
    const deleted = await Evidence.find(evidence.id)
    assert.isNull(deleted)
  })

  test('DELETE /evidence/:id - returns 404 for non-existent evidence', async ({ client }) => {
    const { token } = await setupAuth(client, 'notfound3')

    const response = await client
      .delete('/api/v1/evidence/99999')
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(404)
    response.assertBodyContains({ error: 'Evidence not found' })
  })

  test('DELETE /evidence/:id - returns 404 for evidence from other organization', async ({ client }) => {
    const { control: otherControl, user: otherUser } = await setupAuth(client, 'other5')
    const otherEvidence = await Evidence.create({
      controlId: otherControl.id,
      fileUrl: 'https://example.com/other3.pdf',
      fileName: 'other3.pdf',
      fileType: 'application/pdf',
      status: 'pending',
      uploadedBy: otherUser.id,
    })

    const { token } = await setupAuth(client, 'unauthorized5')

    const response = await client
      .delete(`/api/v1/evidence/${otherEvidence.id}`)
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(404)
    response.assertBodyContains({ error: 'Evidence not found' })
  })
})
