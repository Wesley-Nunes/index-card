export interface TextValues {
  id: number
  value: string
}

export type IndexCardBodyProp = 'sceneHeading' | 'synopsis' | 'conflict'

export type IndexCardBody =
  | { sceneHeading: string }
  | { synopsis: string }
  | { conflict: string }

export interface EditorMutations {
  setSceneHeading: (values: TextValues) => void
  setSynopsis: (values: TextValues) => void
  setConflict: (values: TextValues) => void
}
