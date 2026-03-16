import { HttpContext } from '@adonisjs/core/http'
import { createHash, randomBytes } from 'node:crypto'

// Simple in-memory user store for now (will be replaced with DB)
export const users: Map<number, any> = new Map()
export const tokens: Map<string, number> = new Map()
let userIdCounter = 1

export default class AuthController {
  /**
   * Register a new user
   */
  async register({ request, response }: HttpContext) {
    const { email, password, fullName } = request.body()

    // Validation
    if (!email || !password) {
      return response.status(422).json({ 
        error: 'Validation failed', 
        message: 'Email and password required' 
      })
    }

    // Check if user exists
    for (const user of users.values()) {
      if (user.email === email) {
        return response.status(422).json({ 
          error: 'User already exists' 
        })
      }
    }

    // Hash password
    const hashedPassword = createHash('sha256').update(password).digest('hex')

    // Create user
    const user = {
      id: userIdCounter++,
      email,
      password: hashedPassword,
      fullName: fullName || null,
      role: 'user',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    users.set(user.id, user)

    return response.status(201).json({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role
    })
  }

  /**
   * Login user
   */
  async login({ request, response }: HttpContext) {
    const { email, password } = request.body()

    if (!email || !password) {
      return response.status(422).json({ 
        error: 'Validation failed', 
        message: 'Email and password required' 
      })
    }

    // Find user
    let user: any = null
    for (const u of users.values()) {
      if (u.email === email) {
        user = u
        break
      }
    }

    if (!user) {
      return response.status(401).json({ 
        error: 'Invalid credentials' 
      })
    }

    // Verify password
    const hashedPassword = createHash('sha256').update(password).digest('hex')
    if (user.password !== hashedPassword) {
      return response.status(401).json({ 
        error: 'Invalid credentials' 
      })
    }

    // Generate token
    const token = randomBytes(32).toString('hex')
    tokens.set(token, user.id)

    return response.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role
      }
    })
  }

  /**
   * Get current user
   */
  async me({ request, response }: HttpContext) {
    const authHeader = request.header('authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return response.status(401).json({ 
        error: 'Unauthorized' 
      })
    }

    const token = authHeader.substring(7)
    const userId = tokens.get(token)

    if (!userId) {
      return response.status(401).json({ 
        error: 'Unauthorized' 
      })
    }

    const user = users.get(userId)

    if (!user) {
      return response.status(401).json({ 
        error: 'Unauthorized' 
      })
    }

    return response.status(200).json({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role
    })
  }

  /**
   * Logout user
   */
  async logout({ request, response }: HttpContext) {
    const authHeader = request.header('authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return response.status(401).json({ 
        error: 'Unauthorized' 
      })
    }

    const token = authHeader.substring(7)
    tokens.delete(token)

    return response.status(200).json({ 
      message: 'Logged out successfully' 
    })
  }
}
