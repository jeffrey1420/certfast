import { test } from '@japa/runner'

test.group('Health', () => {
  test('health endpoint returns ok', async ({ client, assert }) => {
    const response = await client.get('/health')
    
    response.assertStatus(200)
    response.assertBodyContains({ status: 'ok' })
    assert.exists(response.body().timestamp)
    assert.equal(response.body().service, 'certfast-api')
  })

  test('root endpoint returns hello world', async ({ client }) => {
    const response = await client.get('/')
    
    response.assertStatus(200)
    response.assertBodyContains({ hello: 'world' })
    response.assertBodyContains({ app: 'certfast-api' })
  })
})
