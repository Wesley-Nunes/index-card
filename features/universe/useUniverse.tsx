import useSWR from 'swr'
import { universesURI } from '../@generics/endpoints'
import fetcher from '../@generics/fetcher'
import { useCheckAuthentication } from '../@generics/hooks'
import type Universe from './universe.interface'

/**
 * A React hook that fetches the list of universes of an authenticated user.
 * If the user is not authenticated, it redirects to the login page.
 */
function useUniverse() {
  useCheckAuthentication()
  const { data, error, isLoading } = useSWR(universesURI, fetcher)

  return {
    universes: data as Universe[],
    loadingUniverses: isLoading,
    errorUniverses: error
  }
}

export default useUniverse
