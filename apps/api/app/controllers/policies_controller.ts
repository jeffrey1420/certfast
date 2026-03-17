import { HttpContext } from '@adonisjs/core/http'
import Policy from '#models/policy'
import Organization from '#models/organization'

const VALID_STATUSES = new Set(['draft', 'published', 'archived', 'deprecated'])

export default class PoliciesController {
  async index(ctx: HttpContext) {
    const authUserId = ctx.authUserId
    const organizationId = ctx.request.input('organizationId')

    const query = Policy.query().whereHas('organization', (orgQuery) => {
      orgQuery.where('owner_id', authUserId)
    })

    if (organizationId) {
      query.where('organization_id', Number(organizationId))
    }

    const policies = await query.orderBy('created_at', 'desc')
    return ctx.response.status(200).json(policies)
  }

  async store(ctx: HttpContext) {
    const authUserId = ctx.authUserId
    const { organizationId, title, content, version } = ctx.request.body()

    if (!organizationId || !title || !content) {
      return ctx.response.status(422).json({ 
        error: 'Validation failed',
        message: 'organizationId, title and content are required'
      })
    }

    const org = await Organization.find(Number(organizationId))
    if (!org || org.ownerId !== authUserId) {
      return ctx.response.status(404).json({ error: 'Organization not found' })
    }

    const policy = await Policy.create({
      organizationId: Number(organizationId),
      title,
      content,
      status: 'draft',
      version: version ?? '1.0.0',
    })

    return ctx.response.status(201).json(policy)
  }

  async show(ctx: HttpContext) {
    const authUserId = ctx.authUserId
    const policy = await Policy.find(Number(ctx.params.id))

    if (!policy) {
      return ctx.response.status(404).json({ error: 'Policy not found' })
    }

    const org = await Organization.find(policy.organizationId)
    if (!org || org.ownerId !== authUserId) {
      return ctx.response.status(404).json({ error: 'Policy not found' })
    }

    return ctx.response.status(200).json(policy)
  }

  async update(ctx: HttpContext) {
    const authUserId = ctx.authUserId
    const policy = await Policy.find(Number(ctx.params.id))

    if (!policy) {
      return ctx.response.status(404).json({ error: 'Policy not found' })
    }

    const org = await Organization.find(policy.organizationId)
    if (!org || org.ownerId !== authUserId) {
      return ctx.response.status(404).json({ error: 'Policy not found' })
    }

    const { title, content, status, version } = ctx.request.body()

    if (status !== undefined && !VALID_STATUSES.has(status)) {
      return ctx.response.status(422).json({ 
        error: 'Validation failed',
        message: 'Invalid status value'
      })
    }

    if (title !== undefined) policy.title = title
    if (content !== undefined) policy.content = content
    if (status !== undefined) policy.status = status
    if (version !== undefined) policy.version = version

    await policy.save()

    return ctx.response.status(200).json(policy)
  }

  async destroy(ctx: HttpContext) {
    const authUserId = ctx.authUserId
    const policy = await Policy.find(Number(ctx.params.id))

    if (!policy) {
      return ctx.response.status(404).json({ error: 'Policy not found' })
    }

    const org = await Organization.find(policy.organizationId)
    if (!org || org.ownerId !== authUserId) {
      return ctx.response.status(404).json({ error: 'Policy not found' })
    }

    // Archive instead of hard delete for audit trail
    policy.status = 'archived'
    await policy.save()
    return ctx.response.status(200).json({ message: 'Policy archived successfully' })
  }
}
