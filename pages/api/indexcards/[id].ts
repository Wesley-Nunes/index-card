import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import prisma from 'features/@generics/prisma'
import { options } from '../auth/[...nextauth]'

/**
 * @swagger
 * /indexcards/{id}:
 *   summary: Update an index card for a given timeline.
 *   patch:
 *    description: Updates an index card for a given timeline.
 *    parameters:
 *     - name: id
 *       in: path
 *       description: The ID of the index card.
 *       required: true
 *       schema:
 *         type: integer
 *    requestBody:
 *     description: The updated index card object.
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/IndexCard'
 *    responses:
 *      200:
 *       description: OK
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IndexCard'
 *      401:
 *       description: Authentication failed or user is not authorized to access this resource.
 *      404:
 *       description: The requested resource was not found.
 *      500:
 *       description: Internal server error.
 *    security:
 *      - indexcard_auth:
 *        - write:indexcards
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, options)
  if (!session) {
    res.status(401)
  } else {
    const { body, method, query } = req
    const { realityTitle, timelineTitle } = query

    const queryId = parseInt(query.id as string, 10)

    switch (method) {
      case 'PATCH':
        try {
          const updateIndex = await prisma.indexCard.updateMany({
            where: {
              timeline: {
                reality: {
                  user: { email: session.user?.email as string },
                  title: realityTitle as string
                },
                title: timelineTitle as string
              },
              id: queryId
            },
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
