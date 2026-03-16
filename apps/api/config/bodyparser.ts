import { defineConfig } from '@adonisjs/core/bodyparser'

const bodyParserConfig = defineConfig({
  allowedMethods: ['POST', 'PUT', 'PATCH', 'DELETE'],
  json: {
    encoding: 'utf-8',
    limit: '1mb',
    strict: true,
    types: ['application/json', 'application/json-patch+json', 'application/vnd.api+json'],
  },
  form: {
    encoding: 'utf-8',
    limit: '1mb',
    queryString: {},
  },
  raw: {
    encoding: 'utf-8',
    limit: '1mb',
    queryString: {},
    types: ['text/*'],
  },
  multipart: {
    autoProcess: false,
    convertEmptyStringsToNull: true,
    processManually: [],
  },
})

export default bodyParserConfig