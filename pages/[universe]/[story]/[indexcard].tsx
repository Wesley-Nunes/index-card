import React, { useMemo } from 'react'
import Head from 'next/head'
import { useSWRConfig } from 'swr'
import {
  SceneHeading,
  Synopsis,
  Conflict,
  IndexCardPosition,
  NextIndexCard,
  PreviousIndexCard,
  IndexCardOptions
} from 'components'
import { styles } from 'components/@generics'
import {
  useGetIndexCardsOfStory,
  positionsOperations,
  getFilteredIndexCards,
  indexCardOperations
} from 'features/indexCard'
import { useCheckAuthentication } from 'features/@generics'

export default function Editor({
  universeTitle,
  storyTitle
}: {
  universeTitle: string
  storyTitle: string
}) {
  useCheckAuthentication()
  const { mutate } = useSWRConfig()
  const { data, isLoading, isError } = useGetIndexCardsOfStory(
    universeTitle,
    storyTitle
  )
  const { indexCards, positionList, currentPosition, setCurrentPosition } = data

  const { createIndexCard, updateIndexCardTextField, deleteIndexCard } =
    indexCardOperations(indexCards, mutate, {
      universeTitle,
      storyTitle,
      position: currentPosition
    })

  const {
    getAdjacentPositions,
    getPositionOfTheNewIndexCard,
    getAvailablePosition
  } = positionsOperations(positionList, currentPosition)
  const [previousPosition, nextPosition] = getAdjacentPositions

  const filteredCard = useMemo(
    () =>
      getFilteredIndexCards(indexCards, universeTitle, storyTitle).filter(
        indexCard => indexCard.position === currentPosition
      ) || [],
    [indexCards, universeTitle, storyTitle, currentPosition]
  )

  if (isLoading) {
    return <h1>loading</h1>
  }
  if (isError) {
    return <h1>Error</h1>
  }

  return (
    <>
      <Head>
        <title>Index Card | Editor</title>
        <meta name='description' content='Index card' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className={styles.container}>
        {filteredCard.map(({ sceneHeading, synopsis, conflict, id }) => (
          <main className={styles.main} key={id}>
            <SceneHeading
              text={sceneHeading || ''}
              setText={updateIndexCardTextField}
            />
            <IndexCardOptions
              position={currentPosition}
              deleteIndexCard={deleteIndexCard}
              availablePosition={getAvailablePosition}
              createIndexCard={createIndexCard}
              newPosition={getPositionOfTheNewIndexCard}
              setPosition={setCurrentPosition}
            />
            <Synopsis
              text={synopsis || ''}
              setText={updateIndexCardTextField}
            />
            <Conflict
              text={conflict || ''}
              setText={updateIndexCardTextField}
            />
            <footer className={styles.footer}>
              <PreviousIndexCard
                position={previousPosition}
                setPosition={setCurrentPosition}
              />
              <IndexCardPosition position={currentPosition} />
              <NextIndexCard
                position={nextPosition}
                setPosition={setCurrentPosition}
              />
            </footer>
          </main>
        ))}
      </div>
    </>
  )
}

export async function getServerSideProps(context: { params: any }) {
  return {
    props: {
      universeTitle: context.params.universe,
      storyTitle: context.params.story
    }
  }
}
