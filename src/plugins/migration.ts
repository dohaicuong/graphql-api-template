import fp from 'fastify-plugin'
import { FastifyPluginAsync } from 'fastify'
import { exec } from 'child_process'

export const migration: FastifyPluginAsync = fp(async (server, options) => {
  server.addHook('onReady', async () => {
    const [code, message] = await new Promise((resolve, _) => {
      exec(
        'npx prisma db push',
        (error, stdout, stderr) => {
          server.log.info(stdout)
          if (error === null) return resolve([0, undefined])

          server.log.error(`prisma db push exited with error ${error.message}`)
          return resolve([error.code, error.message])
        }
      )
    })

    if (code !== 0) throw Error(`command db push failed with exit code ${code}, message: ${message}`)
  })
})
