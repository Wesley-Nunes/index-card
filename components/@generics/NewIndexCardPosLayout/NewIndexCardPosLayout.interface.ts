import { ReactNode, SetStateAction } from 'react'

export interface NewIndexCardPosWrapper {
  position: number | undefined
  setPosition: (value: SetStateAction<number>) => void
}

export interface NewIndexCardPosProps extends NewIndexCardPosWrapper {
  icon: ReactNode
  description: string
}
