/* eslint-disable consistent-return */
/* eslint-disable no-console */
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { IndexCard } from '@prisma/client'
import prisma from 'features/@generics/prisma'
import { options } from '../auth/[...nextauth]'

interface FormattedIndexCards {
  storyTitle: string
  universeTitle: string
  indexCards: Omit<IndexCard, 'storyId'>[]
}

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

    const userEmail = session.user.email

    if (!userEmail) {
      return res
        .status(400)
        .json({ message: 'Request payload is missing or invalid.' })
    }
    const bodyProps = ['storyTitle', 'universeTitle', 'position']

    const { body } = req
    Object.keys(body).forEach(prop => {
      if (!bodyProps.includes(prop)) {
        return res.status(400).json({
          message:
            'Wrong object key. The body only accepts: storyTitle, universeTitle or position.'
        })
      }
    })
    bodyProps.forEach(prop => {
      if (!body[prop]) {
        return res.status(400).json({
          message: `Missing parameters. The parameter ${prop} is required.`
        })
      }
    })
    bodyProps.forEach(prop => {
      if (prop === 'position') {
        if (typeof body[prop] !== 'number') {
          return res.status(400).json({
            message:
              'Wrong variable type. The position type should be of type number.'
          })
        }
      } else if (typeof body[prop] !== 'string') {
        return res.status(400).json({
          message: `Wrong variable type. The ${prop} type should be of type string.`
        })
      }
    })

    const { storyTitle, universeTitle, position } = body

    const story = await prisma.story.findFirst({
      where: {
        title: storyTitle,
        universe: {
          title: universeTitle,
          user: {
            email: userEmail
          }
        }
      }
    })

    if (!story) {
      return res.status(404).json({ message: 'Story not found' })
    }

    const createdIndexCard = await prisma.indexCard.create({
      data: {
        position,
        story: {
          connect: {
            id: story.id
          }
        }
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

    const userEmail = session.user.email

    if (!userEmail) {
      return res
        .status(400)
        .json({ message: 'Request payload is missing or invalid.' })
    }
    const indexCards = await prisma.indexCard.findMany({
      where: {
        story: {
          universe: {
            user: {
              email: userEmail
            }
          }
        }
      },
      select: {
        id: true,
        position: true,
        sceneHeading: true,
        synopsis: true,
        conflict: true,
        story: {
          select: { title: true, universe: { select: { title: true } } }
        }
      },
      orderBy: [
        {
          position: 'asc'
        }
      ]
    })

    const formattedIndexCards = indexCards.reduce(
      (acc: FormattedIndexCards[], cur) => {
        const { story, ...rest } = cur
        const indexCard = { ...rest }
        const storyIndex = acc.findIndex(
          (item: FormattedIndexCards) =>
            item.storyTitle === story.title &&
            item.universeTitle === story.universe.title
        )
        if (storyIndex === -1) {
          acc.push({
            storyTitle: story.title,
            universeTitle: story.universe.title,
            indexCards: [indexCard]
          })
        } else {
          acc[storyIndex].indexCards.push(indexCard)
        }
        return acc
      },
      []
    )

    return res.status(200).json(formattedIndexCards)
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

    const userEmail = session.user.email

    if (!userEmail) {
      return res
        .status(400)
        .json({ message: 'Request payload is missing or invalid.' })
    }
    const bodyProps = ['storyTitle', 'universeTitle', 'field']
    const inputFieldProps = ['sceneHeading', 'synopsis', 'conflict']
    const fieldProps = [...inputFieldProps, 'position']

    const { body } = req
    Object.keys(body).forEach(prop => {
      if (!bodyProps.includes(prop)) {
        res.status(400).json({
          message:
            'Wrong object key. The body only accepts: storyTitle, universeTitle or field.'
        })
      }
    })
    bodyProps.forEach(prop => {
      if (!body[prop]) {
        res.status(400).json({
          message: `Missing parameters. The parameter ${prop} is required.`
        })
      }
    })
    bodyProps.forEach(prop => {
      if (prop === 'field') {
        if (typeof body[prop] !== 'object') {
          res.status(400).json({
            message:
              'Wrong variable type. The field type should be of type object.'
          })
        }
      } else if (typeof body[prop] !== 'string') {
        res.status(400).json({
          message: `Wrong variable type. The ${prop} type should be of type string.`
        })
      }
    })

    const { storyTitle, universeTitle, field } = body
    Object.keys(field).forEach(prop => {
      if (!fieldProps.includes(prop)) {
        res.status(400).json({
          message:
            'Wrong object key. The field only accepts: sceneHeading, synopsis, conflict or position.'
        })
      }
    })
    if (field.position && typeof field.position !== 'number') {
      res.status(400).json({
        message:
          'Wrong variable type. The position type should be of type number.'
      })
    }
    inputFieldProps.forEach(prop => {
      if (field[prop] && typeof field[prop] !== 'string') {
        res.status(400).json({
          message:
            'Wrong variable type. The position type should be of type number.'
        })
      }
    })

    const inputField = inputFieldProps.reduce(
      (obj, prop) => ({
        ...obj,
        [prop]: field[prop]
      }),
      {}
    )

    await prisma.indexCard.updateMany({
      where: {
        position: field.position,
        story: {
          title: storyTitle,
          universe: {
            title: universeTitle,
            user: {
              email: userEmail
            }
          }
        }
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

    const userEmail = session.user.email

    if (!userEmail) {
      return res
        .status(400)
        .json({ message: 'Request payload is missing or invalid.' })
    }
    const queryProps = ['storyTitle', 'universeTitle', 'position']
    const { query } = req
    Object.keys(query).forEach(prop => {
      if (!queryProps.includes(prop)) {
        return res.status(400).json({
          message:
            'Wrong query name. The query only accepts: storyTitle, universeTitle or position.'
        })
      }
    })
    queryProps.forEach(prop => {
      if (!query[prop]) {
        return res.status(400).json({
          message: `Missing parameters. The parameter ${prop} is required.`
        })
      }
    })
    queryProps.forEach(prop => {
      if (typeof query[prop] !== 'string') {
        return res.status(400).json({
          message: `Wrong variable type. The ${prop} type should be of type string.`
        })
      }
    })

    const { storyTitle, universeTitle, position } = query
    const story = await prisma.story.findFirst({
      where: {
        indexCards: {
          some: {
            position: +position!
          }
        },
        title: storyTitle as string,
        universe: {
          title: universeTitle as string,
          user: {
            email: userEmail
          }
        }
      }
    })

    if (!story) {
      return res.status(404).json({ message: 'Story not found' })
    }

    await prisma.indexCard.delete({
      where: {
        storyId_position: {
          storyId: story.id,
          position: +position!
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
