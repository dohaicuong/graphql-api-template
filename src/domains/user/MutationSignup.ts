import { extendType, inputObjectType, nonNull, objectType } from 'nexus'
import bcrypt from 'bcrypt'
import { signToken } from '../../plugins/jwt'

export const SignupInput = inputObjectType({
  name: 'SignupInput',
  definition: t => {
    t.nonNull.string('email')
    t.nonNull.string('password')
    t.nonNull.string('name')
  }
})

export const SignupPayload = objectType({
  name: 'SignupPayload',
  definition: t => {
    t.nonNull.string('token')
    t.nonNull.field('user', { type: 'User' })
  }
})

export const SignupMutation = extendType({
  type: 'Mutation',
  definition: t => {
    t.field('signup', {
      args: { input: nonNull('SignupInput' ) },
      type: 'SignupPayload',
      resolve: async (_, { input }, { prisma }) => {
        const hashedPassword = await bcrypt.hash(input.password, 10)

        const newUser = await prisma.user.create({
          data: {
            email: input.email,
            password: hashedPassword,
            name: input.name
          }
        })

        const token = signToken({ userId: newUser.id })

        return {
          token,
          user: newUser
        }
      }
    })
  }
})
