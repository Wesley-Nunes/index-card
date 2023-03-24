import React from 'react'
import styles from './NewIndexCardPosLayout.module.css'
import type { NewIndexCardPosProps } from './NewIndexCardPosLayout.interface'

const NewIndexCardPosLayout: React.FC<NewIndexCardPosProps> = ({
  icon,
  description,
  position,
  setPosition
}) => {
  const disabled = !position
  const classNames = [
    styles.btn,
    description === 'Next Index Card' ? styles['btn-next'] : '',
    description === 'Previous Index Card' ? styles['btn-prev'] : '',
    disabled ? styles['last-card'] : ''
  ].join(' ')

  const handleClick = () => {
    if (position) {
      setPosition(position)
    }
  }

  return (
    <button
      className={classNames}
      aria-label={description}
      type='button'
      onClick={handleClick}
      disabled={disabled}
      data-testid={description}
    >
      {icon}
    </button>
  )
}

export default NewIndexCardPosLayout
