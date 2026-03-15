import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'assessments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('organization_id').unsigned().notNullable()
      table.string('title', 255).notNullable()
      table.enum('type', ['soc2_type1', 'soc2_type2', 'iso27001', 'gdpr', 'hipaa', 'custom']).notNullable()
      table.enum('status', ['draft', 'active', 'in_review', 'completed', 'archived']).defaultTo('draft')
      table.text('description').nullable()
      table.date('due_date').nullable()
      table.date('started_at').nullable()
      table.date('completed_at').nullable()
      table.jsonb('metadata').defaultTo('{}')
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
      
      // Foreign keys
      table.foreign('organization_id').references('id').inTable('organizations').onDelete('CASCADE')
      
      // Indexes
      table.index(['organization_id'])
      table.index(['type'])
      table.index(['status'])
      table.index(['due_date'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
