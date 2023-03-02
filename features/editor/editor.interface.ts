interface IndexCards {
  id: number
  sceneHeading: string
  synopsis: string
  conflict: string
  position: number
  timelineId: number
}

export interface Timeline {
  id: number
  title: string
  description: string
  indexCards: IndexCards[]
  dateOfCreation: string
  realityId: number
}

export interface TextValues {
  id: number
  value: string
}

export type IndexCardBody =
  | { sceneHeading: string }
  | { synopsis: string }
  | { conflict: string }
