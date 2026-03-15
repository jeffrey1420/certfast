import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'

const PORT = process.env.PORT || 3333

// In-memory stores (shared across controllers)
const users = new Map()
const tokens = new Map()
const organizations = new Map()
let userIdCounter = 1
let orgIdCounter = 1

// Import controllers
import AuthController from '../app/controllers/auth_controller.js'
import UsersController from '../app/controllers/users_controller.js'
import OrganizationsController from '../app/controllers/organizations_controller.js'

// Helper function to extract URL parameters
function extractParams(url, pattern) {
  const regex = new RegExp('^' + pattern.replace(/:([^/]+)/g, '([^/]+)') + '$')
  const match = url.match(regex)
  if (!match) return null
  
  const keys = pattern.match(/:([^/]+)/g)?.map(k => k.slice(1)) || []
  const params = {}
  keys.forEach((key, i) => {
    params[key] = match[i + 1]
  })
  return params
}

const server = createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  
  // Parse body for POST/PUT requests
  let body = ''
  if (req.method === 'POST' || req.method === 'PUT') {
    req.on('data', chunk => body += chunk)
    await new Promise(resolve => req.on('end', resolve))
  }

  const request = {
    body: body ? JSON.parse(body) : {},
    headers: req.headers,
    header: (name) => req.headers[name.toLowerCase()]
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
    const { email, password, fullName } = request.body
    
    if (!email || !password) {
      res.writeHead(422)
      res.end(JSON.stringify({ error: 'Validation failed', message: 'Email and password required' }))
      return
    }

    for (const user of users.values()) {
      if (user.email === email) {
        res.writeHead(422)
        res.end(JSON.stringify({ error: 'User already exists' }))
        return
      }
    }

    const hashedPassword = await import('node:crypto').then(c => c.createHash('sha256').update(password).digest('hex'))
    const user = {
      id: userIdCounter++,
      email,
      password: hashedPassword,
      fullName: fullName || null,
      role: 'user',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    users.set(user.id, user)

    res.writeHead(201)
    res.end(JSON.stringify({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role
    }))
    return
  }

  if (req.url === '/auth/login' && req.method === 'POST') {
    const { email, password } = request.body

    if (!email || !password) {
      res.writeHead(422)
      res.end(JSON.stringify({ error: 'Validation failed', message: 'Email and password required' }))
      return
    }

    let user = null
    for (const u of users.values()) {
      if (u.email === email) {
        user = u
        break
      }
    }

    if (!user) {
      res.writeHead(401)
      res.end(JSON.stringify({ error: 'Invalid credentials' }))
      return
    }

    const hashedPassword = await import('node:crypto').then(c => c.createHash('sha256').update(password).digest('hex'))
    if (user.password !== hashedPassword) {
      res.writeHead(401)
      res.end(JSON.stringify({ error: 'Invalid credentials' }))
      return
    }

    const token = await import('node:crypto').then(c => c.randomBytes(32).toString('hex'))
    tokens.set(token, user.id)

    res.writeHead(200)
    res.end(JSON.stringify({
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role
      }
    }))
    return
  }

  if (req.url === '/auth/logout' && req.method === 'POST') {
    const authHeader = request.header('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.writeHead(401)
      res.end(JSON.stringify({ error: 'Unauthorized' }))
      return
    }

    const token = authHeader.substring(7)
    tokens.delete(token)

    res.writeHead(200)
    res.end(JSON.stringify({ message: 'Logged out successfully' }))
    return
  }

  if (req.url === '/auth/me' && req.method === 'GET') {
    const authHeader = request.header('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.writeHead(401)
      res.end(JSON.stringify({ error: 'Unauthorized' }))
      return
    }

    const token = authHeader.substring(7)
    const userId = tokens.get(token)

    if (!userId) {
      res.writeHead(401)
      res.end(JSON.stringify({ error: 'Unauthorized' }))
      return
    }

    const user = users.get(userId)
    if (!user) {
      res.writeHead(401)
      res.end(JSON.stringify({ error: 'Unauthorized' }))
      return
    }

    res.writeHead(200)
    res.end(JSON.stringify({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role
    }))
    return
  }

  // Users routes
  if (req.url === '/users' && req.method === 'GET') {
    const authHeader = request.header('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.writeHead(401)
      res.end(JSON.stringify({ error: 'Unauthorized' }))
      return
    }

    const token = authHeader.substring(7)
    const userId = tokens.get(token)
    if (!userId) {
      res.writeHead(401)
      res.end(JSON.stringify({ error: 'Unauthorized' }))
      return
    }

    const userList = Array.from(users.values()).map(user => ({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }))

    res.writeHead(200)
    res.end(JSON.stringify(userList))
    return
  }

  const userShowMatch = extractParams(req.url, '/users/:id')
  if (userShowMatch && req.method === 'GET') {
    const authHeader = request.header('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.writeHead(401)
      res.end(JSON.stringify({ error: 'Unauthorized' }))
      return
    }

    const token = authHeader.substring(7)
    const userId = tokens.get(token)
    if (!userId) {
      res.writeHead(401)
      res.end(JSON.stringify({ error: 'Unauthorized' }))
      return
    }

    const id = parseInt(userShowMatch.id)
    const user = users.get(id)

    if (!user) {
      res.writeHead(404)
      res.end(JSON.stringify({ error: 'User not found' }))
      return
    }

    res.writeHead(200)
    res.end(JSON.stringify({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }))
    return
  }

  const userUpdateMatch = extractParams(req.url, '/users/:id')
  if (userUpdateMatch && req.method === 'PUT') {
    const authHeader = request.header('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.writeHead(401)
      res.end(JSON.stringify({ error: 'Unauthorized' }))
      return
    }

    const token = authHeader.substring(7)
    const userId = tokens.get(token)
    if (!userId) {
      res.writeHead(401)
      res.end(JSON.stringify({ error: 'Unauthorized' }))
      return
    }

    const id = parseInt(userUpdateMatch.id)
    const user = users.get(id)

    if (!user) {
      res.writeHead(404)
      res.end(JSON.stringify({ error: 'User not found' }))
      return
    }

    const { fullName, role, isActive } = request.body
    if (fullName !== undefined) user.fullName = fullName
    if (role !== undefined) user.role = role
    if (isActive !== undefined) user.isActive = isActive
    user.updatedAt = new Date().toISOString()

    res.writeHead(200)
    res.end(JSON.stringify({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }))
    return
  }

  // Organizations routes
  if (req.url === '/organizations' && req.method === 'GET') {
    const authHeader = request.header('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.writeHead(401)
      res.end(JSON.stringify({ error: 'Unauthorized' }))
      return
    }

    const token = authHeader.substring(7)
    const userId = tokens.get(token)
    if (!userId) {
      res.writeHead(401)
      res.end(JSON.stringify({ error: 'Unauthorized' }))
      return
    }

    const orgList = Array.from(organizations.values())
    res.writeHead(200)
    res.end(JSON.stringify(orgList))
    return
  }

  if (req.url === '/organizations' && req.method === 'POST') {
    const authHeader = request.header('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.writeHead(401)
      res.end(JSON.stringify({ error: 'Unauthorized' }))
      return
    }

    const token = authHeader.substring(7)
    const userId = tokens.get(token)
    if (!userId) {
      res.writeHead(401)
      res.end(JSON.stringify({ error: 'Unauthorized' }))
      return
    }

    const { name, slug, plan, settings } = request.body

    if (!name || !slug) {
      res.writeHead(422)
      res.end(JSON.stringify({ error: 'Validation failed', message: 'Name and slug are required' }))
      return
    }

    for (const org of organizations.values()) {
      if (org.slug === slug) {
        res.writeHead(422)
        res.end(JSON.stringify({ error: 'Organization already exists', message: 'Slug must be unique' }))
        return
      }
    }

    const organization = {
      id: orgIdCounter++,
      name,
      slug,
      plan: plan || 'free',
      settings: settings || {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    organizations.set(organization.id, organization)

    res.writeHead(201)
    res.end(JSON.stringify(organization))
    return
  }

  const orgShowMatch = extractParams(req.url, '/organizations/:id')
  if (orgShowMatch && req.method === 'GET') {
    const authHeader = request.header('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.writeHead(401)
      res.end(JSON.stringify({ error: 'Unauthorized' }))
      return
    }

    const token = authHeader.substring(7)
    const userId = tokens.get(token)
    if (!userId) {
      res.writeHead(401)
      res.end(JSON.stringify({ error: 'Unauthorized' }))
      return
    }

    const id = parseInt(orgShowMatch.id)
    const organization = organizations.get(id)

    if (!organization) {
      res.writeHead(404)
      res.end(JSON.stringify({ error: 'Organization not found' }))
      return
    }

    res.writeHead(200)
    res.end(JSON.stringify(organization))
    return
  }

  const orgUpdateMatch = extractParams(req.url, '/organizations/:id')
  if (orgUpdateMatch && req.method === 'PUT') {
    const authHeader = request.header('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.writeHead(401)
      res.end(JSON.stringify({ error: 'Unauthorized' }))
      return
    }

    const token = authHeader.substring(7)
    const userId = tokens.get(token)
    if (!userId) {
      res.writeHead(401)
      res.end(JSON.stringify({ error: 'Unauthorized' }))
      return
    }

    const id = parseInt(orgUpdateMatch.id)
    const organization = organizations.get(id)

    if (!organization) {
      res.writeHead(404)
      res.end(JSON.stringify({ error: 'Organization not found' }))
      return
    }

    const { name, slug, plan, settings } = request.body
    if (name !== undefined) organization.name = name
    if (slug !== undefined) organization.slug = slug
    if (plan !== undefined) organization.plan = plan
    if (settings !== undefined) organization.settings = settings
    organization.updatedAt = new Date().toISOString()

    res.writeHead(200)
    res.end(JSON.stringify(organization))
    return
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
