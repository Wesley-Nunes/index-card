import React from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { urls } from 'features/@generics'

/**
 * Hey, developer.
 * Please, ignore this page,
 * for now, this will help me focus on the most priority part of the app.
 */
function Login() {
  const { data: session, status } = useSession()
  const { push } = useRouter()

  if (status === 'loading') {
    return <h1>Loading</h1>
  }

  if (session) {
    push(urls.homePage)
    return <> </>
  }

  if (!session) {
    return (
      <div
        style={{
          height: '75vh',
          display: 'grid',
          alignContent: 'center',
          justifyContent: 'space-around'
        }}
      >
        <button
          style={{ width: 128, height: 32 }}
          type='button'
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
