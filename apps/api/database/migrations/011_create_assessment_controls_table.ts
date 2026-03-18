import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'assessment_controls'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      
      table.integer('assessment_id').unsigned().notNullable().references('id').inTable('assessments').onDelete('CASCADE')
      table.integer('control_id').unsigned().notNullable().references('id').inTable('controls').onDelete('CASCADE')
      
      // Status tracking for this control within the assessment context
      table.enum('status', ['not_started', 'in_progress', 'implemented', 'partially_implemented', 'not_applicable'])
        .notNullable()
        .defaultTo('not_started')
      
      table.text('notes').nullable()
      table.integer('assigned_to').unsigned().nullable().references('id').inTable('users').onDelete('SET NULL')
      table.date('due_date').nullable()
      table.date('completed_at').nullable()
      
      table.timestamp('created_at')
      table.timestamp('updated_at')
      
      // Unique constraint to prevent duplicate control-assessment pairs
      table.unique(['assessment_id', 'control_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
