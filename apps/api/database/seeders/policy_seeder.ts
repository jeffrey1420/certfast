import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Policy from '#models/policy'
import Organization from '#models/organization'

export default class extends BaseSeeder {
  async run() {
    const orgs = await Organization.all()
    
    const policyTemplates = [
      { title: 'Information Security Policy', content: 'This policy defines the security requirements...' },
      { title: 'Data Protection Policy', content: 'This policy outlines data protection measures...' },
      { title: 'Acceptable Use Policy', content: 'This policy defines acceptable use of resources...' },
    ]
    
    for (const org of orgs) {
      for (let i = 0; i < policyTemplates.length; i++) {
        const template = policyTemplates[i]
        await Policy.firstOrCreate(
          { 
            organizationId: org.id,
            title: template.title 
          },
          {
            organizationId: org.id,
            title: template.title,
            content: template.content,
            status: 'draft',
            version: `1.0.${i}`,
          }
        )
      }
    }
  }
}
