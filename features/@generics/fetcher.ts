import { Fetcher } from 'swr'
import { Reality, Timeline } from '@prisma/client'

const fetcher: Fetcher<Reality[] | Timeline[]> = async (url: string) => {
  const res = await fetch(url)

  if (!res.ok) {
    const { message } = await res.json()
    const error = new Error(message)

    throw error
  }

  return res.json()
}

export default fetcher
