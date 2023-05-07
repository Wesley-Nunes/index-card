import React from 'react'
import { IoIosArrowUp } from '@react-icons/all-files/io/IoIosArrowUp'
import { IoIosArrowDown } from '@react-icons/all-files/io/IoIosArrowDown'
import { IoIosMore } from '@react-icons/all-files/io/IoIosMore'
import { ItemProps } from './Item.interface'
import styles from './Item.module.css'

const Item = ({ title, children }: ItemProps) => {
  const Arrow = children ? (
    <IoIosArrowUp size={24} />
  ) : (
    <IoIosArrowDown size={24} />
  )

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        {typeof title === 'string' ? (
          Arrow
        ) : (
          <div className={styles['placeholder-icon-size']} />
        )}
        <IoIosMore size={24} />
      </div>
      {children ? <div>{children}</div> : <> </>}
    </div>
  )
}

Item.defaultProps = {
  children: []
}

export default Item
