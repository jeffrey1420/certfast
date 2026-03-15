import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'organizations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name', 255).notNullable()
      table.string('slug', 100).notNullable().unique()
      table.enum('plan', ['free', 'starter', 'professional', 'enterprise']).defaultTo('free')
      table.jsonb('settings').defaultTo('{}')
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
      
      // Indexes
      table.index(['slug'])
      table.index(['plan'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
