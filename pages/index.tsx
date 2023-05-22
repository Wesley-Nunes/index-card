import React from 'react'
import { useSession } from 'next-auth/react'
import { useCheckAuthentication } from 'features/@generics'
import Link from 'next/link'

/**
 * Hey, developer.
 * Please, ignore this page,
 * for now, this will help me focus on the most priority part of the app.
 */
function Home() {
  useCheckAuthentication()
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <h1>Loading</h1>
  }

  if (session) {
    const pathname = 'universe/story/1'

    return (
      <div
        style={{
          height: '75vh',
          display: 'grid',
          alignContent: 'center',
          justifyContent: 'space-around'
        }}
      >
        <Link
          style={{
            border: '0.5rem solid',
            borderRadius: 16,
            padding: 8,
            cursor: 'pointer'
          }}
          href={{ pathname }}
        >
          Abrir Editor
        </Link>
      </div>
    )
  }
}

export default Home
