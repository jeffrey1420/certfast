import { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import Evidence from '#models/evidence'
import Control from '#models/control'
import Organization from '#models/organization'

const VALID_STATUSES = new Set(['pending', 'approved', 'rejected', 'needs_review'])

export default class EvidenceController {
  async index(ctx: HttpContext) {
    const authUserId = ctx.authUserId
    const controlId = ctx.request.input('controlId')

    // If controlId is provided (and not 0), filter by that control
    // Otherwise fetch all evidence across user's organizations
    if (controlId && controlId !== '0' && controlId !== 0) {
      // Verify user has access to this control's organization
      const control = await Control.find(Number(controlId))
      if (!control) {
        return ctx.response.status(404).json({ error: 'Control not found' })
      }

      const org = await Organization.find(control.organizationId)
      if (!org || org.ownerId !== authUserId) {
        return ctx.response.status(404).json({ error: 'Control not found' })
      }

      const evidence = await Evidence.query()
        .where('controlId', Number(controlId))
        .orderBy('createdAt', 'desc')

      return ctx.response.status(200).json(evidence)
    }

    // Fetch all evidence across user's organizations
    // First get all organizations owned by the user
    const userOrgs = await Organization.query().where('ownerId', authUserId)
    const orgIds = userOrgs.map((org) => org.id)

    if (orgIds.length === 0) {
      return ctx.response.status(200).json([])
    }

    // Get all controls belonging to user's organizations
    const controls = await Control.query().whereIn('organizationId', orgIds)
    const controlIds = controls.map((c) => c.id)

    if (controlIds.length === 0) {
      return ctx.response.status(200).json([])
    }

    // Fetch all evidence for these controls
    const evidence = await Evidence.query()
      .whereIn('controlId', controlIds)
      .orderBy('createdAt', 'desc')

    return ctx.response.status(200).json(evidence)
  }

  async store(ctx: HttpContext) {
    const authUserId = ctx.authUserId
    const { controlId, fileUrl, fileName, fileType, fileSize, description } = ctx.request.body()

    if (!controlId || !fileUrl || !fileName || !fileType) {
      return ctx.response.status(422).json({
        error: 'Validation failed',
        message: 'controlId, fileUrl, fileName, and fileType are required'
      })
    }

    // Verify user has access to this control's organization
    const control = await Control.find(Number(controlId))
    if (!control) {
      return ctx.response.status(404).json({ error: 'Control not found' })
    }

    const org = await Organization.find(control.organizationId)
    if (!org || org.ownerId !== authUserId) {
      return ctx.response.status(404).json({ error: 'Control not found' })
    }

    const evidence = await Evidence.create({
      controlId: Number(controlId),
      fileUrl,
      fileName,
      fileType,
      fileSize: fileSize ?? null,
      description: description ?? null,
      status: 'pending',
      uploadedBy: authUserId,
    })

    return ctx.response.status(201).json(evidence)
  }

  async show(ctx: HttpContext) {
    const authUserId = ctx.authUserId
    const evidence = await Evidence.find(Number(ctx.params.id))

    if (!evidence) {
      return ctx.response.status(404).json({ error: 'Evidence not found' })
    }

    // Verify user has access to this control's organization
    const control = await Control.find(evidence.controlId)
    if (!control) {
      return ctx.response.status(404).json({ error: 'Evidence not found' })
    }

    const org = await Organization.find(control.organizationId)
    if (!org || org.ownerId !== authUserId) {
      return ctx.response.status(404).json({ error: 'Evidence not found' })
    }

    return ctx.response.status(200).json(evidence)
  }

  async update(ctx: HttpContext) {
    const authUserId = ctx.authUserId
    const evidence = await Evidence.find(Number(ctx.params.id))

    if (!evidence) {
      return ctx.response.status(404).json({ error: 'Evidence not found' })
    }

    // Verify user has access to this control's organization
    const control = await Control.find(evidence.controlId)
    if (!control) {
      return ctx.response.status(404).json({ error: 'Evidence not found' })
    }

    const org = await Organization.find(control.organizationId)
    if (!org || org.ownerId !== authUserId) {
      return ctx.response.status(404).json({ error: 'Evidence not found' })
    }

    const { description, status, reviewedBy } = ctx.request.body()

    if (status !== undefined && !VALID_STATUSES.has(status)) {
      return ctx.response.status(422).json({ 
        error: 'Validation failed',
        message: 'Invalid status value'
      })
    }

    // Handle review workflow
    if (status === 'approved' || status === 'rejected') {
      evidence.reviewedAt = DateTime.now()
      evidence.reviewedBy = reviewedBy ?? authUserId
    }

    if (description !== undefined) evidence.description = description
    if (status !== undefined) evidence.status = status

    await evidence.save()

    return ctx.response.status(200).json(evidence)
  }

  async destroy(ctx: HttpContext) {
    const authUserId = ctx.authUserId
    const evidence = await Evidence.find(Number(ctx.params.id))

    if (!evidence) {
      return ctx.response.status(404).json({ error: 'Evidence not found' })
    }

    // Verify user has access to this control's organization
    const control = await Control.find(evidence.controlId)
    if (!control) {
      return ctx.response.status(404).json({ error: 'Evidence not found' })
    }

    const org = await Organization.find(control.organizationId)
    if (!org || org.ownerId !== authUserId) {
      return ctx.response.status(404).json({ error: 'Evidence not found' })
    }

    await evidence.delete()
    return ctx.response.status(200).json({ message: 'Evidence deleted successfully' })
  }
}
