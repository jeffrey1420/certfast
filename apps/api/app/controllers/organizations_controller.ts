import { HttpContext } from '@adonisjs/core/http'
import Organization from '#models/organization'
import User from '#models/user'

export default class OrganizationsController {
  async index(ctx: HttpContext) {
    const authUserId = (ctx as any).authUserId as number

    const organizations = await Organization.query()
      .where('owner_id', authUserId)
      .orWhereHas('members', (query) => {
        query.where('user_id', authUserId)
      })
      .select(['id', 'name', 'slug', 'plan', 'status', 'created_at'])
      .orderBy('created_at', 'desc')

    return ctx.response.status(200).json(organizations)
  }

  async store(ctx: HttpContext) {
    const authUserId = (ctx as any).authUserId as number
    const { name, slug, description } = ctx.request.body()

    if (!name || !slug) {
      return ctx.response.status(422).json({
        error: 'Validation failed',
        message: 'Name and slug are required',
      })
    }

    if (!/^[a-z0-9-]+$/.test(slug)) {
      return ctx.response.status(422).json({
        error: 'Validation failed',
        message: 'Slug must contain only lowercase letters, numbers, and hyphens',
      })
    }

    const existing = await Organization.findBy('slug', slug)
    if (existing) {
      return ctx.response.status(422).json({ error: 'Slug already taken' })
    }

    const organization = await Organization.create({
      name,
      slug,
      description: description ?? null,
      ownerId: authUserId,
      plan: 'free',
      status: 'active',
    })

    return ctx.response.status(201).json({
      id: organization.id,
      name: organization.name,
      slug: organization.slug,
      description: organization.description,
      plan: organization.plan,
      status: organization.status,
      ownerId: organization.ownerId,
      createdAt: organization.createdAt,
    })
  }

  async show(ctx: HttpContext) {
    const orgId = Number(ctx.params.id)
    if (Number.isNaN(orgId)) {
      return ctx.response.status(400).json({ error: 'Invalid organization ID' })
    }

    const organization = await Organization.find(orgId)
    if (!organization) {
      return ctx.response.status(404).json({ error: 'Organization not found' })
    }

    await organization.load('owner')

    return ctx.response.status(200).json({
      id: organization.id,
      name: organization.name,
      slug: organization.slug,
      description: organization.description,
      plan: organization.plan,
      status: organization.status,
      owner: {
        id: organization.owner.id,
        email: organization.owner.email,
        fullName: organization.owner.fullName,
      },
      createdAt: organization.createdAt,
      updatedAt: organization.updatedAt,
    })
  }

  async update(ctx: HttpContext) {
    const authUserId = (ctx as any).authUserId as number
    const user = await User.find(authUserId)
    const orgId = Number(ctx.params.id)

    if (Number.isNaN(orgId)) {
      return ctx.response.status(400).json({ error: 'Invalid organization ID' })
    }

    const organization = await Organization.find(orgId)
    if (!organization) {
      return ctx.response.status(404).json({ error: 'Organization not found' })
    }

    if (organization.ownerId !== authUserId && user?.role !== 'admin') {
      return ctx.response.status(403).json({ error: 'Forbidden' })
    }

    const { name, description, plan, status } = ctx.request.body()

    if (name !== undefined) organization.name = name
    if (description !== undefined) organization.description = description
    if (plan !== undefined && user?.role === 'admin') organization.plan = plan
    if (status !== undefined && user?.role === 'admin') organization.status = status

    await organization.save()

    return ctx.response.status(200).json({
      id: organization.id,
      name: organization.name,
      slug: organization.slug,
      description: organization.description,
      plan: organization.plan,
      status: organization.status,
      updatedAt: organization.updatedAt,
    })
  }

  async destroy(ctx: HttpContext) {
    const authUserId = (ctx as any).authUserId as number
    const user = await User.find(authUserId)
    const orgId = Number(ctx.params.id)

    if (Number.isNaN(orgId)) {
      return ctx.response.status(400).json({ error: 'Invalid organization ID' })
    }

    const organization = await Organization.find(orgId)
    if (!organization) {
      return ctx.response.status(404).json({ error: 'Organization not found' })
    }

    if (organization.ownerId !== authUserId && user?.role !== 'admin') {
      return ctx.response.status(403).json({ error: 'Forbidden' })
    }

    await organization.delete()
    return ctx.response.status(204).send('')
  }
}
