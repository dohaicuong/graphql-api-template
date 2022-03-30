import { FastifyPluginAsync } from 'fastify'

export const shutdown: FastifyPluginAsync = async server => {
  process.on('SIGINT', () => server.close())
  process.on('SIGTERM', () => server.close())
}
