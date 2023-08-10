import React, { memo } from 'react'
import styles from './Loading.module.css'

const Loading: React.FC = () => (
  <div className={styles['loading-container']}>
    <div className={styles['loading-spinner']} />
  </div>
)

export default memo(Loading)
