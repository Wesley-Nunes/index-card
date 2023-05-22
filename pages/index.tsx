import React from 'react'
import { useSession } from 'next-auth/react'
import { useCheckAuthentication } from 'features/@generics'
import { useRouter } from 'next/router'

/**
 * Hey, developer.
 * Please, ignore this page,
 * for now, this will help me focus on the most priority part of the app.
 */
function Home() {
  useCheckAuthentication()
  const { push } = useRouter()
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <h1>Loading</h1>
  }

  if (session) {
    push('universe/story/1')

    return <> </>
  }
}

export default Home
