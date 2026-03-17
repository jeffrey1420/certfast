import { Ignitor } from '@adonisjs/core/build/src/ignitor/main.js'

async function runMigrations() {
  console.log('🔄 Running database migrations...')
  
  try {
    const ignitor = new Ignitor(new URL('file://' + process.cwd() + '/'))
    const app = ignitor.createApp('console')
    
    await app.init()
    await app.boot()
    
    const db = await app.container.make('lucid.db')
    const { Migrator } = await import('@adonisjs/lucid/build/src/migrator.js')
    
    const migrator = new Migrator(db, app, {
      direction: 'up',
      migrationPaths: ['database/migrations']
    })
    
    const { migratedFiles, status, error } = await migrator.run()
    
    if (status === 'success') {
      console.log('✅ Migrations completed successfully')
      if (migratedFiles.length > 0) {
        console.log('   Migrated files:', Object.keys(migratedFiles))
      } else {
        console.log('   No new migrations to run')
      }
    } else if (status === 'error') {
      console.error('❌ Migration failed:', error)
      process.exit(1)
    } else if (status === 'skipped') {
      console.log('⏭️  Migrations skipped')
    }
    
    await db.manager.closeAll()
    console.log('✅ Database connection closed')
    
  } catch (error) {
    console.error('❌ Migration error:', error.message)
    console.error(error.stack)
    process.exit(1)
  }
}

runMigrations()
