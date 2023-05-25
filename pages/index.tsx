import React from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useCheckAuthentication } from 'features/@generics'
import { useIndexCards } from 'features/indexCard'

/**
 * Hey, developer.
 * Please, ignore this page,
 * for now, this will help me focus on the most priority part of the app.
 */
function Home() {
  useCheckAuthentication()
  const { data: session, status } = useSession()
  const { indexCards: data, isLoading, isError } = useIndexCards()

  if (status === 'loading' || isLoading) {
    return <h1>Loading</h1>
  }

  if (session && !isError) {
    const { universeTitle, storyTitle, indexCards } = data[0]
    const { position } = indexCards[0]
    const pathname = `${universeTitle}/${storyTitle}/${position}`

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
