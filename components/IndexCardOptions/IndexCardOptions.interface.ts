import { SetStateAction } from 'react'

export interface IndexCardOptionsProps {
  position: number
  create: (position: number) => void
  setPosition: (value: SetStateAction<number>) => void
}
