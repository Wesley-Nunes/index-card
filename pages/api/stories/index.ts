import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import prisma from 'features/@generics/prisma'
import { options } from '../auth/[...nextauth]'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', ['GET'])
      return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    const session = await getServerSession(req, res, options)

    if (!session || !session.user) {
      return res
        .status(401)
        .json({ message: 'Authorization information is missing or invalid.' })
    }

    const userEmail = session.user.email

    if (!userEmail) {
      return res
        .status(400)
        .json({ message: 'Request payload is missing or invalid.' })
    }

    const stories = await prisma.story.findMany({
      where: {
        universe: {
          user: {
            email: userEmail
          }
        }
      },
      select: {
        title: true,
        description: true,
        universe: { select: { title: true } }
      },
      orderBy: [
        {
          universeId: 'asc'
        }
      ]
    })

    return res.status(200).json(stories)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export default handler
