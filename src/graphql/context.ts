import { PrismaClient } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { JWTPayload } from '../plugins/jwt'

export interface Context {
  request: FastifyRequest
  reply: FastifyReply
  prisma: PrismaClient
  jwtPayload?: JWTPayload
}

export const createContext = (request: FastifyRequest, reply: FastifyReply): Context => {
  return {
    request,
    reply,
    prisma: request.server.prisma,
    jwtPayload: request.jwtPayload
  }
}
