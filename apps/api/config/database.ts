import { defineConfig } from '@adonisjs/lucid'

const isTesting = process.env.NODE_ENV === 'test'

export default defineConfig({
  connection: isTesting ? 'postgres_test' : 'postgres',
  connections: {
    postgres: {
      client: 'pg',
      connection: {
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 5432,
        user: process.env.DB_USER || 'certfast',
        password: process.env.DB_PASSWORD || 'certfast_dev_password',
        database: process.env.DB_DATABASE || 'certfast_dev',
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
      seeders: {
        paths: ['database/seeders'],
      },
    },
    postgres_test: {
      client: 'pg',
      connection: {
        host: process.env.DB_HOST_TEST || 'localhost',
        port: Number(process.env.DB_PORT_TEST) || 5433,
        user: process.env.DB_USER_TEST || 'certfast',
        password: process.env.DB_PASSWORD_TEST || 'certfast_test_password',
        database: process.env.DB_DATABASE_TEST || 'certfast_test',
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
      seeders: {
        paths: ['database/seeders'],
      },
      // Pool minimal pour tests
      pool: {
        min: 1,
        max: 5,
      },
    },
  },
})