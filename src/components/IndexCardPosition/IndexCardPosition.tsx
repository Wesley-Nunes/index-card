import React, { memo } from 'react'
import type { IndexCardPositionProps } from './IndexCardPosition.interface'
import styles from './IndexCardPosition.module.css'

function IndexCardPosition({ position, state }: IndexCardPositionProps) {
  if (state === 'error' || state === 'loading') {
    return <p data-testid='index-card-position'> </p>
  }

  return (
    <p data-testid='index-card-position' className={styles.position}>
      {position}
    </p>
  )
}

export default memo(IndexCardPosition)
