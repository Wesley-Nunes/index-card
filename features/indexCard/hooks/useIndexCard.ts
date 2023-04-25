import useSWR from 'swr'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { IndexCard } from '../indexCard.interface'
import fetcher from '../../@generics/fetcher'
import { getIndexCards } from '../../@generics/endpoints'
import { loginPage } from '../../@generics/urls'

function useIndexCard() {
  const router = useRouter()
  const { status } = useSession()
  const { data, isLoading, error } = useSWR(getIndexCards, fetcher)

  if (status === 'unauthenticated') {
    router.push(loginPage)
  }

  return {
    indexCards: data as IndexCard[],
    loadingIndexCards: isLoading,
    errorIndexCards: error
  }
}

/*
function useIndexCard(key: string) {
  const router = useRouter()
  const { status } = useSession()
  const [currentPosition, setCurrentPosition] = useState(-1)
  const { error, isLoading, data } = useSWR(key, fetcher)
  const indexCards = data as IndexCard[]
  const positionList = indexCards?.length
    ? indexCards.map(({ position }) => position).sort((a, b) => a - b)
    : [-1]

  if (status === 'unauthenticated') {
    router.push(loginPage)
  }

  return {
    data: {
      indexCards,
      positionList,
      currentPosition:
        currentPosition === -1 ? positionList[0] : currentPosition,
      setCurrentPosition
    },
    isLoading,
    isError: error
  }
}
*/
export default useIndexCard
