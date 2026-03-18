import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Assessment from './assessment.js'
import Control from './control.js'
import User from './user.js'

export default class AssessmentControl extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare assessmentId: number

  @column()
  declare controlId: number

  @column()
  declare status: 'not_started' | 'in_progress' | 'implemented' | 'partially_implemented' | 'not_applicable'

  @column()
  declare notes: string | null

  @column()
  declare assignedTo: number | null

  @column.date()
  declare dueDate: DateTime | null

  @column.date()
  declare completedAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Assessment, {
    foreignKey: 'assessmentId',
  })
  declare assessment: BelongsTo<typeof Assessment>

  @belongsTo(() => Control, {
    foreignKey: 'controlId',
  })
  declare control: BelongsTo<typeof Control>

  @belongsTo(() => User, {
    foreignKey: 'assignedTo',
  })
  declare assignedUser: BelongsTo<typeof User>
}
