import React, { useCallback, useMemo } from 'react'
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
  useIndexCards,
  positionsOperations,
  getFilteredIndexCards,
  indexCardOperations
} from 'features/indexCard'
import { useCheckAuthentication, slugify, urls } from 'features/@generics'
import { useRouter } from 'next/router'

export default function Editor({
  universeTitle,
  storyTitle
}: {
  universeTitle: string
  storyTitle: string
}) {
  useCheckAuthentication()

  const { query, push } = useRouter()
  const { mutate } = useSWRConfig()

  const { indexCards, isLoading, isError } = useIndexCards()

  const position = useMemo(() => {
    const pos = +query.indexcard!
    if (!pos || Number.isNaN(+pos)) {
      push(urls.homePage)
    }
    return pos
  }, [query, push])
  const positionList = useMemo(
    () =>
      getFilteredIndexCards(indexCards, universeTitle, storyTitle).map(
        indexCard => indexCard.position
      ),
    [indexCards, universeTitle, storyTitle]
  )
  const {
    previousPosition,
    nextPosition,
    newIndexCardPosition,
    availablePosition
  } = useMemo(() => {
    const positionsObj = positionsOperations(positionList, position)

    return {
      previousPosition: positionsObj.getAdjacentPositions[0],
      nextPosition: positionsObj.getAdjacentPositions[1],
      newIndexCardPosition: positionsObj.getPositionOfTheNewIndexCard,
      availablePosition: positionsObj.getAvailablePosition
    }
  }, [position, positionList])
  const filteredCard = useMemo(
    () =>
      getFilteredIndexCards(indexCards, universeTitle, storyTitle).filter(
        indexCard => indexCard.position === position
      ),
    [indexCards, universeTitle, storyTitle, position]
  )

  const setCurrentPosition = useCallback(
    (newPosition: number) => {
      const pathname = '/[universe]/[story]/[indexcard]'
      const universe = slugify(universeTitle)
      const story = slugify(storyTitle)
      const indexCardInfo = { universe, story, indexcard: newPosition }

      push({ pathname, query: indexCardInfo }, undefined, { shallow: true })
    },
    [universeTitle, storyTitle, push]
  )
  const { createIndexCard, updateIndexCardTextField, deleteIndexCard } =
    indexCardOperations(indexCards, mutate, {
      universeTitle,
      storyTitle,
      position
    })

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
              position={position}
              deleteIndexCard={deleteIndexCard}
              availablePosition={availablePosition}
              createIndexCard={createIndexCard}
              newPosition={newIndexCardPosition}
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
              <IndexCardPosition position={position} />
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
