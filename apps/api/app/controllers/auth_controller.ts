import { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import User from '#models/user'
import { extractBearerToken, issueTokenForUser, resolveUserIdFromToken, revokeToken } from '#services/token_store'

async function getAuthenticatedUser(ctx: HttpContext) {
  const userIdFromMiddleware = (ctx as any).authUserId as number | undefined
  if (userIdFromMiddleware) {
    return User.find(userIdFromMiddleware)
  }

  const token = extractBearerToken(ctx.request.header('authorization'))
  if (!token) return null

  const userId = resolveUserIdFromToken(token)
  if (!userId) return null

  return User.find(userId)
}

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const { email, password, fullName } = request.body()

    if (!email || !password) {
      return response.status(422).json({
        error: 'Validation failed',
        message: 'Email and password required',
      })
    }

    const existingUser = await User.findBy('email', email)
    if (existingUser) {
      return response.status(422).json({ error: 'User already exists' })
    }

    const user = await User.create({
      email,
      password: await hash.make(password),
      fullName: fullName ?? null,
      role: 'user',
      isActive: true,
    })

    return response.status(201).json({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    })
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = request.body()

    if (!email || !password) {
      return response.status(422).json({
        error: 'Validation failed',
        message: 'Email and password required',
      })
    }

    const user = await User.findBy('email', email)
    if (!user) {
      return response.status(401).json({ error: 'Invalid credentials' })
    }

    const passwordOk = await hash.verify(user.password, password)
    if (!passwordOk) {
      return response.status(401).json({ error: 'Invalid credentials' })
    }

    const token = issueTokenForUser(user.id)

    return response.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    })
  }

  async me(ctx: HttpContext) {
    const user = await getAuthenticatedUser(ctx)
    if (!user) {
      return ctx.response.status(401).json({ error: 'Unauthorized' })
    }

    return ctx.response.status(200).json({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    })
  }

  async logout(ctx: HttpContext) {
    const token = extractBearerToken(ctx.request.header('authorization'))
    if (!token) {
      return ctx.response.status(401).json({ error: 'Unauthorized' })
    }

    revokeToken(token)
    return ctx.response.status(200).json({ message: 'Logged out successfully' })
  }
}
