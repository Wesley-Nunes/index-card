import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { Reality } from '@prisma/client'
import useSWR from 'swr'
import fetcher from '../@generics/fetcher'
import url from '../@generics/url'

function useReality() {
  const { data, error, isLoading } = useSWR(url.getRealities, fetcher)
  const { status } = useSession()
  const router = useRouter()

  if (status === 'unauthenticated') {
    router.push('/')
  }
  if (status === 'authenticated') {
    return {
      realities: data as Reality[],
      isLoading,
      isError: error
    }
  }
  return {
    realities: [],
    isLoading: true,
    isError: error
  }
}

export default useReality
