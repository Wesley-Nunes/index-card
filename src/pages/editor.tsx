import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import {
  SceneHeading,
  Synopsis,
  Conflict,
  IndexCardPosition
} from '@/components'
import styles from '@/styles/pages/editor.module.css'

export default function Editor() {
  const [state, setState] = useState<'loading' | 'success' | 'error'>('loading')
  const [sHeading, setSHeading] = useState('')
  const [synopsis, setSynopsis] = useState('')
  const [conflict, setConflict] = useState('')
  const [curPosition] = useState(1)

  useEffect(() => {
    try {
      // backend data
      const indexCards = [
        {
          id: 5,
          position: 1,
          sceneHeading: 'EXT. Jardins suspensos',
          synopsis: 'Luta entre o último guarda real e o regicida.',
          conflict: 'O guarda morre, a rainha está em apuros.',
          indexCardId: 21
        },
        {
          id: 7,
          position: 2,
          sceneHeading: 'EXT. Patio',
          synopsis: '',
          conflict: '',
          indexCardId: 24
        },
        {
          id: 5,
          position: 3,
          sceneHeading: '',
          synopsis: '',
          conflict: '',
          indexCardId: 12
        },
        {
          id: 1,
          position: 13,
          sceneHeading: 'INT. Palácio de Okie',
          synopsis: 'A rainha pedinte busca ajuda.',
          conflict: '',
          indexCardId: 18
        }
      ]

      const indexCard = indexCards.find(
        ({ position }) => position === curPosition
      )!

      setSHeading(indexCard.sceneHeading)
      setSynopsis(indexCard.synopsis)
      setConflict(indexCard.conflict)

      setTimeout(() => {
        // delay just for test
        setState('success')
      }, 100)
    } catch (error) {
      setState('error')
    }
  }, [curPosition])

  if (state === 'error') {
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

  return (
    <>
      <Head>
        <title>Index Card | Editor</title>
        <meta name='description' content='Index card' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <SceneHeading text={sHeading} setText={setSHeading} state={state} />
          <Synopsis text={synopsis} setText={setSynopsis} state={state} />
          <Conflict text={conflict} setText={setConflict} state={state} />
        </main>
        <IndexCardPosition position={curPosition} state={state} />
      </div>
    </>
  )
}
