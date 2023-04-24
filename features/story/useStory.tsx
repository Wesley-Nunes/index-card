import useSWR from 'swr'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { Story } from '@prisma/client'
import fetcher from '../@generics/fetcher'
import { getStories } from '../@generics/endpoints'
import { loginPage } from '../@generics/urls'

function useStory() {
  const router = useRouter()
  const { status } = useSession()
  const { data, isLoading, error } = useSWR(getStories, fetcher)

  if (status === 'unauthenticated') {
    router.push(loginPage)
  }

  return {
    stories: data as Story[],
    loadingStories: isLoading,
    errorStories: error
  }
}

export default useStory
