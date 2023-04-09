import React, { memo, useState } from 'react'
import { IoIosArrowUp } from '@react-icons/all-files/io/IoIosArrowUp'
import { IoIosArrowDown } from '@react-icons/all-files/io/IoIosArrowDown'
import { IoIosAdd } from '@react-icons/all-files/io/IoIosAdd'
import { IndexCardBtn } from '../@generics'
import styles from './IndexCardOptions.module.css'
import type { IndexCardOptionsProps } from './IndexCardOptions.interface'

const IndexCardOptions: React.FC<IndexCardOptionsProps> = ({
  position,
  create,
  setPosition
}) => {
  const [isMenuOpen, setMenuState] = useState<boolean>(false)
  const optionsMsg = isMenuOpen ? 'Close options' : 'Open options'
  const icon = isMenuOpen ? (
    <IoIosArrowUp size={24} />
  ) : (
    <IoIosArrowDown size={24} />
  )

  const openCloseMenu = () => {
    setMenuState(prevState => !prevState)
  }
  const createNewIndexCard = () => {
    create(position)
    setPosition(position)
  }

  return (
    <>
      <div
        className={styles.container}
        data-msg={optionsMsg}
        data-testid='index-card-options-menu'
      >
        <IndexCardBtn
          description='Options'
          className={`${styles['btn-options']} ${styles['btn-options-menu']} ${styles.end}`}
          handleClick={openCloseMenu}
          icon={icon}
        />
      </div>
      {isMenuOpen && (
        <div
          className={styles.container}
          data-msg={`Create a new index card at position ${position}`}
          data-testid='index-card-options-action-create'
        >
          <IndexCardBtn
            description='Create new index card'
            className={`${styles['btn-options']} ${styles['btn-options-action']} ${styles.end}`}
            handleClick={createNewIndexCard}
            icon={<IoIosAdd size={24} />}
          />
        </div>
      )}
    </>
  )
}

export default memo(IndexCardOptions)
