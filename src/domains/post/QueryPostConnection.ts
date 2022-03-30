import { extendType } from 'nexus'
import { connectionFromArray } from 'graphql-relay'

export const PostConnectionQuery = extendType({
  type: 'Query',
  definition: t => {
    t.connectionField('posts', {
      type: 'Post',
      resolve: async (_, args, { prisma }) => {
        const posts = await prisma.post.findMany()

        return connectionFromArray(posts, args)
      }
    })
  }
})
