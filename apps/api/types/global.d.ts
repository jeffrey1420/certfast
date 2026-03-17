import { Database } from '@adonisjs/lucid/database'
import { ApplicationService } from '@adonisjs/core/types'

declare global {
  var $db: Database
  var $app: ApplicationService
}

export {}
