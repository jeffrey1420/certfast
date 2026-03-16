import { defineConfig } from '@adonisjs/cors'

const corsConfig = defineConfig({
  enabled: true,
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  headers: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposeHeaders: [],
  credentials: true,
  maxAge: 90,
})

export default corsConfig