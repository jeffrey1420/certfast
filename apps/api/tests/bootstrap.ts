import { configure, processCLIArgs, run } from '@japa/runner'
import { apiClient } from '@japa/api-client'
import { assert } from '@japa/assert'
import { ApplicationService } from '@adonisjs/core/types'
import { IgnitorFactory } from '@adonisjs/core/factories'
import { TestUtils } from '@adonisjs/core/test_utils'

process.env.NODE_ENV ||= 'test'
process.env.PORT ||= '3333'
process.env.HOST ||= '127.0.0.1'
process.env.APP_KEY ||= 'test-app-key-32-characters-minimum'
process.env.LOG_LEVEL ||= 'info'
process.env.DB_HOST_TEST ||= 'localhost'
process.env.DB_PORT_TEST ||= '5433'
process.env.DB_USER_TEST ||= 'certfast'
process.env.DB_PASSWORD_TEST ||= 'certfast_test_password'
process.env.DB_DATABASE_TEST ||= 'certfast_test'

let app: ApplicationService
let closeServer: (() => Promise<void>) | null = null

async function runAce(commandName: string, args: string[] = []) {
  const ace = await app.container.make('ace')
  const command = await ace.exec(commandName, args)

  if (!command.exitCode) {
    return
  }

  throw command.error ?? new Error(`\"${commandName}\" failed`)
}

async function startApp() {
  if (app) return app

  const { default: databaseConfig } = await import('../config/database.ts')

  const ignitor = new IgnitorFactory()
    .withCoreProviders()
    .withCoreConfig()
    .merge({
      config: {
        database: databaseConfig,
      },
      rcFileContents: {
        providers: [
          () => import('@adonisjs/lucid/database_provider'),
          () => import('@adonisjs/cors/cors_provider'),
        ],
      },
    })
    .create(new URL('../', import.meta.url))

  app = await ignitor.createApp('test')
  await app.init()
  await app.boot()

  await import('../start/kernel.ts')
  await import('../start/routes.ts')

  const db = await app.container.make('lucid.db')
  await runAce('migration:run', ['--compact-output'])

  const testUtils = new TestUtils(app)
  await testUtils.boot()
  closeServer = await testUtils.httpServer().start()

  globalThis.$db = db
  globalThis.$app = app

  return app
}

configure({
  ...processCLIArgs(process.argv.slice(2)),
  files: ['tests/**/*.spec.ts'],
  plugins: [assert(), apiClient('http://127.0.0.1:3333')],
  setup: [
    async () => {
      await startApp()
    },
  ],
  teardown: [
    async () => {
      if (closeServer) {
        await closeServer()
      }

      if (globalThis.$db) {
        await runAce('migration:reset', ['--compact-output'])
        await globalThis.$db.manager.closeAll()
      }

      if (globalThis.$app) {
        await globalThis.$app.terminate()
      }
    },
  ],
})

run()
