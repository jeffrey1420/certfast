import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Organization from '#models/organization'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    const user = await User.findBy('email', 'user@example.com')
    
    if (user) {
      await Organization.createMany([
        {
          name: 'Acme Corp',
          slug: 'acme-corp',
          description: 'Demo organization for testing',
          plan: 'starter',
          status: 'active',
          ownerId: user.id,
        },
        {
          name: 'TechStart Inc',
          slug: 'techstart-inc',
          description: 'Another demo organization',
          plan: 'pro',
          status: 'active',
          ownerId: user.id,
        },
      ])
    }
  }
}
