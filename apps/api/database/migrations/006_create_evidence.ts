import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateEvidence extends BaseSchema {
  protected tableName = 'evidence'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('control_id').unsigned().notNullable().references('id').inTable('controls').onDelete('CASCADE')
      table.string('file_url', 1000).notNullable()
      table.string('file_type', 100).notNullable()
      table.integer('uploaded_by').unsigned().notNullable().references('id').inTable('users').onDelete('RESTRICT')
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
      
      // Indexes for faster queries
      table.index('control_id')
      table.index('uploaded_by')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
