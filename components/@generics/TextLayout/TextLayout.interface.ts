type TextField = {
  sceneHeading: string
  synopsis: string
  conflict: string
}

type TextFieldMapped = {
  [P in keyof TextField]?: TextField[P]
}

export type TextLayoutTextFields = 'scene heading' | 'synopsis' | 'conflict'

export type TextLayoutWrapper = {
  text: string
  setText: (textField: TextFieldMapped) => void
}

export type TextLayoutProps = TextLayoutWrapper & {
  icon: React.ReactNode
  description: TextLayoutTextFields
}
