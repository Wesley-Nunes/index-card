import React, { useState } from 'react'
import { IoReaderSharp } from '@react-icons/all-files/io5/IoReaderSharp'
import type { SynopsisProps } from './Synopsis.interface'
import styles from './Synopsis.module.css'

function Synopsis({ synopsis: s, state }: SynopsisProps) {
  const [synopsis, setSynopsis] = useState(s)

  return (
    <span className={styles.container}>
      <IoReaderSharp />
      <textarea
        name='synopsis'
        aria-label='Synopsis'
        placeholder='Synopsis'
        className={`${styles.input} ${styles[`${state}`]}`}
        disabled={state === 'loading'}
        value={synopsis}
        onChange={e => state === 'default' && setSynopsis(e.target.value)}
      />
    </span>
  )
}

export default Synopsis
