import { IgnitorFactory } from '@adonisjs/core/factories'
import databaseConfig from '../config/database.js'

console.log('[SERVER] Starting CertFast API...')

try {
  console.log('[SERVER] Creating Ignitor...')
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

  console.log('[SERVER] Creating app...')
  const app = await ignitor.createApp('web')
  
  console.log('[SERVER] Initializing app...')
  await app.init()
  
  console.log('[SERVER] Booting app...')
  await app.boot()

  console.log('[SERVER] Loading kernel...')
  await import('../start/kernel.js')
  
  console.log('[SERVER] Loading routes...')
  await import('../start/routes.js')

  console.log('[SERVER] Starting HTTP server...')
  await app.start(() => {
    console.log('[SERVER] ✅ HTTP server started successfully!')
    console.log(`[SERVER] Listening on http://${process.env.HOST || '0.0.0.0'}:${process.env.PORT || '3333'}`)
  })
} catch (error) {
  console.error('[SERVER] ❌ FATAL ERROR:')
  console.error(error)
  process.exit(1)
}
