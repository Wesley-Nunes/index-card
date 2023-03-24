import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import prisma from 'features/@generics/prisma'
import { options } from '../auth/[...nextauth]'

/**
 * @swagger
 * /indexcards:
 *  summary: Represents a group of index cards of timelines.
 *  get:
 *    summary: Retrieve index cards for a given timeline.
 *    description: Returns all index cards for a given timeline, sorted by position.
 *    parameters:
 *    - name: timelineId
 *      in: query
 *      description: The ID of the timeline.
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/IndexCard'
 *      401:
 *        description: Authentication failed or user is not authorized to access this resource.
 *      500:
 *        description: Internal server error.
 *    security:
 *      - indexcard_auth:
 *        - read:indexcards
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, options)
  if (!session) {
    res.status(401)
  } else {
    const { method, query } = req
    const { realityTitle, timelineTitle } = query

    switch (method) {
      case 'GET':
        try {
          const allIndexCards = await prisma.indexCard.findMany({
            where: {
              timeline: {
                reality: {
                  user: { email: session.user?.email as string },
                  title: realityTitle as string
                },
                title: timelineTitle as string
              }
            },
            orderBy: [
              {
                position: 'asc'
              }
            ]
          })

          res.status(200).json(allIndexCards)
        } catch (error) {
          res.status(500).json({ error: 'failed to load data' })
        }

        break
      default:
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  }
  res.end()
}
