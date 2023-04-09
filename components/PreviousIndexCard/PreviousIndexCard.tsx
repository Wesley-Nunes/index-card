import React, { memo } from 'react'
import { IoIosArrowBack } from '@react-icons/all-files/io/IoIosArrowBack'
import { IndexCardBtn, IndexCardBtnWrapper } from '../@generics'
import styles from './PreviousIndexCard.module.css'

const PreviousIndexCard: React.FC<IndexCardBtnWrapper> = ({
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
      description='Previous Index Card'
      className={styles['btn-prev']}
      handleClick={handleClick}
      icon={<IoIosArrowBack size={24} />}
      isDisabled={disabled}
    />
  )
}

export default memo(PreviousIndexCard)
