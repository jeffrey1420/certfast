import { Ignitor } from '@adonisjs/core'

const ignitor = new Ignitor(import.meta.url)
const app = ignitor.createApp('api')

await app.boot()
await app.start(() => import('./start/kernel.js'))
