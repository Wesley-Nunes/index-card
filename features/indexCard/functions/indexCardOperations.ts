import type { ScopedMutator } from 'swr/_internal'
import { endpoints } from '../../@generics'
import indexCardService from '../indexCardService'
import dataMaker from './dataMaker'
import type {
  IndexCard,
  PartialIndexCard,
  IndexCardPosAndTitles
} from '../indexCard.interface'

/**
 * Provides operations for performing CRUD operations on index cards.
 * @param data
 * @param mutate
 * @param indexCardInfo
 * @returns An object containing functions to create, update, and delete index cards.
 */
const indexCardOperations = (
  data: IndexCard[],
  mutate: ScopedMutator,
  indexCardInfo: IndexCardPosAndTitles
) => {
  const { universeTitle, storyTitle, position } = indexCardInfo

  const createIndexCard = (body: number) => {
    indexCardService.createNewIndexCard(endpoints.indexCardsURI, {
      universeTitle,
      storyTitle,
      position: body
    })

    mutate(
      endpoints.indexCardsURI,
      dataMaker(
        data,
        {
          universeTitle,
          storyTitle,
          field: {
            position: body
          }
        },
        { type: 'create' }
      ),
      {
        revalidate: false
      }
    )
  }

  const updateIndexCardTextField = (body: PartialIndexCard) => {
    const requestBody = {
      universeTitle,
      storyTitle,
      field: {
        ...body,
        position
      }
    }
    indexCardService.updateIndexCard(endpoints.indexCardsURI, requestBody)

    mutate(
      endpoints.indexCardsURI,
      dataMaker(data, requestBody, { type: 'update' }),
      {
        revalidate: false
      }
    )
  }

  const deleteIndexCard = () => {
    const requestBody = {
      universeTitle,
      storyTitle,
      field: {
        position
      }
    }
    indexCardService.deleteIndexCard(
      `${endpoints.indexCardsURI}?universeTitle=${universeTitle}&storyTitle=${storyTitle}&position=${position}`
    )

    mutate(
      endpoints.indexCardsURI,
      dataMaker(data, requestBody, { type: 'delete' }),
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
