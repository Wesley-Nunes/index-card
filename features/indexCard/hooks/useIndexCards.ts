import useSWR from 'swr'
import { endpoints, fetcher } from '../../@generics'
import { IndexCard } from '../indexCard.interface'

function useIndexCards(): {
  indexCards: IndexCard[]
  isLoading: boolean
  isError: any
} {
  const { data, isLoading, error } = useSWR(endpoints.indexCardsURI, fetcher)
  const indexCards = data as IndexCard[]

  return {
    indexCards,
    isLoading,
    isError: error
  }
}

export default useIndexCards
