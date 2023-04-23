import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { homePage } from 'features/@generics/urls'

function Login() {
  const { data: session, status } = useSession()
  const { push } = useRouter()

  if (status === 'loading') {
    return <h1>Loading</h1>
  }

  if (status !== 'unauthenticated') {
    return <h1>Error</h1>
  }

  if (!session) {
    return (
      <div className='right'>
        <Link href='/api/auth/signin'>
          <button type='button' data-testid='signBtn'>
            Log in
          </button>
        </Link>
      </div>
    )
  }

  if (session) {
    push(homePage)
  }
}

export default Login
