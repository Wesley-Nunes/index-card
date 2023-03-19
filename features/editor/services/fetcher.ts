import { Fetcher } from 'swr'
import { IndexCard } from '@prisma/client'

const fetcher: Fetcher<IndexCard[]> = (url: string) =>
  fetch(url).then(res => res.json())

export default fetcher
