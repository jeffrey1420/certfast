import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

router.get('/', async () => ({ hello: 'world', app: 'certfast-api' }))
router.get('/health', async () => ({ status: 'ok', service: 'certfast-api', timestamp: new Date().toISOString() }))

router
  .group(() => {
    router.post('/auth/register', '#controllers/auth_controller.register')
    router.post('/auth/login', '#controllers/auth_controller.login')
  })
  .prefix('/api/v1')

router
  .group(() => {
    router.get('/auth/me', '#controllers/auth_controller.me')
    router.post('/auth/logout', '#controllers/auth_controller.logout')

    router.get('/users/me', '#controllers/users_controller.me')
    router.put('/users/me', '#controllers/users_controller.updateMe')
    router.get('/users', '#controllers/users_controller.index')
    router.get('/users/:id', '#controllers/users_controller.show')
    router.put('/users/:id', '#controllers/users_controller.update')
    router.delete('/users/:id', '#controllers/users_controller.destroy')

    router.get('/organizations', '#controllers/organizations_controller.index')
    router.post('/organizations', '#controllers/organizations_controller.store')
    router.get('/organizations/:id', '#controllers/organizations_controller.show')
    router.put('/organizations/:id', '#controllers/organizations_controller.update')
    router.delete('/organizations/:id', '#controllers/organizations_controller.destroy')

    router.get('/assessments', '#controllers/assessments_controller.index')
    router.post('/assessments', '#controllers/assessments_controller.store')
    router.get('/assessments/:id', '#controllers/assessments_controller.show')
    router.put('/assessments/:id', '#controllers/assessments_controller.update')
    router.delete('/assessments/:id', '#controllers/assessments_controller.destroy')

    router.get('/controls', '#controllers/controls_controller.index')
    router.post('/controls', '#controllers/controls_controller.store')
    router.get('/controls/:id', '#controllers/controls_controller.show')
    router.put('/controls/:id', '#controllers/controls_controller.update')
    router.delete('/controls/:id', '#controllers/controls_controller.destroy')

    router.get('/policies', '#controllers/policies_controller.index')
    router.post('/policies', '#controllers/policies_controller.store')
    router.get('/policies/:id', '#controllers/policies_controller.show')
    router.put('/policies/:id', '#controllers/policies_controller.update')
    router.delete('/policies/:id', '#controllers/policies_controller.destroy')

    router.get('/dashboard/activity', '#controllers/dashboard_controller.activity')
  })
  .use(middleware.auth())
  .prefix('/api/v1')
