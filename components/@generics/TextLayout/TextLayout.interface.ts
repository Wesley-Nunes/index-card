import { ReactNode } from 'react'

interface TextValues {
  id: number
  value: string
}

export interface TextLayoutWrapper {
  text: string
  setText: ({ id, value }: TextValues) => void
  id: number
}

export interface TextLayoutProps extends TextLayoutWrapper {
  icon: ReactNode
  description: string
}
