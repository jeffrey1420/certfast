import { IgnitorFactory } from '@adonisjs/core/factories'
import databaseConfig from '../config/database.js'

/**
 * Simple startup logger that satisfies ESLint rules
 * Uses console.warn for informational messages during startup
 */
const startupLog = (message: string) => {
  console.warn(`[SERVER] ${message}`)
}

startupLog('Starting CertFast API...')

try {
  startupLog('Creating Ignitor...')
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

  startupLog('Creating app...')
  const app = await ignitor.createApp('web')
  
  startupLog('Initializing app...')
  await app.init()
  
  startupLog('Booting app...')
  await app.boot()

  startupLog('Loading kernel...')
  await import('../start/kernel.js')
  
  startupLog('Loading routes...')
  await import('../start/routes.js')

  startupLog('Starting HTTP server...')
  await app.start(() => {
    startupLog('✅ HTTP server started successfully!')
    startupLog(`Listening on http://${process.env.HOST || '0.0.0.0'}:${process.env.PORT || '3333'}`)
  })
} catch (error) {
  console.error('[SERVER] ❌ FATAL ERROR:')
  console.error(error)
  process.exit(1)
}
