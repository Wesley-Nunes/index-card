import { NextApiHandler } from 'next'
import NextAuth, { AuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GitHubProvider from 'next-auth/providers/github'
import prisma from 'features/@generics/prisma'

export const options: AuthOptions = {
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
