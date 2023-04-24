import NextAuth, {
  NextAuthOptions,
  User as AdapterUser,
  Profile,
  Account as AdapterAccount,
} from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '@/lib/prismadb'

export function findUserByEmail(email) {
  return prisma.user.findUnique({
    where: { email },
  })
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    jwt(params) {
      if (params.token) {
        params.token.role = 'user'
      }
      return params.token
    },
    async signIn({
      user,
    }: {
      user: AdapterUser
      account: AdapterAccount
      profile: Profile
    }) {
      const existingUser = await findUserByEmail(user.email)

      if (existingUser) return true
      return `/signup?email=${user.email}`
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
}

export default NextAuth({
  ...authOptions,
})
