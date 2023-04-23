import { Fetcher } from 'swr'
import { IndexCard, Universe } from '@prisma/client'

const fetcher: Fetcher<Universe[] | IndexCard[]> = async (url: string) => {
  const res = await fetch(url)

  if (!res.ok) {
    const { message } = await res.json()
    const error = new Error(message)

    throw error
  }

  return res.json()
}

export default fetcher
