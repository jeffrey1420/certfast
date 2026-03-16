import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Organization extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare slug: string

  @column()
  declare description: string | null

  @column()
  declare plan: 'free' | 'starter' | 'pro' | 'enterprise'

  @column()
  declare status: 'active' | 'suspended' | 'cancelled'

  @column()
  declare ownerId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relationships
  @belongsTo(() => User, {
    foreignKey: 'ownerId',
  })
  declare owner: BelongsTo<typeof User>

  @manyToMany(() => User, {
    pivotTable: 'organization_members',
    pivotForeignKey: 'organization_id',
    pivotRelatedForeignKey: 'user_id',
    pivotColumns: ['role'],
  })
  declare members: ManyToMany<typeof User>
}