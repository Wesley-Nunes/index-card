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
 *        - readTimelines
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
    const { method, query } = req
    const realityTitle = query.realityTitle as string

    switch (method) {
      case 'GET':
        try {
          const timelines = await prisma.timeline.findMany({
            where: {
              reality: {
                user: {
                  email: session.user?.email as string
                },
                title: realityTitle
              }
            },
            select: {
              id: true,
              title: true,
              description: true
            },
            orderBy: [
              {
                dateOfCreation: 'asc'
              }
            ]
          })

          // Temporarily keep the error handling here.
          if (!timelines.length) {
            const reality = await prisma.reality.findFirst({
              where: { title: realityTitle }
            })
            if (!reality) {
              res.status(404).json({ error: 'Reality not found' })
            }
          }

          // const timelinesSimplified = timelines.map(
          //   ({ id, title, description }) => ({
          //     id,
          //     title,
          //     description
          //   })
          // )

          res.status(200).json(timelines)
        } catch (error) {
          res.status(500).json({ message: error })
        }
        break
      default:
        res.status(405).end(`Method ${method} Not Allowed`)
        break
    }
  }
  return res.end()
}
