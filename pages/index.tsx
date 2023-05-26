import React from 'react'
import { useSession } from 'next-auth/react'
import { urls, useCheckAuthentication } from 'features/@generics'
import { useIndexCards, indexCardOperations } from 'features/indexCard'
import { useRouter } from 'next/router'
import { useSWRConfig } from 'swr'

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
  const { mutate } = useSWRConfig()

  if (status === 'loading' || isLoading) {
    return <h1>Loading</h1>
  }

  if (session && !isError) {
    const { universeTitle, storyTitle, indexCards } = data[0]
    try {
      const { position } = indexCards[0]

      push(`${universeTitle}/${storyTitle}/${position}`)
      return <> </>
    } catch (error) {
      if (!data[0].indexCards.length) {
        const { createIndexCard } = indexCardOperations(data, mutate, {
          universeTitle,
          storyTitle
        })
        createIndexCard(1)

        return <> </>
      }
      push(urls.loginPage)
      return <> </>
    }
  }
}

export default Home
