import { HttpContext } from '@adonisjs/core/http'
import { createHash, randomBytes } from 'node:crypto'

// In-memory stores
const users: Map<number, any> = new Map()
const tokens: Map<string, number> = new Map()
let userIdCounter = 1

export default class UsersController {
  /**
   * List all users
   */
  async index({ request, response }: HttpContext) {
    // Check authentication
    const authHeader = request.header('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return response.status(401).json({ error: 'Unauthorized' })
    }

    const token = authHeader.substring(7)
    const userId = tokens.get(token)
    if (!userId) {
      return response.status(401).json({ error: 'Unauthorized' })
    }

    // Return all users (excluding passwords)
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
   * Get single user by ID
   */
  async show({ request, response, params }: HttpContext) {
    // Check authentication
    const authHeader = request.header('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return response.status(401).json({ error: 'Unauthorized' })
    }

    const token = authHeader.substring(7)
    const userId = tokens.get(token)
    if (!userId) {
      return response.status(401).json({ error: 'Unauthorized' })
    }

    const id = parseInt(params.id)
    const user = users.get(id)

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
    // Check authentication
    const authHeader = request.header('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return response.status(401).json({ error: 'Unauthorized' })
    }

    const token = authHeader.substring(7)
    const userId = tokens.get(token)
    if (!userId) {
      return response.status(401).json({ error: 'Unauthorized' })
    }

    const id = parseInt(params.id)
    const user = users.get(id)

    if (!user) {
      return response.status(404).json({ error: 'User not found' })
    }

    const { fullName, role, isActive } = request.body()

    if (fullName !== undefined) user.fullName = fullName
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

  // Helper method to add user from auth controller
  static addUser(user: any) {
    users.set(user.id, user)
    if (user.id >= userIdCounter) userIdCounter = user.id + 1
  }

  // Helper method to add token
  static addToken(token: string, userId: number) {
    tokens.set(token, userId)
  }

  // Helper method to get user by token
  static getUserByToken(token: string) {
    const userId = tokens.get(token)
    return userId ? users.get(userId) : null
  }
}
