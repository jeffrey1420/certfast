import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Control from '#models/control'
import Organization from '#models/organization'

export default class extends BaseSeeder {
  async run() {
    const orgs = await Organization.all()
    
    const controlTemplates = [
      { title: 'Access Control Policy', category: 'Security', code: 'AC-001' },
      { title: 'Data Encryption at Rest', category: 'Security', code: 'EN-001' },
      { title: 'Incident Response Plan', category: 'Operations', code: 'IR-001' },
      { title: 'Backup and Recovery', category: 'Operations', code: 'BR-001' },
      { title: 'Employee Onboarding', category: 'HR', code: 'HR-001' },
    ]
    
    for (const org of orgs) {
      for (const template of controlTemplates) {
        await Control.firstOrCreate(
          { code: `${template.code}-${org.id}` },
          {
            organizationId: org.id,
            title: template.title,
            description: `Control for ${template.title}`,
            category: template.category,
            code: `${template.code}-${org.id}`,
            status: 'draft',
          }
        )
      }
    }
  }
}
