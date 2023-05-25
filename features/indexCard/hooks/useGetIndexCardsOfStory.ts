import useSWR from 'swr'
import { useRouter } from 'next/router'
import { slugify, endpoints, fetcher, urls } from '../../@generics'
import getFilteredIndexCards from '../functions/getFilteredIndexCards'
import { IndexCard } from '../indexCard.interface'

/**
 * Hook that fetches index cards for a specific story and returns a list of positions,
 * along with functions for setting the current position and fetching index card data.
 * @returns Object containing index card data and loading/error states.
 */
function useGetIndexCardsOfStory(
  universeTitle: string,
  storyTitle: string
): {
  data: {
    indexCards: IndexCard[]
    positionList: number[]
    currentPosition: number
    setCurrentPosition: (pos: number) => void
  }
  isLoading: boolean
  isError: any
} {
  const router = useRouter()
  const { indexcard: position } = router.query
  if (!position || Number.isNaN(+position)) {
    router.push(urls.loginPage)
  }

  const { data, isLoading, error } = useSWR(endpoints.indexCardsURI, fetcher)
  const indexCards = data as IndexCard[]

  const positionList = indexCards?.length
    ? getFilteredIndexCards(indexCards, universeTitle, storyTitle).map(
        indexCard => indexCard.position
      )
    : []

  const setCurrentPosition = (pos: number) => {
    const pathname = '/[universe]/[story]/[indexcard]'
    const universe = slugify(universeTitle)
    const story = slugify(storyTitle)
    const query = { universe, story, indexcard: pos }

    router.push({ pathname, query }, undefined, { shallow: true })
  }

  return {
    data: {
      indexCards,
      positionList,
      currentPosition: +position!,
      setCurrentPosition
    },
    isLoading,
    isError: error
  }
}

export default useGetIndexCardsOfStory
