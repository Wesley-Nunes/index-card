import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import prisma from 'features/@generics/prisma'
import { options } from '../auth/[...nextauth]'

/**
 * @swagger
 * /realities:
 *  get:
 *    summary: Return all realities of the authenticated user.
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
 *                    description: The id of the reality
 *                    example: 1
 *                  title:
 *                    type: string
 *                    description: The title of the reality
 *                    example: Reality base
 *                  description:
 *                    type: string
 *                    description: The description of the reality
 *                    example: The reality base is the starting point of the universe
 *      401:
 *        description: Authorization information is missing or invalid.
 *      '5XX':
 *        description: Unexpected error.
 *    security: [
 *      indexcard_auth: [
 *        read:realities
 *      ]
 *    ]
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
    const realities = await prisma.reality.findMany({
      where: { user: { email: session.user?.email as string } },
      orderBy: [
        {
          dateOfCreation: 'asc'
        }
      ]
    })
    const realitiesSimplified = realities.map(({ id, title, description }) => ({
      id,
      title,
      description
    }))
    res.status(200).json(realitiesSimplified)
  }
  res.end()
}
