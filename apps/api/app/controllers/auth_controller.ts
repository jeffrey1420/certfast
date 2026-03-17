import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import {
  extractBearerToken,
  issueTokenForUser,
  resolveUserIdFromToken,
  revokeToken,
} from '#services/token_store'

async function getAuthenticatedUser(ctx: HttpContext) {
  const userIdFromMiddleware = ctx.authUserId ?? undefined
  if (userIdFromMiddleware) {
    return User.find(userIdFromMiddleware)
  }

  const token = extractBearerToken(ctx.request.header('authorization'))
  if (!token) return null

  const userId = await resolveUserIdFromToken(token)
  if (!userId) return null

  return User.find(userId)
}

function toPublicUser(user: User) {
  return {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
  }
}

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const { email, password, fullName, firstName, lastName } = request.body()

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

    const joinedName = [firstName, lastName]
      .filter((part) => typeof part === 'string' && part.trim())
      .join(' ')
    const computedFullName = fullName ?? (joinedName || null)

    const user = await User.create({
      email,
      password,
      fullName: computedFullName,
      role: 'user',
      isActive: true,
    })

    const token = await issueTokenForUser(user.id)

    return response.status(201).json({
      token,
      user: toPublicUser(user),
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

    const passwordOk = await user.verifyPassword(password)
    if (!passwordOk) {
      return response.status(401).json({ error: 'Invalid credentials' })
    }

    const token = await issueTokenForUser(user.id)

    return response.status(200).json({
      token,
      user: toPublicUser(user),
    })
  }

  async me(ctx: HttpContext) {
    const user = await getAuthenticatedUser(ctx)
    if (!user) {
      return ctx.response.status(401).json({ error: 'Unauthorized' })
    }

    return ctx.response.status(200).json(toPublicUser(user))
  }

  async logout(ctx: HttpContext) {
    const token = extractBearerToken(ctx.request.header('authorization'))
    if (!token) {
      return ctx.response.status(401).json({ error: 'Unauthorized' })
    }

    await revokeToken(token)
    return ctx.response.status(200).json({ message: 'Logged out successfully' })
  }
}
