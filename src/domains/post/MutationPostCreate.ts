import { extendType, inputObjectType, nonNull, objectType } from 'nexus'

export const PostCreateInput = inputObjectType({
  name: 'PostCreateInput',
  definition: t => {
    t.nonNull.string('title')
    t.nonNull.string('content')
  }
})

export const PostCreatePayload = objectType({
  name: 'PostCreatePayload',
  definition: t => {
    t.nonNull.field('post', { type: 'Post' })
  }
})

export const PostCreateMutation = extendType({
  type: 'Mutation',
  definition: t => {
    t.field('postCreate', {
      args: { input: nonNull('PostCreateInput') },
      type: 'PostCreatePayload',
      resolve: async (_, { input }, { prisma, jwtPayload }) => {
        if (!jwtPayload) throw new Error('Please login!')

        const post = await prisma.post.create({
          data: {
            title: input.title,
            content: input.content,
            authorId: jwtPayload.userId
          }
        })

        return { post }
      }
    })
  }
})
