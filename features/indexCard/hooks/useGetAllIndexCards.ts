import useSWR from 'swr'
import { IndexCard } from '../indexCard.interface'
import fetcher from '../../@generics/fetcher'
import { indexCardsURI } from '../../@generics/endpoints'
import { useCheckAuthentication } from '../../@generics/hooks'

/**
 * A React hook that fetches the list of index cards of an authenticated user.
 * If the user is not authenticated, it redirects to the login page.
 */
function useGetAllIndexCards() {
  useCheckAuthentication()
  const { data, isLoading, error } = useSWR(indexCardsURI, fetcher)

  return {
    indexCardsContainer: data as IndexCard[],
    loadingIndexCards: isLoading,
    errorIndexCards: error
  }
}

export default useGetAllIndexCards
