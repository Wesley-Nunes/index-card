import useSWR from 'swr'
import { Reality } from '@prisma/client'
import { getRealities } from '../@generics/endpoints'
import fetcher from '../@generics/fetcher'

function useReality() {
  const { data, error, isLoading } = useSWR(getRealities, fetcher)

  return {
    realities: data as Reality[],
    isLoading,
    isError: error
  }
}

export default useReality
