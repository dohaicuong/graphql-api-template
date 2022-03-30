import fastify, { FastifyServerOptions } from 'fastify'

import { migration } from './plugins/migration'
import cors from 'fastify-cors'
import { shutdown } from './plugins/shutdown'
import { prisma } from './plugins/prisma'
import { jwt } from './plugins/jwt'

import mercurius from 'mercurius'
import { schema } from './graphql/schema'
import { createContext } from './graphql/context'

export const createServer = (opts: FastifyServerOptions = {}) => fastify(opts)
  .register(migration)
  .register(cors)
  .register(shutdown)
  .register(prisma)
  .register(jwt)
  .register(mercurius, {
    schema,
    context: createContext,
    path: '/graphql',
    graphiql: true,
  })

export const startServer = async () => {
  const server = createServer({
    logger: {
      level: 'info',
    },
    disableRequestLogging: process.env.ENABLE_REQUEST_LOGGING !== 'true',
  })

  const port = process.env.PORT ?? 4000
  await server.listen(port, '0.0.0.0')
    .catch(error => {
      server.log.error(error)
      process.exit(1)
    })
}
