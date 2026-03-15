import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateOrganizationUsers extends BaseSchema {
  protected tableName = 'organization_users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('org_id').unsigned().notNullable().references('id').inTable('organizations').onDelete('CASCADE')
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.enum('role', ['owner', 'admin', 'member']).notNullable().defaultTo('member')
      table.timestamp('joined_at', { useTz: true }).notNullable().defaultTo(this.now())
      
      // Unique constraint to prevent duplicate memberships
      table.unique(['org_id', 'user_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
