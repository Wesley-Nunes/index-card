import { ReactNode } from 'react'

// Pegar o valor exportado do local correto depois
interface TextValues {
  id: number
  value: string
}

export interface TextLayoutWrapper {
  text: string
  setText: ({ id, value }: TextValues) => void
  state: 'success' | 'loading'
  id: number
}

export interface TextLayoutProps extends TextLayoutWrapper {
  icon: ReactNode
  description: string
}
