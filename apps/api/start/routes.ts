import app from '@adonisjs/core/services/app'
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return { hello: 'world', app: 'certfast-api' }
})

router.get('/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() }
})
