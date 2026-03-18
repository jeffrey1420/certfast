import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Organization from './organization.js'
import Assessment from './assessment.js'

export default class Control extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare organizationId: number

  @column()
  declare title: string

  @column()
  declare description: string | null

  @column()
  declare category: string

  @column()
  declare code: string

  @column()
  declare status: 'draft' | 'active' | 'archived' | 'deprecated'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Organization, {
    foreignKey: 'organizationId',
  })
  declare organization: BelongsTo<typeof Organization>

  @manyToMany(() => Assessment, {
    pivotTable: 'assessment_controls',
    pivotForeignKey: 'control_id',
    pivotRelatedForeignKey: 'assessment_id',
    pivotColumns: ['status', 'notes', 'assigned_to', 'due_date', 'completed_at'],
  })
  declare assessments: ManyToMany<typeof Assessment>
}
