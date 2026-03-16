import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'organization_members'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('organization_id').unsigned().notNullable().references('id').inTable('organizations').onDelete('CASCADE')
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.enum('role', ['owner', 'admin', 'member', 'auditor']).notNullable().defaultTo('member')
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
      
      // Unique constraint: one membership per user per org
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