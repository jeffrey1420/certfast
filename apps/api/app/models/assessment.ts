import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Organization from './organization.js'

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
}
