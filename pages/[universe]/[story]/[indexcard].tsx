import React, { useMemo } from 'react'
import Head from 'next/head'
import { useSWRConfig } from 'swr'
import {
  useGetIndexCardsOfStory,
  positionsOperations,
  getFilteredIndexCards,
  useIndexCardInfo,
  indexCardOperations,
  styles
} from 'features/indexCard'
import {
  SceneHeading,
  Synopsis,
  Conflict,
  IndexCardPosition,
  NextIndexCard,
  PreviousIndexCard,
  IndexCardOptions
} from 'components'
import { useCheckAuthentication } from 'features/@generics/hooks'

export default function Editor() {
  useCheckAuthentication()
  const { mutate } = useSWRConfig()
  const { universeTitle, storyTitle, position } = useIndexCardInfo()
  const { data, isLoading, isError } = useGetIndexCardsOfStory()
  const { indexCards, positionList, currentPosition, setCurrentPosition } = data

  const { createIndexCard, updateIndexCardTextField, deleteIndexCard } =
    indexCardOperations(indexCards, mutate, {
      universeTitle,
      storyTitle,
      position
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
