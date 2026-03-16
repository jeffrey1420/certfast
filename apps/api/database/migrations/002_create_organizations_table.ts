import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'organizations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name', 255).notNullable()
      table.string('slug', 255).notNullable().unique()
      table.text('description').nullable()
      table.enum('plan', ['free', 'starter', 'pro', 'enterprise']).notNullable().defaultTo('free')
      table.enum('status', ['active', 'suspended', 'cancelled']).notNullable().defaultTo('active')
      table.integer('owner_id').unsigned().notNullable().references('id').inTable('users').onDelete('RESTRICT')
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
      
      // Indexes
      table.index(['slug'])
      table.index(['owner_id'])
      table.index(['status'])
      table.index(['plan'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}