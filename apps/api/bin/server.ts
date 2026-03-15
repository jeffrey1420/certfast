import { Ignitor } from '@adonisjs/core'
import { fileURLToPath } from 'node:url'

const ignitor = new Ignitor(fileURLToPath(new URL('../', import.meta.url)))
const app = ignitor.createApp('api')

await app.boot()
await app.start()
