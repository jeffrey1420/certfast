import { HttpContext } from '@adonisjs/core/http'
import Assessment from '#models/assessment'
import Organization from '#models/organization'

const VALID_TYPES = new Set(['soc2_type1', 'soc2_type2', 'iso27001', 'gdpr', 'hipaa', 'custom'])
const VALID_STATUSES = new Set(['draft', 'active', 'in_review', 'completed', 'archived'])

export default class AssessmentsController {
  async index(ctx: HttpContext) {
    const authUserId = (ctx as any).authUserId as number
    const organizationId = ctx.request.input('organizationId')

    const query = Assessment.query().whereHas('organization', (orgQuery) => {
      orgQuery.where('owner_id', authUserId)
    })

    if (organizationId) {
      query.where('organization_id', Number(organizationId))
    }

    const assessments = await query.orderBy('created_at', 'desc')
    return ctx.response.status(200).json(assessments)
  }

  async store(ctx: HttpContext) {
    const authUserId = (ctx as any).authUserId as number
    const { organizationId, title, type, description, dueDate } = ctx.request.body()

    if (!organizationId || !title || !type) {
      return ctx.response.status(422).json({ error: 'Validation failed' })
    }

    if (!VALID_TYPES.has(type)) {
      return ctx.response.status(422).json({ error: 'Validation failed' })
    }

    const org = await Organization.find(Number(organizationId))
    if (!org || org.ownerId !== authUserId) {
      return ctx.response.status(404).json({ error: 'Organization not found' })
    }

    const assessment = await Assessment.create({
      organizationId: Number(organizationId),
      title,
      type,
      status: 'draft',
      description: description ?? null,
      dueDate: dueDate ?? null,
      metadata: {},
    })

    return ctx.response.status(201).json(assessment)
  }

  async show(ctx: HttpContext) {
    const authUserId = (ctx as any).authUserId as number
    const assessment = await Assessment.find(Number(ctx.params.id))

    if (!assessment) {
      return ctx.response.status(404).json({ error: 'Assessment not found' })
    }

    const org = await Organization.find(assessment.organizationId)
    if (!org || org.ownerId !== authUserId) {
      return ctx.response.status(404).json({ error: 'Assessment not found' })
    }

    return ctx.response.status(200).json(assessment)
  }

  async update(ctx: HttpContext) {
    const authUserId = (ctx as any).authUserId as number
    const assessment = await Assessment.find(Number(ctx.params.id))

    if (!assessment) {
      return ctx.response.status(404).json({ error: 'Assessment not found' })
    }

    const org = await Organization.find(assessment.organizationId)
    if (!org || org.ownerId !== authUserId) {
      return ctx.response.status(404).json({ error: 'Assessment not found' })
    }

    const { title, description, dueDate, status } = ctx.request.body()

    if (status !== undefined && !VALID_STATUSES.has(status)) {
      return ctx.response.status(422).json({ error: 'Validation failed' })
    }

    if (title !== undefined) assessment.title = title
    if (description !== undefined) assessment.description = description
    if (dueDate !== undefined) assessment.dueDate = dueDate
    if (status !== undefined) assessment.status = status

    await assessment.save()

    return ctx.response.status(200).json(assessment)
  }

  async destroy(ctx: HttpContext) {
    const authUserId = (ctx as any).authUserId as number
    const assessment = await Assessment.find(Number(ctx.params.id))

    if (!assessment) {
      return ctx.response.status(404).json({ error: 'Assessment not found' })
    }

    const org = await Organization.find(assessment.organizationId)
    if (!org || org.ownerId !== authUserId) {
      return ctx.response.status(404).json({ error: 'Assessment not found' })
    }

    await assessment.delete()
    return ctx.response.status(200).json({ message: 'Assessment deleted successfully' })
  }
}
