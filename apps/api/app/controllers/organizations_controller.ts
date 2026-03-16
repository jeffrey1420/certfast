import { HttpContext } from '@adonisjs/core/http'
import { tokens } from './auth_controller.js'

// In-memory organizations store
const organizations: Map<number, any> = new Map()
let orgIdCounter = 1

export { organizations }

export default class OrganizationsController {
  /**
   * List all organizations
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

    const orgList = Array.from(organizations.values())
    return response.status(200).json(orgList)
  }

  /**
   * Create new organization
   */
  async store({ request, response }: HttpContext) {
    // Check auth
    const authHeader = request.header('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return response.status(401).json({ error: 'Unauthorized' })
    }

    const token = authHeader.substring(7)
    if (!tokens.has(token)) {
      return response.status(401).json({ error: 'Unauthorized' })
    }

    const { name, description } = request.body()

    // Validation
    if (!name) {
      return response.status(422).json({ error: 'Name is required' })
    }

    const org = {
      id: orgIdCounter++,
      name,
      description: description || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    organizations.set(org.id, org)

    return response.status(201).json(org)
  }

  /**
   * Get organization by ID
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

    const orgId = parseInt(params.id)
    const org = organizations.get(orgId)

    if (!org) {
      return response.status(404).json({ error: 'Organization not found' })
    }

    return response.status(200).json(org)
  }

  /**
   * Update organization
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

    const orgId = parseInt(params.id)
    const org = organizations.get(orgId)

    if (!org) {
      return response.status(404).json({ error: 'Organization not found' })
    }

    const { name, description } = request.body()

    // Update fields if provided
    if (name !== undefined) org.name = name
    if (description !== undefined) org.description = description
    
    org.updatedAt = new Date().toISOString()

    return response.status(200).json(org)
  }
}
