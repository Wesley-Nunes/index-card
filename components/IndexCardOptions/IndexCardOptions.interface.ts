import { SetStateAction } from 'react'

export interface IndexCardOptionsProps {
  position: number
  newPosition: number
  availablePosition: number | undefined
  createIndexCard: (position: number) => void
  deleteIndexCard: (position: number) => void
  setPosition: (value: SetStateAction<number>) => void
}
