import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'policies'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('organization_id').unsigned().notNullable()
      table.string('title', 255).notNullable()
      table.text('content').notNullable()
      table.enum('status', ['draft', 'published', 'archived', 'deprecated']).defaultTo('draft')
      table.string('version', 20).notNullable().defaultTo('1.0.0')
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
      
      // Foreign keys
      table.foreign('organization_id').references('id').inTable('organizations').onDelete('CASCADE')
      
      // Indexes
      table.index(['organization_id'])
      table.index(['status'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
