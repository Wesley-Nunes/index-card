import React, { useState } from 'react'
import { IoLocationSharp } from '@react-icons/all-files/io5/IoLocationSharp'
import type { SceneHeadingProps } from './SceneHeading.interface'
import styles from './SceneHeading.module.css'

function SceneHeading({ sceneHeading: sh, state }: SceneHeadingProps) {
  const [sceneHeading, setSceneHeading] = useState(sh)

  return (
    <span className={styles.container}>
      <IoLocationSharp />
      <input
        type='text'
        name='scene heading'
        aria-label='Scene Heading'
        placeholder='Scene Heading'
        className={`${styles.input} ${styles[`${state}`]}`}
        disabled={state === 'loading'}
        value={sceneHeading}
        onChange={e => state === 'success' && setSceneHeading(e.target.value)}
      />
    </span>
  )
}

export default SceneHeading
