import { Ignitor } from '@adonisjs/core'
import { fileURLToPath } from 'node:url'

const ignitor = new Ignitor(fileURLToPath(new URL('./', import.meta.url)))

ignitor.boot().then(() => {
  ignitor.startHttpServer()
})
