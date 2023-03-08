import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import prisma from 'features/@generics/prisma'
import { options } from '../auth/[...nextauth]'

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, options)
  if (!session) {
    res.status(401)
  } else {
    const { query, method } = req
    const queryId = parseInt(query.id as string, 10)
    const allIndexCards = await prisma.timeline.findMany({
      where: { id: queryId },
      include: {
        indexCards: true
      }
    })

    switch (method) {
      case 'GET':
        res.status(200).json(allIndexCards)
        break
      case 'PATCH':
      default:
        res.setHeader('Allow', ['GET'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  }
  res.end()
}
