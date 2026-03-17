import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'controls'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      // Drop the global unique constraint on code
      table.dropUnique(['code'])
      
      // Add composite unique constraint: code must be unique per organization
      table.unique(['organization_id', 'code'], {
        indexName: 'controls_organization_id_code_unique'
      })
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      // Revert: drop composite unique and restore global unique
      table.dropUnique(['organization_id', 'code'])
      table.unique(['code'])
    })
  }
}
