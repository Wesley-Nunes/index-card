import { ReactNode, SetStateAction } from 'react'

export interface IndexCardBtnWrapper {
  position: number | undefined
  setPosition: (value: SetStateAction<number>) => void
}

export interface IndexCardBtnProps {
  icon: ReactNode
  description: string
  className: string
  handleClick: () => void
  isDisabled?: boolean
}
