import { HttpContext } from '@adonisjs/core/http'
import router from '@adonisjs/core/services/router'

// Import auth routes
import './routes/auth.js'

// Import users and organizations routes
import './routes/users_orgs.js'

router.get('/', async ({ response }: HttpContext) => {
  return response.json({ hello: 'world', app: 'certfast-api' })
})

router.get('/health', async ({ response }: HttpContext) => {
  return response.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'certfast-api'
  })
})
