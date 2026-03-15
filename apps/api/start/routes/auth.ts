import { HttpContext } from '@adonisjs/core/http'
import router from '@adonisjs/core/services/router'
import AuthController from '../controllers/auth_controller.js'

const authController = new AuthController()

router.post('/auth/register', (ctx: HttpContext) => authController.register(ctx))
router.post('/auth/login', (ctx: HttpContext) => authController.login(ctx))
router.post('/auth/logout', (ctx: HttpContext) => authController.logout(ctx))
router.get('/auth/me', (ctx: HttpContext) => authController.me(ctx))
