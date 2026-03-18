import { BaseSeeder } from '@adonisjs/lucid/seeders'
import UserSeeder from './user_seeder.js'
import OrganizationSeeder from './organization_seeder.js'
import AssessmentSeeder from './assessment_seeder.js'
import ControlSeeder from './control_seeder.js'
import PolicySeeder from './policy_seeder.js'
import EvidenceSeeder from './evidence_seeder.js'

export default class DatabaseSeeder extends BaseSeeder {
  async run() {
    console.warn('🌱 Starting database seeding...')
    
    // Seed in dependency order:
    // 1. Users (no dependencies)
    console.warn('👤 Seeding users...')
    await new UserSeeder(this.client).run()
    
    // 2. Organizations (depends on users)
    console.warn('🏢 Seeding organizations...')
    await new OrganizationSeeder(this.client).run()
    
    // 3. Assessments (depends on organizations)
    console.warn('📋 Seeding assessments...')
    await new AssessmentSeeder(this.client).run()
    
    // 4. Controls (depends on organizations)
    console.warn('🛡️ Seeding controls...')
    await new ControlSeeder(this.client).run()
    
    // 5. Policies (depends on organizations)
    console.warn('📄 Seeding policies...')
    await new PolicySeeder(this.client).run()
    
    // 6. Evidence (depends on controls and users)
    console.warn('📎 Seeding evidence...')
    await new EvidenceSeeder(this.client).run()
    
    console.warn('✅ Database seeding completed!')
  }
}
