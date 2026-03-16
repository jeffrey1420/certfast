import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'controls'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('organization_id').unsigned().notNullable()
      table.string('title', 255).notNullable()
      table.text('description').nullable()
      table.string('category', 100).notNullable()
      table.string('code', 50).notNullable().unique()
      table.enum('status', ['draft', 'active', 'archived', 'deprecated']).defaultTo('draft')
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
      
      // Foreign keys
      table.foreign('organization_id').references('id').inTable('organizations').onDelete('CASCADE')
      
      // Indexes
      table.index(['organization_id'])
      table.index(['status'])
      table.index(['category'])
      table.index(['code'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
