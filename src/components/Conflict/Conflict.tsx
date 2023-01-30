import React, { useState } from 'react'
import { IoPulseSharp } from '@react-icons/all-files/io5/IoPulseSharp'
import { ConflictProps } from './Conflict.interface'
import styles from './Conflict.module.css'

function Conflict({ conflict: c, state }: ConflictProps) {
  const [conflict, setConflict] = useState(c)

  return (
    <span className={styles.container}>
      <IoPulseSharp />
      <input
        type='text'
        name='conflict'
        aria-label='Conflict'
        placeholder='Conflict'
        className={`${styles.input} ${styles[`${state}`]}`}
        disabled={state === 'loading'}
        value={conflict}
        onChange={e => state === 'default' && setConflict(e.target.value)}
      />
    </span>
  )
}

export default Conflict
