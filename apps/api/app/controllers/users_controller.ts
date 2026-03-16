import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class UsersController {
  /**
   * List all users (paginated)
   */
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 20)
    
    const users = await User.query()
      .select(['id', 'email', 'full_name', 'role', 'is_active', 'created_at', 'updated_at'])
      .paginate(page, limit)

    return response.status(200).json(users)
  }

  /**
   * Get user by ID
   */
  async show({ params, response }: HttpContext) {
    const userId = parseInt(params.id)
    
    if (isNaN(userId)) {
      return response.status(400).json({ error: 'Invalid user ID' })
    }

    const user = await User.find(userId)

    if (!user) {
      return response.status(404).json({ error: 'User not found' })
    }

    return response.status(200).json({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })
  }

  /**
   * Update user
   */
  async update({ params, request, response }: HttpContext) {
    const userId = parseInt(params.id)
    
    if (isNaN(userId)) {
      return response.status(400).json({ error: 'Invalid user ID' })
    }

    const user = await User.find(userId)

    if (!user) {
      return response.status(404).json({ error: 'User not found' })
    }

    const { fullName, email, role, isActive } = request.body()

    // Update fields if provided
    if (fullName !== undefined) user.fullName = fullName
    if (email !== undefined) user.email = email
    if (role !== undefined) user.role = role
    if (isActive !== undefined) user.isActive = isActive
    
    await user.save()

    return response.status(200).json({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })
  }

  /**
   * Delete user
   */
  async destroy({ params, response }: HttpContext) {
    const userId = parseInt(params.id)
    
    if (isNaN(userId)) {
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