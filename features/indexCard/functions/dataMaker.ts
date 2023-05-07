import type { Body, IndexCard, IndexCardFields } from '../indexCard.interface'

const addIndexCard = (indexCardData: IndexCard[], indexCardBody: Body) =>
  indexCardData.map(indexCard => {
    if (
      indexCard.universeTitle !== indexCardBody.universeTitle ||
      indexCard.storyTitle !== indexCardBody.storyTitle
    ) {
      return indexCard
    }

    const nextId = Math.max(...indexCard.indexCards.map(iC => iC.id)) + 1

    const posToInsert =
      indexCard.indexCards.findIndex(iC => iC.id === nextId - 1) + 1

    const newIndexCard: IndexCardFields = {
      id: nextId,
      sceneHeading: '',
      synopsis: '',
      conflict: '',
      position: indexCardBody.position!
    }

    const updatedIndexCards = [
      ...indexCard.indexCards.slice(0, posToInsert),
      newIndexCard,
      ...indexCard.indexCards.slice(posToInsert)
    ]

    return { ...indexCard, indexCards: updatedIndexCards }
  })

const updateIndexCard = (indexCardData: IndexCard[], indexCardBody: Body) =>
  indexCardData.map(indexCard => {
    if (
      indexCard.universeTitle !== indexCardBody.universeTitle ||
      indexCard.storyTitle !== indexCardBody.storyTitle
    ) {
      return indexCard
    }
    const updatedIndexCards = indexCard.indexCards.map(iC => {
      if (iC.position !== indexCardBody.field.position) {
        return iC
      }
      const key = Object.keys(indexCardBody.field).find(
        prop => prop !== 'position'
      )

      if (!key) {
        throw new Error('Missing th key')
      }

      const updatedIndexCard = {
        ...iC,
        [key]: indexCardBody.field[key as keyof typeof indexCardBody.field]
      }

      return updatedIndexCard
    })

    return { ...indexCard, indexCards: updatedIndexCards }
  })

const deleteIndexCardByPos = (
  indexCardData: IndexCard[],
  indexCardBody: Body
) =>
  indexCardData.map(indexCard => {
    if (
      indexCard.universeTitle !== indexCardBody.universeTitle ||
      indexCard.storyTitle !== indexCardBody.storyTitle
    ) {
      return indexCard
    }

    const updatedIndexCards = indexCard.indexCards.filter(
      iC => iC.position !== indexCardBody.field.position
    )

    return { ...indexCard, indexCards: updatedIndexCards }
  })

/**
 * A utility function that returns a new array of index cards after performing
 * a CRUD operation on them.
 * @param data The array of index cards to perform the operation on.
 * @param indexCardBody The request body containing the index card data and metadata.
 * @param operation - The operation to perform on the index cards.
 * @returns An array of index cards after the operation has been performed.
 */
export default function dataMaker(
  data: IndexCard[],
  indexCardBody: Body,
  operation: {
    type: 'create' | 'update' | 'delete'
  }
): IndexCard[] {
  if (operation.type === 'create') {
    return addIndexCard(data, indexCardBody)
  }

  if (operation.type === 'update') {
    return updateIndexCard(data, indexCardBody)
  }

  return deleteIndexCardByPos(data, indexCardBody)
}
