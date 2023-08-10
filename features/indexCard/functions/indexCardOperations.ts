import type { ScopedMutator } from 'swr/_internal'
import { endpoints } from '../../@generics'
import indexCardService from '../indexCardService'
import dataMaker from './dataMaker'
import type { IndexCard, PartialIndexCard } from '../indexCard.interface'

/**
 * Provides operations for performing CRUD operations on index cards.
 * @param data
 * @param mutate
 * @param indexCardInfo
 * @returns An object containing functions to create, update, and delete index cards.
 */
const indexCardOperations = (data: IndexCard[], mutate: ScopedMutator) => {
  const createIndexCard = (position: number) => {
    indexCardService.createNewIndexCard(endpoints.indexCardsURI, {
      position
    })

    mutate(
      endpoints.indexCardsURI,
      dataMaker(data, { position }, { type: 'create' }),
      {
        revalidate: false
      }
    )
  }
  const updateIndexCardTextField = (partialBody: PartialIndexCard) => {
    const position = +window.location.pathname.slice(1)
    const body = {
      ...partialBody,
      position
    }
    indexCardService.updateIndexCard(endpoints.indexCardsURI, body)
    mutate(endpoints.indexCardsURI, dataMaker(data, body, { type: 'update' }), {
      revalidate: false
    })
  }
  const deleteIndexCard = (pos?: number) => {
    const position = pos || +window.location.pathname.slice(1)
    indexCardService.deleteIndexCard(
      `${endpoints.indexCardsURI}?position=${position}`
    )

    mutate(
      endpoints.indexCardsURI,
      dataMaker(data, { position }, { type: 'delete' }),
      {
        revalidate: false
      }
    )
  }

  return {
    createIndexCard,
    updateIndexCardTextField,
    deleteIndexCard
  }
}

export default indexCardOperations
