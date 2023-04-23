import useSWR from 'swr'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { Universe } from '@prisma/client'
import { getUniverses } from '../@generics/endpoints'
import fetcher from '../@generics/fetcher'
import { loginPage } from '../@generics/urls'

/**
 * A React hook that fetches the list of universes of an authenticated user.
 * If the user is not authenticated, it redirects to the login page.
 */
function useUniverse() {
  const router = useRouter()
  const { data, error, isLoading } = useSWR(getUniverses, fetcher)
  const { status } = useSession()

  if (!isLoading && status === 'unauthenticated') {
    router.push(loginPage)
  }

  return {
    universes: data as Universe[],
    isLoading,
    isError: error
  }
}

export default useUniverse
