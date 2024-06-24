import React, { ReactNode, memo } from 'react'
import styles from './Button.module.css'

const Button: React.FC<{
  children: string | ReactNode
  handleClick?: () => void
}> = ({ children, handleClick }) => (
  <button onClick={handleClick} className={styles.btn} type='button'>
    {children}
  </button>
)

Button.defaultProps = {
 handleClick: () => { }
}

export default memo(Button)
