import { ReactNode } from 'react'

export interface IndexCardBtnWrapper {
  position: number | undefined
  setPosition: (pos: number) => void
}

export interface IndexCardBtnProps {
  icon: ReactNode
  description: string
  className: string
  handleClick: () => void
  isDisabled?: boolean
}
