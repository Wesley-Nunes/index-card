import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { loginPage } from '../urls'

function useCheckAuthentication() {
  const router = useRouter()
  const { status } = useSession()

  if (status === 'unauthenticated') {
    router.push(loginPage)
  }
}

export default useCheckAuthentication
