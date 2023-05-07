import { Fetcher } from 'swr'
import { Story } from '../story/story.interface'
import { IndexCard } from '../indexCard/indexCard.interface'
import Universe from '../universe/universe.interface'

const fetcher: Fetcher<Universe[] | Story[] | IndexCard[]> = async (
  url: string
) => {
  const res = await fetch(url)

  if (!res.ok) {
    const { message } = await res.json()
    const error = new Error(message)

    throw error
  }

  return res.json()
}

export default fetcher
