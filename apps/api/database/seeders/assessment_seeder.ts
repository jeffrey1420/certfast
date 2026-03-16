import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Assessment from '#models/assessment'
import Organization from '#models/organization'

export default class extends BaseSeeder {
  async run() {
    const orgs = await Organization.all()
    
    for (const org of orgs) {
      await Assessment.createMany([
        {
          organizationId: org.id,
          title: `SOC 2 Type I Assessment - ${org.name}`,
          type: 'soc2_type1' as const,
          status: 'active' as const,
          description: 'Initial SOC 2 Type I compliance assessment',
        },
        {
          organizationId: org.id,
          title: `ISO 27001 Assessment - ${org.name}`,
          type: 'iso27001' as const,
          status: 'draft' as const,
          description: 'ISO 27001 certification preparation',
        },
      ])
    }
  }
}
