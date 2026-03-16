import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        email: 'admin@certfast.io',
        password: 'password123',
        fullName: 'Admin User',
        role: 'admin',
        isActive: true,
      },
      {
        email: 'user@example.com',
        password: 'password123',
        fullName: 'Demo User',
        role: 'user',
        isActive: true,
      },
    ])
  }
}
