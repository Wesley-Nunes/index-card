import type { Body, IndexCard, IndexCardFields } from '../indexCard.interface'

/**
 * Adds an index card to the indexCardData array based on the indexCardBody data.
 * @param {IndexCard[]} indexCardData - The array of index cards to add the new index card to.
 * @param {Body} indexCardBody - The data of the index card to be added.
 * @returns {IndexCard[]} - The updated array of index cards after adding the new index card.
 */
const addIndexCard = (
  indexCardData: IndexCard[],
  indexCardBody: Body
): IndexCard[] =>
  indexCardData.map(indexCard => {
    if (
      indexCard.universeTitle !== indexCardBody.universeTitle ||
      indexCard.storyTitle !== indexCardBody.storyTitle
    ) {
      return indexCard
    }

    indexCard.indexCards.forEach(({ position }) => {
      if (position === indexCardBody.field.position) {
        const error = new Error(
          'Invalid position. The position already exists.'
        )
        throw error
      }
    })

    const nextId = indexCard.indexCards.length
      ? Math.max(...indexCard.indexCards.map(iC => iC.id)) + 1
      : 1

    const newIndexCard: IndexCardFields = {
      id: nextId,
      sceneHeading: '',
      synopsis: '',
      conflict: '',
      position: indexCardBody.field.position!
    }
    const updatedIndexCards = [...indexCard.indexCards, newIndexCard].sort(
      (a, b) => a.position - b.position
    )

    return { ...indexCard, indexCards: updatedIndexCards }
  })

/**
 * Updates an index card in the indexCardData array based on the indexCardBody data.
 * @param {IndexCard[]} indexCardData - The array of index cards to update.
 * @param {Body} indexCardBody - The data of the index card to be updated.
 * @returns {IndexCard[]} - The updated array of index cards after updating the specified index card.
 * @throws {Error} - Throws an error if a required key is missing in indexCardBody.field.
 */
const updateIndexCard = (
  indexCardData: IndexCard[],
  indexCardBody: Body
): IndexCard[] =>
  indexCardData.map(indexCard => {
    if (
      indexCard.universeTitle !== indexCardBody.universeTitle ||
      indexCard.storyTitle !== indexCardBody.storyTitle
    ) {
      return indexCard
    }

    let positionTitleNotFound = true
    indexCard.indexCards.forEach(({ position }) => {
      if (position === indexCardBody.field.position) {
        positionTitleNotFound = false
      }
    })
    if (positionTitleNotFound) {
      const error = new Error('Invalid position. The position no exists.')
      throw error
    }

    const updatedIndexCards = indexCard.indexCards.map(iC => {
      if (iC.position !== indexCardBody.field.position) {
        return iC
      }
      const key = Object.keys(indexCardBody.field).find(
        prop => prop !== 'position'
      )

      if (!key) {
        throw new Error('Missing the key')
      }

      const updatedIndexCard = {
        ...iC,
        [key]: indexCardBody.field[key as keyof typeof indexCardBody.field]
      }

      return updatedIndexCard
    })

    return { ...indexCard, indexCards: updatedIndexCards }
  })

/**
 * Deletes an index card from the indexCardData array based on the position specified in indexCardBody.
 * @param {IndexCard[]} indexCardData - The array of index cards to delete from.
 * @param {Body} indexCardBody - The data of the index card to be deleted.
 * @returns {IndexCard[]} - The updated array of index cards after deleting the specified index card.
 */
const deleteIndexCardByPos = (
  indexCardData: IndexCard[],
  indexCardBody: Body
): IndexCard[] =>
  indexCardData.map(indexCard => {
    if (
      indexCard.universeTitle !== indexCardBody.universeTitle ||
      indexCard.storyTitle !== indexCardBody.storyTitle
    ) {
      return indexCard
    }

    let positionTitleNotFound = true
    indexCard.indexCards.forEach(({ position }) => {
      if (position === indexCardBody.field.position) {
        positionTitleNotFound = false
      }
    })
    if (positionTitleNotFound) {
      const error = new Error('Invalid position. The position no exists.')
      throw error
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
  const functionMap = {
    create: () => addIndexCard(data, indexCardBody),
    update: () => updateIndexCard(data, indexCardBody),
    delete: () => deleteIndexCardByPos(data, indexCardBody)
  }
  let universeTitleNotFound = true
  let storyTitleNotFound = true
  if (!Object.keys(indexCardBody).length) {
    const error = new Error('indexCardBody information missing')
    throw error
  }
  if (!indexCardBody.field.position) {
    const error = new Error('position information missing')
    throw error
  }

  data.forEach(({ universeTitle, storyTitle }) => {
    if (universeTitle === indexCardBody.universeTitle) {
      universeTitleNotFound = false
    }

    if (storyTitle === indexCardBody.storyTitle) {
      storyTitleNotFound = false
    }
  })

  if (universeTitleNotFound || storyTitleNotFound) {
    const error = new Error('The universe/story title is not found')
    throw error
  }

  return functionMap[operation.type]()
}
