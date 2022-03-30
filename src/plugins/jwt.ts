import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import jsonwebtoken from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'some_random_secret'

export type JWTPayload = {
  userId: string
}

declare module 'fastify' {
  interface FastifyRequest {
    jwtPayload?: JWTPayload
  }
}

export const jwt: FastifyPluginAsync = fp(async server => {
  server.decorateReply('jwtPayload', undefined)

  server.addHook('onRequest', async request => {
    request.jwtPayload = decodeAuthHeader(request.headers.authorization)
  })
})

const decodeAuthHeader = (authorization?: string): JWTPayload | undefined => {
  const hasBearer = authorization?.includes('Bearer ')
  if (!hasBearer) return

  const token = authorization?.replace('Bearer ', '')
  if (!token) return

  try {
    return jsonwebtoken.verify(token as any, JWT_SECRET) as JWTPayload
  }
  catch (error) {
    return undefined
  }
}

export const signToken = (payload: JWTPayload): string => {
  return jsonwebtoken.sign(payload, JWT_SECRET)
}
