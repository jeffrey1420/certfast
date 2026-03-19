import { HttpContext } from '@adonisjs/core/http'
import Assessment from '#models/assessment';
import Control from '#models/control';
import Organization from '#models/organization';
import User from '#models/user';

const VALID_STATUSES = new Set(['not_started', 'in_progress', 'implemented', 'partially_implemented', 'not_applicable']);

export default class AssessmentControlsController {
  /**
   * List all controls linked to an assessment
   */
  async index(ctx: HttpContext) {
    const authUserId = ctx.authUserId;
    const assessmentId = Number(ctx.params.assessmentId);

    const assessment = await Assessment.find(assessmentId);
    if (!assessment) {
      return ctx.response.status(404).json({ error: 'Assessment not found' });
    }

    const org = await Organization.find(assessment.organizationId);
    if (!org || org.ownerId !== authUserId) {
      return ctx.response.status(404).json({ error: 'Assessment not found' });
    }

    const controls = await assessment.related('controls').query()
      .select('controls.*')
      .select('assessment_controls.status as pivot_status')
      .select('assessment_controls.notes as pivot_notes')
      .select('assessment_controls.assigned_to as pivot_assigned_to')
      .select('assessment_controls.due_date as pivot_due_date')
      .select('assessment_controls.completed_at as pivot_completed_at')
      .select('assessment_controls.created_at as pivot_created_at')
      .select('assessment_controls.updated_at as pivot_updated_at');

    return ctx.response.status(200).json(controls);
  }

  /**
   * Link a control to an assessment
   */
  async store(ctx: HttpContext) {
    const authUserId = ctx.authUserId;
    const assessmentId = Number(ctx.params.assessmentId);
    const { controlId, status, notes, assignedTo, dueDate } = ctx.request.body();

    if (!controlId) {
      return ctx.response.status(422).json({
        error: 'Validation failed',
        message: 'controlId is required',
      });
    }

    const assessment = await Assessment.find(assessmentId);
    if (!assessment) {
      return ctx.response.status(404).json({ error: 'Assessment not found' });
    }

    const org = await Organization.find(assessment.organizationId);
    if (!org || org.ownerId !== authUserId) {
      return ctx.response.status(404).json({ error: 'Assessment not found' });
    }

    const control = await Control.find(Number(controlId));
    if (!control) {
      return ctx.response.status(404).json({ error: 'Control not found' });
    }

    // Verify control belongs to same organization as assessment
    if (control.organizationId !== assessment.organizationId) {
      return ctx.response.status(422).json({
        error: 'Validation failed',
        message: 'Control must belong to the same organization as the assessment',
      });
    }

    // Validate status if provided
    if (status !== undefined && !VALID_STATUSES.has(status)) {
      return ctx.response.status(422).json({
        error: 'Validation failed',
        message: 'Invalid status value',
      });
    }

    // Validate assigned user if provided
    if (assignedTo) {
      const user = await User.find(Number(assignedTo));
      if (!user) {
        return ctx.response.status(422).json({
          error: 'Validation failed',
          message: 'Assigned user not found',
        });
      }
    }

    try {
      await assessment.related('controls').attach({
        [Number(controlId)]: {
          status: status || 'not_started',
          notes: notes || null,
          assigned_to: assignedTo || null,
          due_date: dueDate || null,
          completed_at: status === 'implemented' ? new Date() : null,
        },
      });
    } catch (error: any) {
      // Handle duplicate entry
      if (error.code === '23505') {
        return ctx.response.status(422).json({
          error: 'Validation failed',
          message: 'Control is already linked to this assessment',
        });
      }
      throw error;
    }

    const linkedControl = await assessment.related('controls').query()
      .where('controls.id', Number(controlId))
      .select('controls.*')
      .select('assessment_controls.status as pivot_status')
      .select('assessment_controls.notes as pivot_notes')
      .select('assessment_controls.assigned_to as pivot_assigned_to')
      .select('assessment_controls.due_date as pivot_due_date')
      .select('assessment_controls.completed_at as pivot_completed_at')
      .first();

    return ctx.response.status(201).json(linkedControl);
  }

