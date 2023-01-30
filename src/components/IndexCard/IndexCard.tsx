import React from 'react'
import SceneHeading from '../SceneHeading/SceneHeading'
import Synopsis from '../Synopsis/Synopsis'
import Conflict from '../Conflict/Conflict'
import type { IndexCardProps } from './IndexCard.interface'
import styles from './IndexCard.module.css'

function IndexCard({
  sceneHeading,
  synopsis,
  conflict,
  state
}: IndexCardProps) {
  if (state === 'error') {
    return (
      <main className={`${styles.container} ${styles[`${state}`]}`}>
        <strong>
          <p>
            An error occurred.
            <br /> Please, check your internet connection.
          </p>
        </strong>
      </main>
    )
  }

  return (
    <main className={styles.container}>
      <SceneHeading sceneHeading={sceneHeading} state={state} />
      <Synopsis synopsis={synopsis} state={state} />
      <Conflict conflict={conflict} state={state} />
    </main>
  )
}
export default IndexCard
