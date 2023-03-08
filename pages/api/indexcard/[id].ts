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
    const { query, body, method } = req
    const queryId = parseInt(query.id as string, 10)

    switch (method) {
      case 'PATCH':
        try {
          const updateIndex = await prisma.indexCard.updateMany({
            where: { id: queryId },
            data: body
          })
          res.status(200).json(updateIndex)
        } catch (err) {
          res.status(500).json({ error: 'failed to load data' })
        }

        break
      default:
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  }
  res.end()
}
