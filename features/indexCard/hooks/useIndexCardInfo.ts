import { useRouter } from 'next/router'
import { unslugify } from '../../@generics/slugOperations'
import { UseIndexCardInfo } from '../indexCard.interface'

/**
 * A React hook that gets the titles of the universe, story,
 * and position of the current index card from the query.
 */
function useIndexCardInfo(): UseIndexCardInfo {
  const router = useRouter()
  const { universe, story, indexcard } = router.query
  const universeTitle = unslugify(universe as string) as string
  const storyTitle = unslugify(story as string) as string

  const parsedPosition = parseInt(indexcard as string, 10)

  return {
    universeTitle,
    storyTitle,
    position: parsedPosition
  }
}

export default useIndexCardInfo
