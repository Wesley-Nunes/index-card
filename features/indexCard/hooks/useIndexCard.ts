import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { IndexCard } from '@prisma/client'
import fetcher from '../../@generics/fetcher'

function useIndexCard(key: string) {
  const router = useRouter()
  const { status } = useSession()
  const { error, isLoading, data } = useSWR(key, fetcher)

  if (status === 'unauthenticated') {
    router.push('/')
  }

  const indexCards = data as IndexCard[]
  const positionList = indexCards?.length
    ? indexCards.map(({ position }) => position).sort((a, b) => a - b)
    : [0]

  return {
    data: { indexCards, positionList },
    isLoading,
    isError: error
  }
}

export default useIndexCard
