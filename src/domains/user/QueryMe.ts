import { extendType } from 'nexus'

// me
export const MeQuery = extendType({
  type: 'Query',
  definition: t => {
    t.field('me', {
      type: 'User',
      resolve: (_root, _arg, { prisma, jwtPayload }) => {
        if (!jwtPayload?.userId) return null

        return prisma.user.findUnique({ where: { id: jwtPayload.userId }})
      }
    })
  }
})
