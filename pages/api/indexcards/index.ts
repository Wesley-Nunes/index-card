/* eslint-disable consistent-return */
/* eslint-disable no-console */
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import prisma from 'features/@generics/prisma'
import { options } from '../auth/[...nextauth]'

type Handler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>

interface MethodHandlers {
  [method: string]: Handler
}

const postHandler: Handler = async (req, res) => {
  try {
    const session = await getServerSession(req, res, options)
    if (!session || !session.user) {
      return res
        .status(401)
        .json({ message: 'Authorization information is missing or invalid.' })
    }
    const { email } = session.user
    if (!email) {
      return res
        .status(400)
        .json({ message: 'Request payload is missing or invalid.' })
    }
    if (!('position' in req.body) || Object.keys(req.body).length !== 1) {
      return res.status(400).json({
        message: 'Wrong object key. The body only accept: position.'
      })
    }
    const { position } = req.body
    if (typeof position !== 'number') {
      return res.status(400).json({
        message:
          'Wrong variable type. The position type should be of type number.'
      })
    }

    const { id } = await prisma.user.findUniqueOrThrow({ where: { email } })
    const createdIndexCard = await prisma.indexCard.create({
      data: { position, user: { connect: { id } } },
      select: {
        id: true,
        position: true,
        sceneHeading: true,
        synopsis: true,
        conflict: true,
        userId: false
      }
    })
    res.status(201).json(createdIndexCard)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

const getHandler: Handler = async (req, res) => {
  try {
    const session = await getServerSession(req, res, options)
    if (!session || !session.user) {
      return res
        .status(401)
        .json({ message: 'Authorization information is missing or invalid.' })
    }
    const { email } = session.user
    if (!email) {
      return res
        .status(400)
        .json({ message: 'Request payload is missing or invalid.' })
    }

    const indexCards = await prisma.indexCard.findMany({
      where: {
        user: { email }
      },
      select: {
        id: true,
        position: true,
        sceneHeading: true,
        synopsis: true,
        conflict: true,
        userId: false
      },
      orderBy: [
        {
          position: 'asc'
        }
      ]
    })
    return res.status(200).json(indexCards)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const patchHandler: Handler = async (req, res) => {
  try {
    const session = await getServerSession(req, res, options)
    if (!session || !session.user) {
      return res
        .status(401)
        .json({ message: 'Authorization information is missing or invalid.' })
    }
    const { email } = session.user
    if (!email) {
      return res
        .status(400)
        .json({ message: 'Request payload is missing or invalid.' })
    }

    const inputFieldProps = ['sceneHeading', 'synopsis', 'conflict']
    const fieldProps = [...inputFieldProps, 'position']
    const { body } = req
    Object.keys(body).forEach(prop => {
      if (!fieldProps.includes(prop)) {
        res.status(400).json({
          message:
            'Wrong object key. The field only accepts: sceneHeading, synopsis, conflict or position.'
        })
      }
    })
    if (body.position && typeof body.position !== 'number') {
      res.status(400).json({
        message:
          'Wrong variable type. The position type should be of type number.'
      })
    }
    inputFieldProps.forEach(prop => {
      if (body[prop] && typeof body[prop] !== 'string') {
        res.status(400).json({
          message:
            'Wrong variable type. The position type should be of type number.'
        })
      }
    })
    const inputField = inputFieldProps.reduce(
      (obj, prop) => ({
        ...obj,
        [prop]: body[prop]
      }),
      {}
    )

    await prisma.indexCard.updateMany({
      where: {
        position: body.position,
        user: { email }
      },
      data: inputField
    })

    res.status(204).end()
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

const deleteHandler: Handler = async (req, res) => {
  try {
    const session = await getServerSession(req, res, options)
    if (!session || !session.user) {
      return res
        .status(401)
        .json({ message: 'Authorization information is missing or invalid.' })
    }
    const { email } = session.user
    if (!email) {
      return res
        .status(400)
        .json({ message: 'Request payload is missing or invalid.' })
    }

    const { query } = req
    if (!('position' in query) || !query.position) {
      return res.status(400).json({
        message: 'Wrong query name. The query only accepts: position.'
      })
    }

    const position = +query.position
    const { id } = await prisma.user.findUniqueOrThrow({ where: { email } })
    await prisma.indexCard.delete({
      where: {
        userId_position: {
          userId: id,
          position
        }
      }
    })
    res.status(204).end()
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

const methodHandlers: MethodHandlers = {
  POST: (req, res) => postHandler(req, res),
  GET: (req, res) => getHandler(req, res),
  PATCH: (req, res) => patchHandler(req, res),
  DELETE: (req, res) => deleteHandler(req, res)
}

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    if (!['POST', 'GET', 'PATCH', 'DELETE'].includes(req.method!)) {
      res.setHeader('Allow', ['POST', 'GET', 'PATCH', 'DELETE'])
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
