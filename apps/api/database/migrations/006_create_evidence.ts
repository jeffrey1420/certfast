import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'evidence'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('control_id').unsigned().notNullable()
      table.string('file_url', 500).notNullable()
      table.string('file_name', 255).notNullable()
      table.string('file_type', 100).notNullable()
      table.integer('file_size').unsigned().nullable()
      table.text('description').nullable()
      table.enum('status', ['pending', 'approved', 'rejected', 'needs_review']).defaultTo('pending')
      table.integer('uploaded_by').unsigned().notNullable()
      table.timestamp('reviewed_at', { useTz: true }).nullable()
      table.integer('reviewed_by').unsigned().nullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
      
      // Foreign keys
      table.foreign('control_id').references('id').inTable('controls').onDelete('CASCADE')
      table.foreign('uploaded_by').references('id').inTable('users').onDelete('CASCADE')
      table.foreign('reviewed_by').references('id').inTable('users').onDelete('SET NULL')
      
      // Indexes
      table.index(['control_id'])
      table.index(['uploaded_by'])
      table.index(['status'])
      table.index(['created_at'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
