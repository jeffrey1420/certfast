import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'

const PORT = process.env.PORT || 3333

const server = createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  
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
