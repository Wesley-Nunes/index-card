import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import { Timeline } from '@prisma/client'
import fetcher from '../@generics/fetcher'
import { getTimelines } from '../@generics/endpoints'
import { loginPage } from '../@generics/urls'

function useTimeline() {
  const router = useRouter()
  const { reality } = router.query
  const key = getTimelines(reality as string)
  const { status } = useSession()
  const { data, isLoading, error } = useSWR(key, fetcher)

  if (status === 'unauthenticated') {
    router.push(loginPage)
  }

  return {
    timelines: data as Timeline[],
    isLoading,
    isError: error
  }
}

export default useTimeline
