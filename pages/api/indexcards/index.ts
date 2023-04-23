/* eslint-disable no-console */
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import prisma from 'features/@generics/prisma'
import {
  Query,
  DeleteQuery,
  MethodHandlers,
  Handler,
  PositionBody
} from 'features/indexCard/indexCard.interface'
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
 *  delete:
 *    summary: Delete an index card at a specific position.
 *    description: Delete the index card located at a specific position within the timeline.
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
 *    - name: position
 *      in: query
 *      description: The position of the index card.
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *      204:
 *        description: No content.
 *      401:
 *        description: Authentication failed or user is not authorized to access this resource.
 *      500:
 *        description: Internal server error.
 *    security:
 *      - indexcard_auth:
 *        - deleteIndexcard
 */

const getHandler: Handler = async (req, res) => {
  try {
    const { query } = req
    const { realityTitle, timelineTitle } = query as Query

    const session = await getServerSession(req, res, options)
    if (!session) {
      res.status(401).end()
      return
    }
    const email = session.user?.email as string

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
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

const postHandler: Handler = async (req, res) => {
  try {
    const session = await getServerSession(req, res, options)
    if (!session) {
      res.status(401).end()
      return
    }

    const { timelineTitle, realityTitle } = req.query as Query
    const email = session.user?.email as string

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

    const { position } = req.body as PositionBody

    if (position === undefined) {
      res.status(400).json({ error: 'Position is required' })
      return
    }

    const createdIndexCard = await prisma.indexCard.create({
      data: {
        position,
        timeline: { connect: { id: timeline.id } }
      }
    })

    res.status(201).json(createdIndexCard)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

const deleteHandler: Handler = async (req, res) => {
  try {
    const { realityTitle, timelineTitle, position } = req.query as DeleteQuery
    const pos: number = +position
    const session = await getServerSession(req, res, options)
    if (!session) {
      res.status(401).end()
      return
    }
    const email = session.user?.email as string

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

    console.log(typeof pos)

    await prisma.indexCard.delete({
      where: {
        timelineId_position: {
          position: pos,
          timelineId: timeline.id
        }
      }
    })

    res.status(204).json(null)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

const methodHandlers: MethodHandlers = {
  GET: (req, res) => getHandler(req, res),
  POST: (req, res) => postHandler(req, res),
  DELETE: (req, res) => deleteHandler(req, res)
}

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    if (!['GET', 'POST', 'DELETE'].includes(req.method!)) {
      res.setHeader('Allow', ['GET', 'POST', 'DELETE'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
      return
    }

    const { method } = req
    const handlerRes = methodHandlers[method!]
    try {
      await handlerRes(req, res)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal server error' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export default handler
