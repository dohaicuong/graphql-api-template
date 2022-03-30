import fp from 'fastify-plugin'
import { FastifyPluginAsync } from 'fastify'
import { execFile } from 'child_process'
import path from 'path'

export const migration: FastifyPluginAsync = fp(async (server, options) => {
  server.addHook('onReady', async () => {
    const exitCode = await new Promise((resolve, _) => {
      execFile(
        path.resolve('./node_modules/prisma/build/index.js'),
        ['db', 'push'],
        (error, stdout, stderr) => {
          server.log.info(stdout)
          if (error === null) return resolve(0)

          server.log.error(`prisma db push exited with error ${error.message}`)
          resolve(error.code ?? 1)
        }
      )
    })

    if (exitCode !== 0) throw Error(`command db push failed with exit code ${exitCode}`)
  })
})
