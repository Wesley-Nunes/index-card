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

// const NewIndexCardPosLayout: React.FC<NewIndexCardPosProps> = ({
//   icon,
//   description,
//   position,
//   setPosition
// }) => {
//   const disabled = !position
// const classNames = [
//   styles.btn,
//   description === 'Next Index Card' ? styles['btn-next'] : '',
//   description === 'Previous Index Card' ? styles['btn-prev'] : '',
//   disabled ? styles['last-card'] : ''
// ].join(' ')

//   const handleClick = () => {
//     if (position) {
//       setPosition(position)
//     }
//   }

//   return (
//     <IndexCardBtn
//       styles={classNames}
//       description={description}
//       handleClick={handleClick}
//       isDisabled={disabled}
//       icon={icon}
//     />
//   )
// }

// export default NewIndexCardPosLayout
