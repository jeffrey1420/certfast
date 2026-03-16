import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { extractBearerToken, resolveUserIdFromToken } from '#services/token_store'

const PUBLIC_ROUTES = new Set([
  '/',
  '/health',
  '/api/v1/auth/register',
  '/api/v1/auth/login',
])

export default class AuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    if (PUBLIC_ROUTES.has(ctx.request.url())) {
      return next()
    }

    const token = extractBearerToken(ctx.request.header('authorization'))
    if (!token) {
      return ctx.response.status(401).json({ error: 'Unauthorized' })
    }

    const userId = await resolveUserIdFromToken(token)
    if (!userId) {
      return ctx.response.status(401).json({ error: 'Unauthorized' })
    }

    ;(ctx as any).authUserId = userId
    ;(ctx as any).authToken = token

    return next()
  }
}
