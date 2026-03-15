import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateControls extends BaseSchema {
  protected tableName = 'controls'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('assessment_id').unsigned().notNullable().references('id').inTable('assessments').onDelete('CASCADE')
      table.string('title', 255).notNullable()
      table.enum('status', ['not_started', 'in_progress', 'ready_for_review', 'approved', 'rejected']).notNullable().defaultTo('not_started')
      table.boolean('evidence_required').notNullable().defaultTo(true)
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
      
      // Index for faster queries by assessment
      table.index('assessment_id')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
