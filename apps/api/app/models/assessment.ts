import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Organization from './organization.js'
import Control from './control.js'

export default class Assessment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare organizationId: number

  @column()
  declare title: string

  @column()
  declare type: 'soc2_type1' | 'soc2_type2' | 'iso27001' | 'gdpr' | 'hipaa' | 'custom'

  @column()
  declare status: 'draft' | 'active' | 'in_review' | 'completed' | 'archived'

  @column()
  declare description: string | null

  @column.date()
  declare dueDate: DateTime | null

  @column.date()
  declare startedAt: DateTime | null

  @column.date()
  declare completedAt: DateTime | null

  @column()
  declare metadata: Record<string, unknown> | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Organization, {
    foreignKey: 'organizationId',
  })
  declare organization: BelongsTo<typeof Organization>

  @manyToMany(() => Control, {
    pivotTable: 'assessment_controls',
    pivotForeignKey: 'assessment_id',
    pivotRelatedForeignKey: 'control_id',
    pivotColumns: ['status', 'notes', 'assigned_to', 'due_date', 'completed_at'],
  })
  declare controls: ManyToMany<typeof Control>
}
