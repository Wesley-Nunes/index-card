import { IndexCard } from '@prisma/client'
import { IndexCardBody } from './editor.interface'

function indexCardDataUpdater(
  indexCardData: IndexCard[],
  indexCardBody: IndexCardBody,
  id: number
) {
  const updatedIndexCardData = indexCardData.map(oldIndexCard => {
    if (oldIndexCard.id === id) {
      const updatedIndexCard = {
        ...oldIndexCard,
        ...indexCardBody
      }

      return updatedIndexCard
    }
    return oldIndexCard
  })

  return updatedIndexCardData
}

export default indexCardDataUpdater
