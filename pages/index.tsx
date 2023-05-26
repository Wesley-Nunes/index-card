import React from 'react'
import { useSession } from 'next-auth/react'
import { useCheckAuthentication } from 'features/@generics'
import { useIndexCards } from 'features/indexCard'
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
  const { indexCards: data, isLoading, isError } = useIndexCards()

  if (status === 'loading' || isLoading) {
    return <h1>Loading</h1>
  }

  if (session && !isError) {
    const { universeTitle, storyTitle, indexCards } = data[0]
    const { position } = indexCards[0]
    push(`${universeTitle}/${storyTitle}/${position}`)
    return <> </>
  }
}

export default Home
