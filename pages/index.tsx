import React from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useUniverse } from 'features/universe'
import { useStory } from 'features/story'
import { getFilteredIndexCards, useGetAllIndexCards } from 'features/indexCard'
import { slugify } from 'features/@generics/slugOperations'
import { Item } from 'components'
import { useCheckAuthentication } from 'features/@generics/hooks'

function Home() {
  useCheckAuthentication()
  const { data: session, status } = useSession()
  const { universes, loadingUniverses, errorUniverses } = useUniverse()
  const { stories, loadingStories, errorStories } = useStory()
  const { indexCardsContainer, loadingIndexCards, errorIndexCards } =
    useGetAllIndexCards()

  if (
    status === 'loading' ||
    loadingUniverses ||
    loadingStories ||
    loadingIndexCards
  ) {
    return <h1>Loading</h1>
  }

  if (
    (errorUniverses || errorStories || errorIndexCards) &&
    status !== 'unauthenticated'
  ) {
    return <h1>Error</h1>
  }

  if (session) {
    if (universes.length) {
      return universes.map(universe => (
        <Item title={universe.title} key={universe.title}>
          {stories.length ? (
            stories
              .filter(story => story.universe.title === universe.title)
              .map(story => (
                <Item title={story.title} key={story.title}>
                  {indexCardsContainer.length ? (
                    getFilteredIndexCards(
                      indexCardsContainer,
                      universe.title,
                      story.title
                    ).map(({ position }) => {
                      const universeTitle = slugify(universe.title)
                      const storyTitle = slugify(story.title)
                      const pathname = `${universeTitle}/${storyTitle}/${position}`

                      return (
                        <Link key={position} href={{ pathname }}>
                          <Item title={position} />
                        </Link>
                      )
                    })
                  ) : (
                    <> </>
                  )}
                </Item>
              ))
          ) : (
            <> </>
          )}
        </Item>
      ))
    }

    return <> </>
  }
}

export default Home
