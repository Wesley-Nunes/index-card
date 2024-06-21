import React from 'react'
import { IoListSharp } from "@react-icons/all-files/io5/IoListSharp";
import Head from 'next/head'
import { useSWRConfig } from 'swr'
import {
  SceneHeading,
  Synopsis,
  Conflict,
  IndexCardPosition,
  Loading,
} from 'components'
import { editorStyles } from 'components/@generics'
import { useCheckAuthentication, } from 'features/@generics'
import {
  useIndexCards,
  indexCardOperations
} from 'features/indexCard'

export default function Editor() {
  useCheckAuthentication()

  const { mutate } = useSWRConfig()

  const { indexCards = [], isLoading, isError } = useIndexCards()
  const { updateIndexCardTextField, } =
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
      <div className={editorStyles['wrapper']}>
        <IoListSharp size="48" />
        <section className={editorStyles.container}>
          {indexCards.map(({ sceneHeading, synopsis, conflict, position, id }) => (
            <main className={editorStyles.main} key={id}>
              <SceneHeading
                text={sceneHeading || ''}
                setText={updateIndexCardTextField}
              />
              <Synopsis
                text={synopsis || ''}
                setText={updateIndexCardTextField}
              />
              <Conflict
                text={conflict || ''}
                setText={updateIndexCardTextField}
              />
              <IndexCardPosition position={position} />
            </main>
          ))}
        </section>
      </div>
    </>
  )
}
