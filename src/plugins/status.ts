import { FastifyPluginAsync } from 'fastify'

export const status: FastifyPluginAsync = async (server, options) => {
  server.get(`/`, async function (req, res) {
    return { up: true }
  })
}
