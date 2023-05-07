interface Titles {
  storyTitle: string
  universeTitle: string
}

export interface IndexCardFields {
  id: number
  position: number
  sceneHeading: string
  synopsis: string
  conflict: string
}

export type PartialIndexCard = {
  [P in keyof IndexCardFields]?: IndexCardFields[P]
}

export interface IndexCardPosAndTitles extends Titles {
  position?: number
}

export interface UseIndexCardInfo extends Titles {
  position: number
}

export interface Body extends IndexCardPosAndTitles {
  field: PartialIndexCard
}

export interface IndexCard extends Titles {
  indexCards: IndexCardFields[]
}
