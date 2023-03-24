import React, { memo } from 'react'
import type { IndexCardPositionProps } from './IndexCardPosition.interface'
import styles from './IndexCardPosition.module.css'

const IndexCardPosition: React.FC<IndexCardPositionProps> = ({ position }) => (
  <p data-testid='index-card-position' className={styles.position}>
    {position}
  </p>
)

export default memo(IndexCardPosition)
