import React, { useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useSWRConfig } from 'swr'
import {
  SceneHeading,
  Synopsis,
  Conflict,
  IndexCardPosition,
  NextIndexCard,
  PreviousIndexCard,
  IndexCardOptions,
  Loading,
  ReturnToHomeBtn
} from 'components'
import { editorStyles } from 'components/@generics'
import { useCheckAuthentication, urls } from 'features/@generics'
import {
  useIndexCards,
  positionsOperations,
  indexCardOperations
} from 'features/indexCard'

export default function Editor() {
  useCheckAuthentication()

  const { query, push } = useRouter()
  const { mutate } = useSWRConfig()

  const { indexCards = [], isLoading, isError } = useIndexCards()
  const positionList = indexCards.map(indexCard => indexCard.position)
  const setCurrentPosition = useCallback(
    (newPosition: number) => {
      const pathname = '/[indexcard]'
      const indexCardInfo = { indexcard: newPosition }

      push({ pathname, query: indexCardInfo }, undefined, { shallow: true })
    },
    [push]
  )
  const position = useMemo(() => {
    const pos = +query.indexcard!
    const positionNotFound = !positionList.find(
      indexCardPos => indexCardPos === pos
    )

    if (!isLoading && (!pos || Number.isNaN(+pos) || positionNotFound)) {
      if (positionList.length) {
        setCurrentPosition(positionList[0])
      } else {
        push(urls.homePage)
      }
    }
    return pos
  }, [query, push, isLoading, positionList, setCurrentPosition])
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
    () => indexCards.filter(indexCard => indexCard.position === position),
    [indexCards, position]
  )

  const { createIndexCard, updateIndexCardTextField, deleteIndexCard } =
    indexCardOperations(indexCards, mutate)

  if (isLoading) {
    return <Loading />
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
      <div className={editorStyles['return-btn-container']}>
        <ReturnToHomeBtn />
      </div>
      <section className={editorStyles.container}>
        {filteredCard.map(({ sceneHeading, synopsis, conflict, id }) => (
          <main className={editorStyles.main} key={id}>
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
            <footer className={editorStyles.footer}>
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
      </section>
    </>
  )
}
