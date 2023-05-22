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
   */
  callbacks: {
    // @ts-ignore
    async session({ user, session }) {
      const userId = user.id
      const universe = await prisma.universe.findFirst({
        where: { userId }
      })
      const story = await prisma.story.findFirst({
        where: {
          universeId: universe?.id
        }
      })
      const indexCards = await prisma.indexCard.findFirst({
        where: {
          storyId: story?.id
        }
      })

      if (!universe) {
        await prisma.universe.create({
          data: {
            title: 'universe',
            user: {
              connect: {
                id: userId
              }
            }
          }
        })
      }
      if (!story && universe) {
        await prisma.story.create({
          data: {
            title: 'story',
            universe: {
              connect: {
                id: universe.id
              }
            }
          }
        })
      }
      if (!indexCards && story) {
        await prisma.indexCard.create({
          data: {
            position: 1,
            story: {
              connect: {
                id: story.id
              }
            }
          }
        })
      }

      return session
    }
  },
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
