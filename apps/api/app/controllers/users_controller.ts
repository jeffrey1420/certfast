import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

function parseUserId(raw: string) {
  const userId = Number.parseInt(raw, 10)
  return Number.isNaN(userId) ? null : userId
}

function serializeUser(user: User) {
  return {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
    isActive: user.isActive,
    avatarUrl: user.avatarUrl,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }
}

export default class UsersController {
  async me(ctx: HttpContext) {
    const { response } = ctx
    const authUserId = (ctx as any).authUserId as number | undefined
    if (!authUserId) {
      return response.status(401).json({ error: 'Unauthorized' })
    }

    const user = await User.find(authUserId)
    if (!user) {
      return response.status(404).json({ error: 'User not found' })
    }

    return response.status(200).json(serializeUser(user))
  }

  async updateMe(ctx: HttpContext) {
    const { request, response } = ctx
    const authUserId = (ctx as any).authUserId as number | undefined
    if (!authUserId) {
      return response.status(401).json({ error: 'Unauthorized' })
    }

    const user = await User.find(authUserId)
    if (!user) {
      return response.status(404).json({ error: 'User not found' })
    }

    const { fullName, avatarUrl } = request.body()

    if (fullName !== undefined) user.fullName = fullName
    if (avatarUrl !== undefined) user.avatarUrl = avatarUrl

    await user.save()
    return response.status(200).json(serializeUser(user))
  }

  /**
   * List all users (paginated)
   */
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 20)

    const users = await User.query()
      .select(['id', 'email', 'full_name', 'role', 'is_active', 'avatar_url', 'created_at', 'updated_at'])
      .paginate(page, limit)

    return response.status(200).json(users)
  }

  /**
   * Get user by ID
   */
  async show({ params, response }: HttpContext) {
    const userId = parseUserId(params.id)

    if (!userId) {
      return response.status(400).json({ error: 'Invalid user ID' })
    }

    const user = await User.find(userId)

    if (!user) {
      return response.status(404).json({ error: 'User not found' })
    }

    return response.status(200).json(serializeUser(user))
  }

  /**
   * Update user
   */
  async update({ params, request, response }: HttpContext) {
    const userId = parseUserId(params.id)

    if (!userId) {
      return response.status(400).json({ error: 'Invalid user ID' })
    }

    const user = await User.find(userId)

    if (!user) {
      return response.status(404).json({ error: 'User not found' })
    }

    const { fullName, email, role, isActive, avatarUrl } = request.body()

    if (fullName !== undefined) user.fullName = fullName
    if (email !== undefined) user.email = email
    if (role !== undefined) user.role = role
    if (isActive !== undefined) user.isActive = isActive
    if (avatarUrl !== undefined) user.avatarUrl = avatarUrl

    await user.save()

    return response.status(200).json(serializeUser(user))
  }

  /**
   * Delete user
   */
  async destroy({ params, response }: HttpContext) {
    const userId = parseUserId(params.id)

    if (!userId) {
      return response.status(400).json({ error: 'Invalid user ID' })
    }

    const user = await User.find(userId)

    if (!user) {
      return response.status(404).json({ error: 'User not found' })
    }

    await user.delete()

    return response.status(204).send('')
  }
}
