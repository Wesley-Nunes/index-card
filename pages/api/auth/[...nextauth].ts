import { NextApiHandler } from 'next'
import NextAuth from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GitHubProvider from 'next-auth/providers/github'
import prisma from 'features/@generics/prisma'

export const options = {
  /**
   * Hey, developer.
   * Please, ignore this callbacks object,
   * for now, this will help me focus on the most priority part of the app.
   * : { user: User; session: Session }
   */
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!
    })
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET
}
const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options)
export default authHandler
