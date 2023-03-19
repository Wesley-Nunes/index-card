import React, { useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import { fetcher, styles, useEditorMutations } from 'features/editor'
import url from 'features/@generics/url'
import {
  SceneHeading,
  Synopsis,
  Conflict,
  IndexCardPosition,
  NextIndexCard,
  PreviousIndexCard
} from 'components'

export default function Editor() {
  const { status } = useSession()
  const router = useRouter()
  if (status === 'unauthenticated') {
    router.push('/')
  }
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
  const { reality, timeline } = router.query
  const key = useMemo(
    () => url.getIndexCards(reality as string, timeline as string),
    [reality, timeline]
  )
  const { error, isLoading, data } = useSWR(key, fetcher, {
    onSuccess: successData => {
      setPositionList(successData.map(({ position }) => position))
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

  return (
    <>
      <Head>
        <title>Index Card | Editor</title>
        <meta name='description' content='Index card' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className={styles.container}>
        {data!
          .filter(({ position }) => position === curPosition)
          .map(({ sceneHeading, synopsis, conflict, id: indexCardId }) => (
            <main className={styles.main} key={indexCardId}>
              <SceneHeading
                text={sceneHeading || ''}
                setText={setSceneHeading}
                state={state}
                id={indexCardId}
              />
              <Synopsis
                text={synopsis || ''}
                setText={setSynopsis}
                state={state}
                id={indexCardId}
              />
              <Conflict
                text={conflict || ''}
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
