import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateOrganizations extends BaseSchema {
  protected tableName = 'organizations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name', 255).notNullable()
      table.string('slug', 255).notNullable().unique()
      table.enum('plan', ['free', 'starter', 'professional', 'enterprise']).notNullable().defaultTo('free')
      table.jsonb('settings').nullable().defaultTo('{}')
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
