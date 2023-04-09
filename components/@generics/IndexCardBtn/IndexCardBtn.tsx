import React, { useMemo } from 'react'
import styles from './IndexCardBtn.module.css'
import type { IndexCardBtnProps } from './IndexCardBtn.interface'

const IndexCardBtn: React.FC<IndexCardBtnProps> = ({
  className,
  description,
  handleClick,
  icon,
  isDisabled = false
}) => {
  const classNames = useMemo(
    () =>
      [styles.btn, className, isDisabled ? styles['last-card'] : ''].join(' '),
    [className, isDisabled]
  )

  return (
    <button
      className={classNames}
      aria-label={description}
      type='button'
      onClick={handleClick}
      disabled={isDisabled}
      data-testid={description}
    >
      {icon}
    </button>
  )
}

export default IndexCardBtn
