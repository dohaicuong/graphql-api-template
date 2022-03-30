import { makeSchema, connectionPlugin } from 'nexus'
import * as types from '../domains'

export const schema = makeSchema({
  types,
  plugins: [
    connectionPlugin()
  ],
  outputs: {
    schema: __dirname + '/../../schema.graphql',
    typegen: __dirname + '/../../nexus.ts',
  },
  contextType: {
    module: require.resolve('./context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
})
