import { configure, processCLIArgs, run } from '@japa/runner'
import { apiClient } from '@japa/api-client'
import { assert } from '@japa/assert'

configure({
  ...processCLIArgs(process.argv.slice(2)),
  ...{
    files: ['tests/**/*.spec.ts'],
    plugins: [assert(), apiClient('http://localhost:3333')],
  },
})

run()
