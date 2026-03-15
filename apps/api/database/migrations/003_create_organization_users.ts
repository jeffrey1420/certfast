import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'organization_users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('organization_id').unsigned().notNullable()
      table.integer('user_id').unsigned().notNullable()
      table.enum('role', ['owner', 'admin', 'member', 'auditor']).defaultTo('member')
      table.timestamp('joined_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
      
      // Foreign keys
      table.foreign('organization_id').references('id').inTable('organizations').onDelete('CASCADE')
      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')
      
      // Unique constraint
      table.unique(['organization_id', 'user_id'])
      
      // Indexes
      table.index(['organization_id'])
      table.index(['user_id'])
      table.index(['role'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
