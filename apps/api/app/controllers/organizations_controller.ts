import { HttpContext } from '@adonisjs/core/http'

// In-memory stores
const organizations: Map<number, any> = new Map()
const tokens: Map<string, number> = new Map()
const users: Map<number, any> = new Map()
let orgIdCounter = 1

export default class OrganizationsController {
  /**
   * List all organizations
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

    // Return all organizations
    const orgList = Array.from(organizations.values())
    return response.status(200).json(orgList)
  }

  /**
   * Create new organization
   */
  async store({ request, response }: HttpContext) {
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

    const { name, slug, plan, settings } = request.body()

    // Validation
    if (!name || !slug) {
      return response.status(422).json({
        error: 'Validation failed',
        message: 'Name and slug are required'
      })
    }

    // Check for duplicate slug
    for (const org of organizations.values()) {
      if (org.slug === slug) {
        return response.status(422).json({
          error: 'Organization already exists',
          message: 'Slug must be unique'
        })
      }
    }

    // Create organization
    const organization = {
      id: orgIdCounter++,
      name,
      slug,
      plan: plan || 'free',
      settings: settings || {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    organizations.set(organization.id, organization)

    return response.status(201).json(organization)
  }

  /**
   * Get single organization by ID
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
    const organization = organizations.get(id)

    if (!organization) {
      return response.status(404).json({ error: 'Organization not found' })
    }

    return response.status(200).json(organization)
  }

  /**
   * Update organization
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
    const organization = organizations.get(id)

    if (!organization) {
      return response.status(404).json({ error: 'Organization not found' })
    }

    const { name, slug, plan, settings } = request.body()

    if (name !== undefined) organization.name = name
    if (slug !== undefined) organization.slug = slug
    if (plan !== undefined) organization.plan = plan
    if (settings !== undefined) organization.settings = settings
    organization.updatedAt = new Date().toISOString()

    return response.status(200).json(organization)
  }

  // Helper method to sync token with auth controller
  static addToken(token: string, userId: number) {
    tokens.set(token, userId)
  }
}
