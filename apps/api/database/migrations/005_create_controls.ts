import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'controls'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('assessment_id').unsigned().notNullable()
      table.string('title', 255).notNullable()
      table.text('description').nullable()
      table.enum('status', ['not_started', 'in_progress', 'implemented', 'not_applicable', 'failed']).defaultTo('not_started')
      table.enum('priority', ['low', 'medium', 'high', 'critical']).defaultTo('medium')
      table.boolean('evidence_required').defaultTo(true)
      table.text('evidence_description').nullable()
      table.integer('assigned_to').unsigned().nullable()
      table.date('due_date').nullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
      
      // Foreign keys
      table.foreign('assessment_id').references('id').inTable('assessments').onDelete('CASCADE')
      table.foreign('assigned_to').references('id').inTable('users').onDelete('SET NULL')
      
      // Indexes
      table.index(['assessment_id'])
      table.index(['status'])
      table.index(['priority'])
      table.index(['assigned_to'])
      table.index(['due_date'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
