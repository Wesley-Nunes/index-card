import React, { useState } from 'react'
import { IoIosArrowUp } from '@react-icons/all-files/io/IoIosArrowUp'
import { IoIosArrowDown } from '@react-icons/all-files/io/IoIosArrowDown'
import { IndexCardBtn } from '../@generics'
import styles from './IndexCardOptions.module.css'

const IndexCardOptions: React.FC<{}> = () => {
  const [isMenuOpen, setMenuState] = useState<boolean>(false)
  const optionsMsg = isMenuOpen ? 'Close options' : 'Open options'
  const icon = isMenuOpen ? (
    <IoIosArrowUp size={24} />
  ) : (
    <IoIosArrowDown size={24} />
  )

  const handleClick = () => {
    setMenuState(prevState => !prevState)
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
          className={styles['btn-options']}
          handleClick={handleClick}
          icon={icon}
        />
      </div>
      {isMenuOpen && <p style={{ textAlign: 'end' }}>menu opened</p>}
    </>
  )
}

export default IndexCardOptions
