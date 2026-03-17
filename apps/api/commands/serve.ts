import { BaseCommand } from '@adonisjs/core/ace'

export default class Serve extends BaseCommand {
  static commandName = 'serve'
  static description = 'Start the dev server'
  static options = {
    watch: {
      type: 'boolean' as const,
      alias: 'w',
      description: 'Watch for file changes',
    },
  }

  async run() {
    this.logger.info('Starting server...')
    await import('../start/app.js')
  }
}
