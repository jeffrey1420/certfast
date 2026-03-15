import { defineConfig } from '@adonisjs/core'
import { env } from './env.js'

export default defineConfig({
  appKey: env.get('APP_KEY'),
  http: {
    cookie: {},
    trustProxy: () => true,
  },
})
