import prisma from 'features/@generics/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method } = req
  const queryId = query.id as string
  const userData = await prisma.user.findMany({
    where: { id: queryId },
    include: {
      realities: true
    }
  })

  switch (method) {
    case 'GET':
      res.status(200).json(userData)
      break
    case 'PATCH':
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
