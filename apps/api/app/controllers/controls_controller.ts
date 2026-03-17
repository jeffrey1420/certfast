import { HttpContext } from '@adonisjs/core/http'
import Control from '#models/control'
import Organization from '#models/organization'

const VALID_STATUSES = new Set(['draft', 'active', 'archived', 'deprecated'])

export default class ControlsController {
  async index(ctx: HttpContext) {
    const authUserId = ctx.authUserId
    const organizationId = ctx.request.input('organizationId')

    const query = Control.query().whereHas('organization', (orgQuery) => {
      orgQuery.where('owner_id', authUserId)
    })

    if (organizationId) {
      query.where('organization_id', Number(organizationId))
    }

    const controls = await query.orderBy('created_at', 'desc')
    return ctx.response.status(200).json(controls)
  }

  async store(ctx: HttpContext) {
    const authUserId = ctx.authUserId
    const { organizationId, title, description, category, code, status } = ctx.request.body()

    if (!organizationId || !title || !category || !code) {
      return ctx.response.status(422).json({ 
        error: 'Validation failed',
        message: 'organizationId, title, category and code are required'
      })
    }

    // Validate status if provided
    if (status !== undefined && !VALID_STATUSES.has(status)) {
      return ctx.response.status(422).json({ 
        error: 'Validation failed',
        message: 'Invalid status value'
      })
    }

    const org = await Organization.find(Number(organizationId))
    if (!org || org.ownerId !== authUserId) {
      return ctx.response.status(404).json({ error: 'Organization not found' })
    }

    const existingControl = await Control.findBy('code', code)
    if (existingControl) {
      return ctx.response.status(422).json({ error: 'Control code already exists' })
    }

    const control = await Control.create({
      organizationId: Number(organizationId),
      title,
      description: description ?? null,
      category,
      code,
      status: status ?? 'draft',
    })

    return ctx.response.status(201).json(control)
  }

  async show(ctx: HttpContext) {
    const authUserId = ctx.authUserId
    const control = await Control.find(Number(ctx.params.id))

    if (!control) {
      return ctx.response.status(404).json({ error: 'Control not found' })
    }

    const org = await Organization.find(control.organizationId)
    if (!org || org.ownerId !== authUserId) {
      return ctx.response.status(404).json({ error: 'Control not found' })
    }

    return ctx.response.status(200).json(control)
  }

  async update(ctx: HttpContext) {
    const authUserId = ctx.authUserId
    const control = await Control.find(Number(ctx.params.id))

    if (!control) {
      return ctx.response.status(404).json({ error: 'Control not found' })
    }

    const org = await Organization.find(control.organizationId)
    if (!org || org.ownerId !== authUserId) {
      return ctx.response.status(404).json({ error: 'Control not found' })
    }

    const { title, description, category, status, code } = ctx.request.body()

    if (status !== undefined && !VALID_STATUSES.has(status)) {
      return ctx.response.status(422).json({ 
        error: 'Validation failed',
        message: 'Invalid status value'
      })
    }

    if (code !== undefined && code !== control.code) {
      const existingControl = await Control.findBy('code', code)
      if (existingControl) {
        return ctx.response.status(422).json({ error: 'Control code already exists' })
      }
      control.code = code
    }

    if (title !== undefined) control.title = title
    if (description !== undefined) control.description = description
    if (category !== undefined) control.category = category
    if (status !== undefined) control.status = status

    await control.save()

    return ctx.response.status(200).json(control)
  }

  async destroy(ctx: HttpContext) {
    const authUserId = ctx.authUserId
    const control = await Control.find(Number(ctx.params.id))

    if (!control) {
      return ctx.response.status(404).json({ error: 'Control not found' })
    }

    const org = await Organization.find(control.organizationId)
    if (!org || org.ownerId !== authUserId) {
      return ctx.response.status(404).json({ error: 'Control not found' })
    }

    // Archive instead of hard delete for audit trail
    control.status = 'archived'
    await control.save()
    return ctx.response.status(200).json({ message: 'Control archived successfully' })
  }
}
