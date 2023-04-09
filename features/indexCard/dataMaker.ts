import { IndexCard } from '@prisma/client'
import type { IndexCardBody, PositionBody } from './indexCard.interface'

const addIndexCard = (
  allIndexCards: IndexCard[],
  positionBody: PositionBody
) => {
  const nextId = Math.max(...allIndexCards.map(indexCard => indexCard.id)) + 1
  const posToInsert =
    allIndexCards.findIndex(indexCard => indexCard.position === nextId - 1) + 1

  const newIndexCard: IndexCard = {
    id: nextId,
    sceneHeading: '',
    synopsis: '',
    conflict: '',
    position: positionBody.position,
    timelineId: allIndexCards.find(indexCard => indexCard)?.timelineId as number
  }

  return [
    ...allIndexCards.slice(0, posToInsert),
    newIndexCard,
    ...allIndexCards.slice(posToInsert)
  ]
}

const updateIndexCardById = (
  indexCardData: IndexCard[],
  indexCardBody: IndexCardBody,
  id: number
) => {
  const index = indexCardData.findIndex(card => card.id === id)

  if (index === -1) {
    throw new Error(`Index card with ID ${id} not found`)
  }

  const updatedIndexCardData = [
    ...indexCardData.slice(0, index),
    { ...indexCardData[index], ...indexCardBody },
    ...indexCardData.slice(index + 1)
  ]

  return updatedIndexCardData
}

export default function dataMaker(
  data: IndexCard[],
  indexCardBody: IndexCardBody,
  id?: number
) {
  if ('position' in indexCardBody) {
    return addIndexCard(data, indexCardBody)
  }

  if (id === undefined) {
    return null
  }

  return updateIndexCardById(data, indexCardBody, id)
}
