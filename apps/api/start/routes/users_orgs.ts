import { HttpContext } from '@adonisjs/core/http'
import router from '@adonisjs/core/services/router'
import UsersController from '../controllers/users_controller.js'
import OrganizationsController from '../controllers/organizations_controller.js'

const usersController = new UsersController()
const organizationsController = new OrganizationsController()

// Users routes
router.get('/users', (ctx: HttpContext) => usersController.index(ctx))
router.get('/users/:id', (ctx: HttpContext) => usersController.show(ctx))
router.put('/users/:id', (ctx: HttpContext) => usersController.update(ctx))

// Organizations routes
router.get('/organizations', (ctx: HttpContext) => organizationsController.index(ctx))
router.post('/organizations', (ctx: HttpContext) => organizationsController.store(ctx))
router.get('/organizations/:id', (ctx: HttpContext) => organizationsController.show(ctx))
router.put('/organizations/:id', (ctx: HttpContext) => organizationsController.update(ctx))
