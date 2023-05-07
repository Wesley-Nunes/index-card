export interface IndexCardOptionsProps {
  position: number
  newPosition: number
  availablePosition: number | undefined
  createIndexCard: (position: number) => void
  deleteIndexCard: (position: number) => void
  setPosition: (pos: number) => void
}
