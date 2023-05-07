import React from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { homePage } from 'features/@generics/urls'

function Login() {
  const { data: session, status } = useSession()
  const { push } = useRouter()

  if (status === 'loading') {
    return <h1>Loading</h1>
  }

  if (session) {
    push(homePage)
    return <> </>
  }

  if (!session) {
    return (
      <div className='right'>
        <button
          type='button'
          data-testid='signBtn'
          onClick={async () => {
            await signIn()
          }}
        >
          Log in
        </button>
      </div>
    )
  }
}

export default Login
