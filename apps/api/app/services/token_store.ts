import { randomUUID } from 'node:crypto'

const tokenToUserId = new Map<string, number>()

export function issueTokenForUser(userId: number) {
  const token = randomUUID()
  tokenToUserId.set(token, userId)
  return token
}

export function resolveUserIdFromToken(token: string) {
  return tokenToUserId.get(token) ?? null
}

export function revokeToken(token: string) {
  tokenToUserId.delete(token)
}

export function extractBearerToken(headerValue?: string | null) {
  if (!headerValue) return null
  if (!headerValue.startsWith('Bearer ')) return null
  const token = headerValue.slice(7).trim()
  return token.length ? token : null
}