  /**
   * Get a single linked control with pivot data
   */
  async show(ctx: HttpContext) {
    const authUserId = ctx.authUserId;
    const assessmentId = Number(ctx.params.assessmentId);
    const controlId = Number(ctx.params.controlId);

    const assessment = await Assessment.find(assessmentId);
    if (!assessment) {
      return ctx.response.status(404).json({ error: 'Assessment not found' });
    }

    const org = await Organization.find(assessment.organizationId);
    if (!org || org.ownerId !== authUserId) {
      return ctx.response.status(404).json({ error: 'Assessment not found' });
    }

    const linkedControl = await assessment.related('controls').query()
      .where('controls.id', controlId)
      .select('controls.*')
      .select('assessment_controls.status as pivot_status')
      .select('assessment_controls.notes as pivot_notes')
      .select('assessment_controls.assigned_to as pivot_assigned_to')
      .select('assessment_controls.due_date as pivot_due_date')
      .select('assessment_controls.completed_at as pivot_completed_at')
      .first();

    if (!linkedControl) {
      return ctx.response.status(404).json({ error: 'Control not linked to this assessment' });
    }

    return ctx.response.status(200).json(linkedControl);
  }

  /**
   * Update the pivot data for a linked control
   */
  async update(ctx: HttpContext) {
    const authUserId = ctx.authUserId;
    const assessmentId = Number(ctx.params.assessmentId);
    const controlId = Number(ctx.params.controlId);
    const { status, notes, assignedTo, dueDate } = ctx.request.body();

    const assessment = await Assessment.find(assessmentId);
    if (!assessment) {
      return ctx.response.status(404).json({ error: 'Assessment not found' });
    }

    const org = await Organization.find(assessment.organizationId);
    if (!org || org.ownerId !== authUserId) {
      return ctx.response.status(404).json({ error: 'Assessment not found' });
    }

    // Check if control is linked
    const existingLink = await assessment.related('controls').query()
      .where('controls.id', controlId)
      .first();

    if (!existingLink) {
      return ctx.response.status(404).json({ error: 'Control not linked to this assessment' });
    }

    // Validate status if provided
    if (status !== undefined && !VALID_STATUSES.has(status)) {
      return ctx.response.status(422).json({
        error: 'Validation failed',
        message: 'Invalid status value',
      });
    }

    // Validate assigned user if provided
    if (assignedTo) {
      const user = await User.find(Number(assignedTo));
      if (!user) {
        return ctx.response.status(422).json({
          error: 'Validation failed',
          message: 'Assigned user not found',
        });
      }
    }

    const updateData: Record<string, unknown> = {};
    if (status !== undefined) {
      updateData['status'] = status;
      // Auto-set completed_at when status becomes implemented
      if (status === 'implemented') {
        updateData['completed_at'] = new Date();
      } else if (status === 'not_started' || status === 'in_progress') {
        updateData['completed_at'] = null;
      }
    }
    if (notes !== undefined) updateData['notes'] = notes;
    if (assignedTo !== undefined) updateData['assigned_to'] = assignedTo;
    if (dueDate !== undefined) updateData['due_date'] = dueDate;

    await assessment.related('controls').pivotQuery()
      .where('control_id', controlId)
      .update(updateData);

    const updatedControl = await assessment.related('controls').query()
      .where('controls.id', controlId)
      .select('controls.*')
      .select('assessment_controls.status as pivot_status')
      .select('assessment_controls.notes as pivot_notes')
      .select('assessment_controls.assigned_to as pivot_assigned_to')
      .select('assessment_controls.due_date as pivot_due_date')
      .select('assessment_controls.completed_at as pivot_completed_at')
      .first();

    return ctx.response.status(200).json(updatedControl);
  }

  /**
   * Unlink a control from an assessment
   */
  async destroy(ctx: HttpContext) {
    const authUserId = ctx.authUserId;
    const assessmentId = Number(ctx.params.assessmentId);
    const controlId = Number(ctx.params.controlId);

    const assessment = await Assessment.find(assessmentId);
    if (!assessment) {
      return ctx.response.status(404).json({ error: 'Assessment not found' });
    }

    const org = await Organization.find(assessment.organizationId);
    if (!org || org.ownerId !== authUserId) {
      return ctx.response.status(404).json({ error: 'Assessment not found' });
    }

    await assessment.related('controls').detach([controlId]);

    return ctx.response.status(200).json({ message: 'Control unlinked from assessment successfully' });
  }
}
