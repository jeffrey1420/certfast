import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateAssessments extends BaseSchema {
  protected tableName = 'assessments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('org_id').unsigned().notNullable().references('id').inTable('organizations').onDelete('CASCADE')
      table.string('title', 255).notNullable()
      table.enum('type', ['soc2', 'iso27001', 'gdpr', 'hipaa', 'custom']).notNullable()
      table.enum('status', ['draft', 'in_progress', 'under_review', 'completed', 'archived']).notNullable().defaultTo('draft')
      table.timestamp('due_date', { useTz: true }).nullable()
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
      
      // Index for faster queries by organization
      table.index('org_id')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
