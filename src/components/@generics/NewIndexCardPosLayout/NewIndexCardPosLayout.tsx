import React from 'react'
import type { NewIndexCardPosProps } from './NewIndexCardPosLayout.interface'
import styles from './NewIndexCardPosLayout.module.css'

function NewIndexCardPosLayout({
  icon,
  description,
  position,
  setPosition,
  state
}: NewIndexCardPosProps) {
  return (
    <button
      className={`
        ${styles.btn}
        ${styles[`${state}`]} 
        ${description === 'Next Index Card' ? styles['btn-next'] : ''} 
        ${description === 'Previous Index Card' ? styles['btn-prev'] : ''}
      `}
      aria-label={description}
      type='button'
      onClick={() => setPosition(position)}
      disabled={state === 'error' || state === 'loading'}
      data-testid={description}
    >
      {icon}
    </button>
  )
}

export default NewIndexCardPosLayout
