import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateUsers extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('email', 255).notNullable().unique()
      table.string('password', 255).notNullable()
      table.string('full_name', 255).nullable()
      table.string('avatar_url', 500).nullable()
      table.enum('role', ['admin', 'user', 'auditor']).notNullable().defaultTo('user')
      table.boolean('is_active').notNullable().defaultTo(true)
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
