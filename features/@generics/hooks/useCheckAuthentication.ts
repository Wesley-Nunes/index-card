import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { loginPage } from '../urls'

/**
 * Custom React hook to check authentication status and redirect to login page if unauthenticated.
 */
function useCheckAuthentication(): void {
  const router = useRouter()
  const { status } = useSession()

  if (status === 'unauthenticated') {
    router.push(loginPage)
  }
}

export default useCheckAuthentication
