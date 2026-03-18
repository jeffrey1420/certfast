import { HttpContext } from '@adonisjs/core/http'
import Assessment from '#models/assessment'
import Control from '#models/control'
import Evidence from '#models/evidence'

const STATUS_TO_ACTIVITY_TYPE: Record<string, 'assessment_completed' | 'audit_scheduled'> = {
  completed: 'assessment_completed',
  draft: 'audit_scheduled',
  active: 'audit_scheduled',
  in_review: 'audit_scheduled',
  archived: 'audit_scheduled',
}

export default class DashboardController {
  async activity(ctx: HttpContext) {
    const authUserId = ctx.authUserId

    const assessments = await Assessment.query()
      .whereHas('organization', (orgQuery) => {
        orgQuery.where('owner_id', authUserId)
      })
      .orderBy('updated_at', 'desc')
      .limit(10)

    const activities = assessments.map((assessment) => ({
      id: assessment.id,
      type: STATUS_TO_ACTIVITY_TYPE[assessment.status] ?? 'audit_scheduled',
      title: assessment.title,
      description: `Assessment is ${assessment.status.replace(/_/g, ' ')}`,
      occurredAt: assessment.updatedAt.toISO(),
    }))

    return ctx.response.status(200).json(activities)
  }

  async metrics(ctx: HttpContext) {
    const authUserId = ctx.authUserId

    // Get user's organization IDs
    const userOrgIds = await Assessment.query()
      .select('organization_id')
      .whereHas('organization', (orgQuery) => {
        orgQuery.where('owner_id', authUserId)
      })
      .distinct()
      .then((rows) => rows.map((r) => r.organizationId))

    // Count assessments
    const totalAssessments = await Assessment.query()
      .whereIn('organization_id', userOrgIds)
      .count('* as total')
      .then((r) => Number(r[0]?.$extras?.total ?? 0))

    // Get controls stats
    const controls = await Control.query().whereIn('organization_id', userOrgIds)
    const totalControls = controls.length
    const controlsMet = controls.filter((c) => c.status === 'active').length
    const controlsInProgress = controls.filter((c) => c.status === 'draft').length
    const controlsPending = controls.filter(
      (c) => c.status === 'archived' || c.status === 'deprecated'
    ).length

    // Calculate compliance score
    const complianceScore = totalControls > 0 ? Math.round((controlsMet / totalControls) * 100) : 0

    // Count evidence items linked to user's controls
    const controlIds = controls.map((c) => c.id)
    const evidenceCount =
      controlIds.length > 0
        ? await Evidence.query()
            .whereIn('control_id', controlIds)
            .count('* as total')
            .then((r) => Number(r[0]?.$extras?.total ?? 0))
        : 0

    // Calculate days to compliance (earliest assessment due date or default)
    const earliestAssessment = await Assessment.query()
      .whereIn('organization_id', userOrgIds)
      .whereNotNull('due_date')
      .orderBy('due_date', 'asc')
      .first()

    const daysToCompliance = earliestAssessment?.dueDate
      ? Math.max(0, Math.ceil((earliestAssessment.dueDate.toJSDate().getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
      : 45

    return ctx.response.status(200).json({
      complianceScore,
      totalAssessments,
      evidenceCount,
      daysToCompliance,
      controlsMet,
      controlsInProgress,
      controlsPending,
    })
  }
}
