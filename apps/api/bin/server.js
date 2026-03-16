import 'reflect-metadata'
import { prettyPrintError } from '@adonisjs/core'
import { IgnitorFactory } from '@adonisjs/core/factories'
import databaseConfig from '../config/database.js'

async function main() {
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

  const app = await ignitor.createApp('api')
  await app.init()
  await app.boot()

  await import('../start/kernel.js')
  await import('../start/routes.js')

  await app.start(() => import('../start/kernel.js'))
}

main().catch((error) => {
  prettyPrintError(error)
  process.exit(1)
})
