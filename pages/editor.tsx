import React, { useMemo, useState } from 'react'
import Head from 'next/head'
import useSWR from 'swr'
import { fetcher, url, styles, useEditorMutations } from 'features/editor'
import {
  Title,
  SceneHeading,
  Synopsis,
  Conflict,
  IndexCardPosition,
  NextIndexCard,
  PreviousIndexCard
} from 'components'

export default function Editor() {
  const [state, setState] = useState<'loading' | 'success' | 'error'>('loading')
  const [positionList, setPositionList] = useState<number[]>([0])
  const [curPosition, setCurPosition] = useState<number>(1) // Temporarily mocking the start curPosition
  const previousPosition = useMemo<number>(() => {
    const newIndex = positionList.indexOf(curPosition) - 1
    const newPosition = positionList[newIndex]

    return newPosition || 0
  }, [curPosition, positionList])
  const nextPosition = useMemo<number>(() => {
    const newIndex = positionList.indexOf(curPosition) + 1
    const newPosition = positionList[newIndex]

    return newPosition || 0
  }, [curPosition, positionList])
  const key = useMemo(() => url.timelineById(1), []) // Temporarily mocking the timeline id
  const { error, isLoading, data } = useSWR(key, fetcher, {
    onSuccess: successData => {
      setPositionList(
        successData![0].indexCards
          .map(({ position }) => position)
          .sort((n, m) => n - m)
      )
      setState('success')
    }
  })
  const { setSceneHeading, setSynopsis, setConflict } = useEditorMutations(
    data!,
    key
  )

  if (state === 'error' || error) {
    return (
      <div className={styles.container}>
        <main className={`${styles.main} ${styles[`${state}`]}`}>
          <strong>
            <p>
              An error occurred.
              <br /> Please, check your internet connection.
            </p>
          </strong>
        </main>
      </div>
    )
  }

  if (state === 'loading' || isLoading) {
    return (
      <div className={styles.container}>
        <main className={`${styles.main} ${styles[`${state}`]}`}>
          <strong>
            <p>Loading</p>
          </strong>
        </main>
      </div>
    )
  }

  const { title, indexCards } = data![0]
  return (
    <>
      <Head>
        <title>Index Card | Editor</title>
        <meta name='description' content='Index card' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className={styles.container}>
        <Title title={title} />
        {indexCards
          .filter(({ position }) => position === curPosition)
          .map(({ sceneHeading, synopsis, conflict, id: indexCardId }) => (
            <main className={styles.main} key={indexCardId}>
              <SceneHeading
                text={sceneHeading}
                setText={setSceneHeading}
                state={state}
                id={indexCardId}
              />
              <Synopsis
                text={synopsis}
                setText={setSynopsis}
                state={state}
                id={indexCardId}
              />
              <Conflict
                text={conflict}
                setText={setConflict}
                state={state}
                id={indexCardId}
              />
              <footer className={styles.footer}>
                <PreviousIndexCard
                  position={previousPosition}
                  setPosition={setCurPosition}
                  state={state}
                />
                <IndexCardPosition position={curPosition} state={state} />
                <NextIndexCard
                  position={nextPosition}
                  setPosition={setCurPosition}
                  state={state}
                />
              </footer>
            </main>
          ))}
      </div>
    </>
  )
}
