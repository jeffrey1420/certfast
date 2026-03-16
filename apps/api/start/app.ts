import 'reflect-metadata'
import { prettyPrintError } from '@adonisjs/core'
import { IgnitorFactory } from '@adonisjs/core/factories'
import databaseConfig from '../config/database.js'

try {
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

  await import('./kernel.js')
  await import('./routes.js')

  await app.start(() => import('./kernel.js'))
} catch (error) {
  prettyPrintError(error)
  process.exit(1)
}
