interface IndexCardWithoutPosition {
  id: number
  sceneHeading: string
  synopsis: string
  conflict: string
}

export interface IndexCard
  extends IndexCardWithoutPosition,
    IndexCardPosition {}

export interface IndexCardPosition {
  position: number
}

export type PartialIndexCard = {
  [P in keyof IndexCardWithoutPosition]?: IndexCardWithoutPosition[P]
}

export interface PartialBody extends PartialIndexCard, IndexCardPosition {}
