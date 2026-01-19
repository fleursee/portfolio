import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('Authorize:', credentials)  // Debug
        if (!credentials?.email || !credentials?.password) return null
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        })
        console.log('User:', user ? { id: user.id, role: user.role, hasPass: !!user.password } : null)  // Debug
        if (!user || !user.password || user.role !== 'ADMIN') return null
        const valid = await bcrypt.compare(credentials.password as string, user.password)
        console.log('Valid pass?', valid)  // Debug
        if (!valid) return null
        return { id: user.id, email: user.email!, name: user.name, role: user.role }
      },
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.role) token.role = user.role
      return token
    },
    async session({ session, token }) {
      if (token?.role) (session.user).role = token.role
      return session
    },
  },
  pages: { signIn: '/admin/login', error: '/admin/login' },  // Custom error to login
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
