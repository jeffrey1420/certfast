import { BaseCommand } from '@adonisjs/core/ace'

export default class Build extends BaseCommand {
  static commandName = 'build'
  static description = 'Build the application'

  async run() {
    this.logger.info('Building application...')
    // Build logic here
    this.logger.success('Build complete')
  }
}
