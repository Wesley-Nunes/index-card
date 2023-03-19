import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { Timeline } from '@prisma/client'
import useSWR from 'swr'
import fetcher from '../@generics/fetcher'
import url from '../@generics/url'

function useTimeline() {
  const router = useRouter()
  const { reality } = router.query
  const key = url.getTimelines(reality as string)
  const { data, error, isLoading } = useSWR(key, fetcher)
  const { status } = useSession()

  if (status === 'unauthenticated') {
    router.push('/')
  }
  if (status === 'authenticated') {
    return {
      timelines: data as Timeline[],
      isLoading,
      isError: error
    }
  }

  return {
    timelines: [],
    isLoading,
    isError: error
  }
}

export default useTimeline
