import { ReactNode, SetStateAction } from 'react'

export interface TextLayoutWrapper {
  text: string
  setText: (value: SetStateAction<string>) => void
  state: 'success' | 'loading'
}

export interface TextLayoutProps extends TextLayoutWrapper {
  icon: ReactNode
  description: string
}
