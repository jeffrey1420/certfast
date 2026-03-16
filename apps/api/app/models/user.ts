import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeSave,
  column,
  hasMany,
  manyToMany,
} from '@adonisjs/lucid/orm'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import hash from '@adonisjs/core/services/hash'
import Organization from './organization.js'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare email: string

  @column({ serializeAs: null }) // Never serialize password
  declare password: string

  @column()
  declare fullName: string | null

  @column()
  declare avatarUrl: string | null

  @column()
  declare role: 'admin' | 'user' | 'auditor'

  @column()
  declare isActive: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeSave()
  static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await hash.make(user.password)
    }
  }

  async verifyPassword(plainTextPassword: string) {
    return hash.verify(this.password, plainTextPassword)
  }

  // Relationships
  @hasMany(() => Organization, {
    foreignKey: 'ownerId',
  })
  declare ownedOrganizations: HasMany<typeof Organization>

  @manyToMany(() => Organization, {
    pivotTable: 'organization_members',
    pivotForeignKey: 'user_id',
    pivotRelatedForeignKey: 'organization_id',
    pivotColumns: ['role'],
  })
  declare organizations: ManyToMany<typeof Organization>
}
