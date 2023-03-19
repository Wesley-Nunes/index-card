import { useSession } from 'next-auth/react'
import { Reality } from '@prisma/client'
import useSWR from 'swr'
import url from '../@generics/url'
import fetcher from '../@generics/fetcher'

function useReality() {
  const { data, error, isLoading } = useSWR(url.getRealities, fetcher)
  const { status } = useSession()

  if (status === 'authenticated') {
    return {
      realities: data as Reality[],
      isLoading,
      isError: error
    }
  }

  return {
    realities: [],
    isLoading,
    isError: error
  }
}

export default useReality
