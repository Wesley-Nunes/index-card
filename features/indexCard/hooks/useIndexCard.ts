import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { IndexCard } from '@prisma/client'
import fetcher from '../../@generics/fetcher'

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
    router.push('/')
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

export default useIndexCard
