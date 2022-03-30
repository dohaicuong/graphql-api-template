import { extendType, objectType } from 'nexus'

export const User = objectType({
  name: 'User',
  definition: t => {
    t.nonNull.id('id')
    t.nonNull.string('email')
    t.nonNull.string('name')
  }
})

export const PostExtendUser = extendType({
  type: 'Post',
  definition: t => {
    t.nonNull.field('author', {
      type: 'User',
      resolve: (post, _args, { prisma }) => {
        // post need authorId to create
        // so if there is a post, it must has author
        return prisma.post.findUnique({ where: { id: post.id }}).author() as any
      }
    })
  }
})