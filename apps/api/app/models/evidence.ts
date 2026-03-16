import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Control from './control.js'
import User from './user.js'

export default class Evidence extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare controlId: number

  @column()
  declare fileUrl: string

  @column()
  declare fileName: string

  @column()
  declare fileType: string

  @column()
  declare fileSize: number | null

  @column()
  declare description: string | null

  @column()
  declare status: 'pending' | 'approved' | 'rejected' | 'needs_review'

  @column()
  declare uploadedBy: number

  @column.dateTime()
  declare reviewedAt: DateTime | null

  @column()
  declare reviewedBy: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Control, {
    foreignKey: 'controlId',
  })
  declare control: BelongsTo<typeof Control>

  @belongsTo(() => User, {
    foreignKey: 'uploadedBy',
  })
  declare uploadedByUser: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'reviewedBy',
  })
  declare reviewedByUser: BelongsTo<typeof User>
}
