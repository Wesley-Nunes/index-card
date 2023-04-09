import React, { memo } from 'react'
import { IoIosArrowForward } from '@react-icons/all-files/io/IoIosArrowForward'
import { IndexCardBtn, IndexCardBtnWrapper } from '../@generics'
import styles from './NextIndexCard.module.css'

const NextIndexCard: React.FC<IndexCardBtnWrapper> = ({
  position,
  setPosition
}) => {
  const disabled = !position
  const handleClick = () => {
    if (position) {
      setPosition(position)
    }
  }

  return (
    <IndexCardBtn
      description='Next Index Card'
      className={styles['btn-next']}
      handleClick={handleClick}
      icon={<IoIosArrowForward size={24} />}
      isDisabled={disabled}
    />
  )
}

export default memo(NextIndexCard)
