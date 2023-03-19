import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import prisma from 'features/@generics/prisma'
import { options } from '../auth/[...nextauth]'

/**
 * @swagger
 * /timelines:
 *  summary: Represents a group of timelines of reality.
 *  get:
 *    summary: Return all timelines of one reality.
 *    parameters:
 *    - name: realityTitle
 *      in: query
 *      description: The title of the reality
 *      required: true
 *      schema:
 *        type: string
 *    responses:
 *      200:
 *        description: Ok
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                    format: int32
 *                    description: The id of the timeline
 *                    example: 1
 *                  title:
 *                    type: string
 *                    description: The title of the timeline
 *                    example: Stable timeline
 *                  description:
 *                    type: string
 *                    description: The description of the timeline
 *                    example: The stable timeline is the baseline of the story
 *      401:
 *        description: Authorization information is missing or invalid.
 *      '5XX':
 *        description: Unexpected error.
 *    security:
 *      - indexcard_auth:
 *        - read:timelines
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, options)
  if (!session) {
    res
      .status(401)
      .json({ message: 'Authorization information is missing or invalid.' })
  } else {
    const { realityTitle } = req.query

    const timelines = await prisma.timeline.findMany({
      where: {
        reality: {
          user: {
            email: session.user?.email as string
          },
          title: realityTitle as string
        }
      },
      orderBy: [
        {
          dateOfCreation: 'asc'
        }
      ]
    })

    const timelinesSimplified = timelines.map(({ id, title, description }) => ({
      id,
      title,
      description
    }))

    res.send(timelinesSimplified)
  }
  return res.end()
}
