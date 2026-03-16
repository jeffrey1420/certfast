import { HttpContext } from '@adonisjs/core/http'

// Import shared stores from auth controller
import { users, tokens } from './auth_controller.js'

export default class UsersController {
  /**
   * List all users
   */
  async index({ request, response }: HttpContext) {
    // Check auth
    const authHeader = request.header('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return response.status(401).json({ error: 'Unauthorized' })
    }

    const token = authHeader.substring(7)
    if (!tokens.has(token)) {
      return response.status(401).json({ error: 'Unauthorized' })
    }

    // Return all users (exclude password)
    const userList = Array.from(users.values()).map(user => ({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }))

    return response.status(200).json(userList)
  }

  /**
   * Get user by ID
   */
  async show({ request, response, params }: HttpContext) {
    // Check auth
    const authHeader = request.header('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return response.status(401).json({ error: 'Unauthorized' })
    }

    const token = authHeader.substring(7)
    if (!tokens.has(token)) {
      return response.status(401).json({ error: 'Unauthorized' })
    }

    const userId = parseInt(params.id)
    const user = users.get(userId)

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
      updatedAt: user.updatedAt
    })
  }

  /**
   * Update user
   */
  async update({ request, response, params }: HttpContext) {
    // Check auth
    const authHeader = request.header('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return response.status(401).json({ error: 'Unauthorized' })
    }

    const token = authHeader.substring(7)
    if (!tokens.has(token)) {
      return response.status(401).json({ error: 'Unauthorized' })
    }

    const userId = parseInt(params.id)
    const user = users.get(userId)

    if (!user) {
      return response.status(404).json({ error: 'User not found' })
    }

    const { fullName, email, role, isActive } = request.body()

    // Update fields if provided
    if (fullName !== undefined) user.fullName = fullName
    if (email !== undefined) user.email = email
    if (role !== undefined) user.role = role
    if (isActive !== undefined) user.isActive = isActive
    
    user.updatedAt = new Date().toISOString()

    return response.status(200).json({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    })
  }
}
