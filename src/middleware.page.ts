import { withAuth } from 'next-auth/middleware'

export default withAuth({
  callbacks: {
    authorized: ({ token }) => token?.role === 'user',
  },
  pages: {
    signIn: '/login',
  },
})
export const config = { matcher: ['/app/:path*'] }
