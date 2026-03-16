import { test } from '@japa/runner'
import User from '#models/user'
import Organization from '#models/organization'
import Assessment from '#models/assessment'
import { resetDatabase } from './helpers.js'

test.group('Dashboard Activity', (group) => {
  group.each.setup(async () => {
    await resetDatabase()
  })

  async function setupAuth(client: any, suffix: string) {
    const user = await User.create({
      email: `dashboard_${suffix}_${Date.now()}@example.com`,
      password: 'password123',
      fullName: 'Dashboard User',
    })

    const org = await Organization.create({
      name: `Dashboard Org ${suffix}`,
      slug: `dashboard-org-${suffix}-${Date.now()}`,
      ownerId: user.id,
    })

    const loginRes = await client.post('/api/v1/auth/login').json({
      email: user.email,
      password: 'password123',
    })

    return { token: loginRes.body().token, org }
  }

  test('GET /dashboard/activity - returns latest owned assessment activity', async ({ client, assert }) => {
    const { token, org } = await setupAuth(client, 'owner')

    const completed = await Assessment.create({
      organizationId: org.id,
      title: 'SOC 2 Type 1',
      type: 'soc2_type1',
      status: 'completed',
    })

    const active = await Assessment.create({
      organizationId: org.id,
      title: 'ISO 27001',
      type: 'iso27001',
      status: 'active',
    })

    await completed.merge({ title: 'SOC 2 Type 1 (done)' }).save()

    const response = await client
      .get('/api/v1/dashboard/activity')
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)

    const body = response.body()
    assert.lengthOf(body, 2)
    assert.equal(body[0].id, completed.id)
    assert.equal(body[0].type, 'assessment_completed')
    assert.equal(body[0].title, 'SOC 2 Type 1 (done)')
    assert.equal(body[1].id, active.id)
    assert.equal(body[1].type, 'audit_scheduled')
    assert.isString(body[0].occurredAt)
  })

  test('GET /dashboard/activity - excludes assessments from other users', async ({ client, assert }) => {
    const { token, org } = await setupAuth(client, 'viewer')
    const { org: otherOrg } = await setupAuth(client, 'other')

    await Assessment.create({
      organizationId: org.id,
      title: 'Mine',
      type: 'gdpr',
      status: 'draft',
    })

    await Assessment.create({
      organizationId: otherOrg.id,
      title: 'Not Mine',
      type: 'hipaa',
      status: 'completed',
    })

    const response = await client
      .get('/api/v1/dashboard/activity')
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)
    const body = response.body()
    assert.lengthOf(body, 1)
    assert.equal(body[0].title, 'Mine')
  })
})
