import React, { memo, useState } from 'react'
import { IoIosArrowUp } from '@react-icons/all-files/io/IoIosArrowUp'
import { IoIosArrowDown } from '@react-icons/all-files/io/IoIosArrowDown'
import { IoIosAdd } from '@react-icons/all-files/io/IoIosAdd'
import { IoIosRemove } from '@react-icons/all-files/io/IoIosRemove'
import { IndexCardBtn } from '../@generics'
import styles from './IndexCardOptions.module.css'
import type { IndexCardOptionsProps } from './IndexCardOptions.interface'

const IndexCardOptions: React.FC<IndexCardOptionsProps> = ({
  position,
  newPosition,
  createIndexCard,
  availablePosition,
  deleteIndexCard,
  setPosition
}) => {
  const [isMenuOpen, setMenuState] = useState<boolean>(false)
  const optionsMsg = isMenuOpen ? 'Close options' : 'Open options'
  const icon = isMenuOpen ? (
    <IoIosArrowUp size={24} />
  ) : (
    <IoIosArrowDown size={24} />
  )

  const toggleMenu = () => setMenuState(prevState => !prevState)
  const createNewIndexCard = () => {
    createIndexCard(newPosition)
    setPosition(newPosition)
  }
  const deleteCurrentIndexCard = () => {
    deleteIndexCard(position)
    // handle here if only exist one index card
    setPosition(availablePosition || 0)
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
          handleClick={toggleMenu}
          icon={icon}
        />
      </div>
      {isMenuOpen && (
        <div className={styles['btn-options-action-container']}>
          <div
            className={styles.container}
            data-msg={`Create a new index card at position ${newPosition}`}
            data-testid='index-card-options-action-create'
          >
            <IndexCardBtn
              description='Create new index card'
              className={`${styles['btn-options']} ${styles['btn-options-action']} ${styles.end}`}
              handleClick={createNewIndexCard}
              icon={<IoIosAdd size={24} />}
            />
          </div>
          <div
            className={styles.container}
            data-msg='Delete the current index card'
            data-testid='index-card-options-action-delete'
          >
            <IndexCardBtn
              description='Delete current index card'
              className={`${styles['btn-options']} ${styles['btn-options-action']} ${styles.end}`}
              handleClick={deleteCurrentIndexCard}
              icon={<IoIosRemove size={24} />}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default memo(IndexCardOptions)
