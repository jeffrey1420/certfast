import { BaseCommand } from '@adonisjs/core'

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
    const { default: startApp } = await import('../start/app.js')
    await startApp
  }
}
