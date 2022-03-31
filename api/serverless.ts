import dotenv from 'dotenv'
dotenv.config()

import { createServer } from '../src/server'
import { VercelRequest, VercelResponse } from '@vercel/node'

const app = createServer()

export default async (req: VercelRequest, res: VercelResponse) => {
  await app.ready()
  app.server.emit('request', req, res)
}
