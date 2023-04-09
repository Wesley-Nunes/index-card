export interface TextValues {
  id: number
  value: string
}

export type IndexCardBodyProp = 'sceneHeading' | 'synopsis' | 'conflict'

export type IndexCardBody =
  | { sceneHeading: string }
  | { synopsis: string }
  | { conflict: string }
  | { position: number }
  | { timelineId: number }

export interface UpdateIndexCard {
  setSceneHeading: (values: TextValues) => void
  setSynopsis: (values: TextValues) => void
  setConflict: (values: TextValues) => void
}

export interface PositionBody {
  position: number
}

export type Query = {
  realityTitle: string
  timelineTitle: string
}
