import { randomUUID } from 'node:crypto'
import { DateTime } from 'luxon'
import UserToken from '#models/user_token'

const TOKEN_TTL_DAYS = 30

export async function issueTokenForUser(userId: number) {
  const token = randomUUID()

  await UserToken.create({
    userId,
    token,
    expiresAt: DateTime.utc().plus({ days: TOKEN_TTL_DAYS }),
    revokedAt: null,
  })

  return token
}

export async function resolveUserIdFromToken(token: string) {
  const record = await UserToken.query()
    .where('token', token)
    .whereNull('revoked_at')
    .where('expires_at', '>', DateTime.utc().toJSDate())
    .first()

  return record?.userId ?? null
}

export async function revokeToken(token: string) {
  const record = await UserToken.findBy('token', token)
  if (!record || record.revokedAt) {
    return
  }

  record.revokedAt = DateTime.utc()
  await record.save()
}

export function extractBearerToken(headerValue?: string | null) {
  if (!headerValue) return null
  if (!headerValue.startsWith('Bearer ')) return null
  const token = headerValue.slice(7).trim()
  return token.length ? token : null
}
