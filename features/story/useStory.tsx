import useSWR from 'swr'
import fetcher from '../@generics/fetcher'
import { storiesURI } from '../@generics/endpoints'
import { useCheckAuthentication } from '../@generics/hooks'
import type { Story } from './story.interface'

/**
 * A React hook that fetches the list of stories of an authenticated user.
 * If the user is not authenticated, it redirects to the login page.
 */
function useStory() {
  useCheckAuthentication()
  const { data, isLoading, error } = useSWR(storiesURI, fetcher)

  return {
    stories: data as Story[],
    loadingStories: isLoading,
    errorStories: error
  }
}

export default useStory
