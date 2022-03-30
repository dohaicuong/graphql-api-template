import { connectionFromArray } from 'graphql-relay'
import { extendType, objectType } from 'nexus'

export const Post = objectType({
  name: 'Post',
  definition: t => {
    t.nonNull.id('id')
    t.nonNull.string('title')
    t.nonNull.string('content')
  }
})

export const UserExtendPostConnection = extendType({
  type: 'User',
  definition: t => {
    t.connectionField('posts', {
      type: 'Post',
      resolve: async (user, args, { prisma }) => {
        const posts = await prisma.user.findUnique({ where: { id: user.id }}).posts()

        return connectionFromArray(posts, args)
      }
    })
  }
})
