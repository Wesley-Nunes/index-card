import prisma from 'features/@generics/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
