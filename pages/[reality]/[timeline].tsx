import React, { useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { getIndexCards } from 'features/@generics/endpoints'
import {
  useIndexCard,
  useUpdateIndexCard,
  useCreateIndexCard,
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

export default function Editor() {
  const [curPosition, setCurPosition] = useState<number>(1) // Temporarily mocking the start curPosition
  const router = useRouter()
  const { reality, timeline } = router.query
  const key = useMemo(
    () => getIndexCards(reality as string, timeline as string),
    [reality, timeline]
  )
  const { data, isLoading, isError } = useIndexCard(key)
  const { setSceneHeading, setSynopsis, setConflict } = useUpdateIndexCard(
    data?.indexCards,
    key
  )
  const { createNewIndexCard } = useCreateIndexCard(data?.indexCards, key)
  const { indexCards = [], positionList = [] } = data || {}
  const [previousPosition, nextPosition] = useMemo(() => {
    const curPositionIndex = positionList.findIndex(
      position => position === curPosition
    )
    return [
      positionList[curPositionIndex - 1],
      positionList[curPositionIndex + 1]
    ]
  }, [positionList, curPosition])
  const nextAvailablePosition = useMemo((): number => {
    const smallList = positionList.filter(pos => pos >= curPosition)
    let nextPos = smallList[0] + 1

    smallList.forEach(pos => {
      if (pos === nextPos) {
        nextPos += 1
      }
    })

    return nextPos
  }, [curPosition, positionList])
  const filteredCard = useMemo(
    () => indexCards.filter(({ position }) => position === curPosition) || [],
    [indexCards, curPosition]
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
              setText={setSceneHeading}
              id={id}
            />
            <IndexCardOptions
              create={createNewIndexCard}
              position={nextAvailablePosition}
              setPosition={setCurPosition}
            />
            <Synopsis text={synopsis || ''} setText={setSynopsis} id={id} />
            <Conflict text={conflict || ''} setText={setConflict} id={id} />
            <footer className={styles.footer}>
              <PreviousIndexCard
                position={previousPosition}
                setPosition={setCurPosition}
              />
              <IndexCardPosition position={curPosition} />
              <NextIndexCard
                position={nextPosition}
                setPosition={setCurPosition}
              />
            </footer>
          </main>
        ))}
      </div>
    </>
  )
}
