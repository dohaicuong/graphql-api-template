import { extendType, inputObjectType, nonNull, objectType } from 'nexus'
import bcrypt from 'bcrypt'
import { signToken } from '../../plugins/jwt'

export const LoginInput = inputObjectType({
  name: 'LoginInput',
  definition: t => {
    t.nonNull.string('email')
    t.nonNull.string('password')
  }
})

export const LoginPayload = objectType({
  name: 'LoginPayload',
  definition: t => {
    t.nonNull.string('token')
    t.nonNull.field('user', { type: 'User' })
  }
})

export const LoginMutation = extendType({
  type: 'Mutation',
  definition: t => {
    t.field('login', {
      args: { input: nonNull('LoginInput') },
      type: 'LoginPayload',
      resolve: async (_, { input }, { prisma }) => {
        const user = await prisma.user.findUnique({ where: { email: input.email }})
        if (!user) throw new Error('Invalid credentials')

        const isMatch = bcrypt.compare(input.password, user.password)
        if (!isMatch) throw new Error('Invalid credentials')
        
        const token = signToken({ userId: user.id })

        return { token, user }
      }
    })
  }
})
