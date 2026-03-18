import { DateTime } from 'luxon'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Evidence from '#models/evidence'
import Control from '#models/control'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    const controls = await Control.all()
    const adminUser = await User.findBy('email', 'admin@certfast.io')
    const demoUser = await User.findBy('email', 'user@example.com')
    
    if (controls.length === 0 || !adminUser) {
      console.warn('Skipping evidence seeder: no controls or users found')
      return
    }
    
    const defaultUser = demoUser || adminUser
    
    const evidenceTemplates = [
      {
        fileName: 'access_control_policy.pdf',
        fileType: 'application/pdf',
        fileSize: 245760,
        description: 'Formal access control policy document',
        status: 'approved' as const,
      },
      {
        fileName: 'encryption_audit_report.xlsx',
        fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        fileSize: 15360,
        description: 'Quarterly encryption implementation audit',
        status: 'pending' as const,
      },
      {
        fileName: 'incident_response_runbook.md',
        fileType: 'text/markdown',
        fileSize: 8192,
        description: 'Incident response procedures and contact list',
        status: 'approved' as const,
      },
      {
        fileName: 'backup_recovery_test_results.pdf',
        fileType: 'application/pdf',
        fileSize: 184320,
        description: 'Monthly backup and recovery test results',
        status: 'needs_review' as const,
      },
      {
        fileName: 'employee_onboarding_checklist.pdf',
        fileType: 'application/pdf',
        fileSize: 122880,
        description: 'HR onboarding security checklist',
        status: 'approved' as const,
      },
    ]
    
    for (let i = 0; i < Math.min(controls.length, evidenceTemplates.length); i++) {
      const control = controls[i]
      const template = evidenceTemplates[i]
      const uploader = i % 2 === 0 ? adminUser : defaultUser
      
      await Evidence.firstOrCreate(
        {
          controlId: control.id,
          fileName: template.fileName,
        },
        {
          controlId: control.id,
          fileUrl: `/uploads/evidence/${control.organizationId}/${template.fileName}`,
          fileName: template.fileName,
          fileType: template.fileType,
          fileSize: template.fileSize,
          description: template.description,
          status: template.status,
          uploadedBy: uploader.id,
          reviewedBy: template.status === 'approved' ? adminUser.id : null,
          reviewedAt: template.status === 'approved' ? DateTime.now() : null,
        }
      )
    }
    
    console.warn(`Seeded ${Math.min(controls.length, evidenceTemplates.length)} evidence records`)
  }
}
