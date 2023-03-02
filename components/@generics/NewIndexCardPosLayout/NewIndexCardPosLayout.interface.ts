import { ReactNode, SetStateAction } from 'react'

export interface NewIndexCardPosWrapper {
  position: number
  setPosition: (value: SetStateAction<number>) => void
  state: 'success' | 'loading' | 'error'
}

export interface NewIndexCardPosProps extends NewIndexCardPosWrapper {
  icon: ReactNode
  description: string
}
