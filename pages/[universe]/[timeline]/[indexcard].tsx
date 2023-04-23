import React, { useMemo } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { getIndexCards } from 'features/@generics/endpoints'
import {
  useIndexCard,
  useUpdateIndexCard,
  useCreateIndexCard,
  useDeleteIndexCard,
  positions,
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
  /*
  Estou pensando em adicionar o map criado em index em um contexto
  e usar esse contexto nessa pagina aqui e nas specials
  */
  const router = useRouter()
  const { reality, timeline } = router.query
  const key = useMemo(
    () => getIndexCards(reality as string, timeline as string),
    [reality, timeline]
  )
  const { data, isLoading, isError } = useIndexCard(key)
  const { setSceneHeading, setSynopsis, setConflict } = useUpdateIndexCard(
    data.indexCards,
    key
  )
  const { createNewIndexCard } = useCreateIndexCard(data?.indexCards, key)
  const { deleteIndexCard } = useDeleteIndexCard(data?.indexCards, key)
  const {
    indexCards = [],
    positionList = [],
    setCurrentPosition,
    currentPosition
  } = data || {}
  const [previousPosition, nextPosition] = positions.getAdjacentPositions(
    positionList,
    currentPosition
  )
  const positionOfTheNewIndexCard = positions.getPositionOfTheNewIndexCard(
    positionList,
    currentPosition
  )
  const availablePosition = positions.getAvailablePosition(
    positionList,
    currentPosition
  )
  const filteredCard = useMemo(
    () =>
      indexCards.filter(({ position }) => position === currentPosition) || [],
    [indexCards, currentPosition]
  )
  // const [realities, setRealities] = useState([])
  // useEffect(() => {
  //   if (!isLoading && !isError) {
  //     const fetcher = async (url: string) => {
  //       const res = await fetch(url)

  //       if (!res.ok) {
  //         const { message } = await res.json()
  //         const error = new Error(message)

  //         throw error
  //       }

  //       return res.json()
  //     }

  //     fetcher('/api/map').then(res => setRealities(res.realities))
  //   }
  // }, [isLoading, isError])

  // console.log(realities)

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
              position={currentPosition}
              deleteIndexCard={deleteIndexCard}
              availablePosition={availablePosition}
              createIndexCard={createNewIndexCard}
              newPosition={positionOfTheNewIndexCard}
              setPosition={setCurrentPosition}
            />
            <Synopsis text={synopsis || ''} setText={setSynopsis} id={id} />
            <Conflict text={conflict || ''} setText={setConflict} id={id} />
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
