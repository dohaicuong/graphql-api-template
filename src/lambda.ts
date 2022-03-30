import lambda from 'aws-lambda-fastify'
import { createServer } from './server'

const server = createServer()

const proxy = lambda(server)

exports.handler = proxy
