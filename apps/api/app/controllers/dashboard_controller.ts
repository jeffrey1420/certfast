import { HttpContext } from '@adonisjs/core/http'
import Assessment from '#models/assessment'

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
}
