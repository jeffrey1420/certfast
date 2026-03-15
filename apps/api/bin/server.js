import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'

const PORT = process.env.PORT || 3333

// Import auth controller for direct handling
import AuthController from './app/controllers/auth_controller.js'
const authController = new AuthController()

const server = createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  
  // Parse body for POST requests
  let body = ''
  if (req.method === 'POST') {
    req.on('data', chunk => body += chunk)
    await new Promise(resolve => req.on('end', resolve))
  }

  const request = {
    body: body ? JSON.parse(body) : {},
    headers: req.headers
  }

  const response = {
    statusCode: 200,
    json: (data) => {
      res.writeHead(response.statusCode)
      res.end(JSON.stringify(data))
    },
    status: (code) => {
      response.statusCode = code
      return response
    }
  }

  // Auth routes
  if (req.url === '/auth/register' && req.method === 'POST') {
    return authController.register({ request, response })
  }

  if (req.url === '/auth/login' && req.method === 'POST') {
    return authController.login({ request, response })
  }

  if (req.url === '/auth/logout' && req.method === 'POST') {
    return authController.logout({ request, response })
  }

  if (req.url === '/auth/me' && req.method === 'GET') {
    return authController.me({ request, response })
  }

  // Health and root
  if (req.url === '/health') {
    res.writeHead(200)
    res.end(JSON.stringify({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      service: 'certfast-api'
    }))
    return
  }
  
  if (req.url === '/') {
    res.writeHead(200)
    res.end(JSON.stringify({ 
      hello: 'world', 
      app: 'certfast-api',
      version: '1.0.0'
    }))
    return
  }
  
  res.writeHead(404)
  res.end(JSON.stringify({ error: 'Not found' }))
})

server.listen(PORT, () => {
  console.log(`🚀 CertFast API running on port ${PORT}`)
})
