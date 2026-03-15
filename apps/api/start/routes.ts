import app from '@adonisjs/core/services/app'
import router from '@adonisjs/core/services/router'
import AuthController from '../app/controllers/auth_controller.js'

router.get('/', async () => {
  return { hello: 'world', app: 'certfast-api' }
})

router.get('/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() }
})

// Auth routes
router.post('/auth/register', async (ctx) => new AuthController().register(ctx))
router.post('/auth/login', async (ctx) => new AuthController().login(ctx))
router.post('/auth/logout', async (ctx) => new AuthController().logout(ctx))
router.get('/auth/me', async (ctx) => new AuthController().me(ctx))
