import type { ScopedMutator } from 'swr/_internal'
import indexCardService from '../indexCardService'
import { indexCardsURI } from '../../@generics/endpoints'
import type {
  IndexCard,
  PartialIndexCard,
  IndexCardPosAndTitles
} from '../indexCard.interface'
import dataMaker from './dataMaker'

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
    indexCardService.createNewIndexCard(indexCardsURI, {
      universeTitle,
      storyTitle,
      position: body
    })

    mutate(
      indexCardsURI,
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
    indexCardService.updateIndexCard(indexCardsURI, requestBody)

    mutate(indexCardsURI, dataMaker(data, requestBody, { type: 'update' }), {
      revalidate: false
    })
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
      `${indexCardsURI}?universeTitle=${universeTitle}&storyTitle=${storyTitle}&position=${position}`
    )

    mutate(indexCardsURI, dataMaker(data, requestBody, { type: 'delete' }), {
      revalidate: false
    })
  }

  return {
    createIndexCard,
    updateIndexCardTextField,
    deleteIndexCard
  }
}

export default indexCardOperations
