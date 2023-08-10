import React, { ReactNode, memo } from 'react'
import styles from './StepBtn.module.css'

const StepBtn = ({
  icon,
  handleClick
}: {
  icon: ReactNode
  handleClick: () => void
}) => (
  <button type='button' className={styles.btn} onClick={handleClick}>
    {icon}
  </button>
)

export default memo(StepBtn)
