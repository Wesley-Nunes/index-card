import { IndexCard } from '@prisma/client'
import { IndexCardBody } from './indexCard.interface'

function indexCardDataUpdater(
  indexCardData: IndexCard[],
  indexCardBody: IndexCardBody,
  id: number
) {
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

export default indexCardDataUpdater
