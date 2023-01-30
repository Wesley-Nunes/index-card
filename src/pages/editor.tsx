import React from 'react'
import Head from 'next/head'
import { IndexCard } from '@/components'
import styles from '@/styles/pages/editor.module.css'

export default function Editor() {
  const indexCardValues = [
    {
      id: 5,
      position: 1,
      sceneHeading: 'EXT. Jardins suspensos',
      synopsis: 'Luta entre o último guarda real e o regicida.',
      conflict: 'O guarda morre, a rainha está em apuros.',
      timeline_id: 8
    },
    {
      id: 7,
      position: 2,
      sceneHeading: 'EXT. Patio',
      synopsis: '',
      conflict: '',
      timeline_id: 8
    },
    {
      id: 5,
      position: 3,
      sceneHeading: '',
      synopsis: '',
      conflict: '',
      timeline_id: 8
    },
    {
      id: 1,
      position: 13,
      sceneHeading: 'INT. Palácio de Okie',
      synopsis: 'A rainha pedinte busca ajuda.',
      conflict: '',
      timeline_id: 8
    }
  ]
  const currentPosition = 13
  const currentState = 'default'
  const currentCardIndex = indexCardValues.filter(
    indexCard => indexCard.position === currentPosition
  )[0]
  const { sceneHeading, synopsis, conflict } = currentCardIndex

  return (
    <>
      <Head>
        <title>Index Card | Editor</title>
        <meta name='description' content='Index card' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className={styles.main}>
        <IndexCard
          sceneHeading={sceneHeading}
          synopsis={synopsis}
          conflict={conflict}
          state={currentState}
        />
      </div>
    </>
  )
}
