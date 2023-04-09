import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import prisma from 'features/@generics/prisma'
import { Query } from 'features/indexCard/indexCard.interface'
import { options } from '../auth/[...nextauth]'

/**
 * @swagger
 * /indexcards:
 *  summary: Represents a group of index cards of timelines.
 *  get:
 *    summary: Retrieve index cards for a given timeline.
 *    description: Returns all index cards for a given timeline, sorted by position.
 *    parameters:
 *    - name: realityId
 *      in: query
 *      description: The ID of the reality.
 *      required: true
 *      schema:
 *        type: integer
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
 *        - readIndexcards
 *
 *  post:
 *    summary: Create a new index card.
 *    description: Create a new index card at given position of the current timeline.
 *    parameters:
 *    - name: realityId
 *      in: query
 *      description: The ID of the reality.
 *      required: true
 *      schema:
 *        type: integer
 *    - name: timelineId
 *      in: query
 *      description: The ID of the timeline.
 *      required: true
 *      schema:
 *        type: integer
 *    requestBody:
 *     description: The position to create the new index card.
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *          type: object
 *          properties:
 *            position:
 *              type: integer
 *              description: "The position of the index card within the timeline."
 *              example: 1
 *    responses:
 *      201:
 *        description: Created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/IndexCard'
 *      401:
 *        description: Authentication failed or user is not authorized to access this resource.
 *      500:
 *        description: Internal server error.
 *    security:
 *      - indexcard_auth:
 *        - createIndexcard
 */

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const session = await getServerSession(req, res, options)
    if (!session) {
      res.status(401).end()
      return
    }
    const { method, query, body } = req
    const { realityTitle, timelineTitle } = query as Query
    const email = session.user?.email as string

    switch (method) {
      case 'GET': {
        const allIndexCards = await prisma.indexCard.findMany({
          where: {
            timeline: {
              reality: {
                user: { email },
                title: realityTitle
              },
              title: timelineTitle
            }
          },
          orderBy: [
            {
              position: 'asc'
            }
          ]
        })

        res.status(200).json(allIndexCards)
        break
      }
      case 'POST': {
        // validar quando o position já existe

        const timeline = await prisma.timeline.findFirst({
          where: {
            title: timelineTitle,
            reality: { title: realityTitle, user: { email } }
          }
        })

        if (!timeline) {
          res.status(404).json({ error: 'Timeline not found' })
          return
        }

        const { position } = body

        const createdIndexCard = await prisma.indexCard.create({
          data: {
            position,
            timeline: { connect: { id: timeline.id } }
          }
        })

        res.status(201).json(createdIndexCard)
        break
      }
      default:
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export default handler
