export interface TextValues {
  id: number
  value: string
}

export type IndexCardBody =
  | { sceneHeading: string }
  | { synopsis: string }
  | { conflict: string }
