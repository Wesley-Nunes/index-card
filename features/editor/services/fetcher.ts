import { Fetcher } from 'swr'
import { IndexCard } from '@prisma/client'

const fetcher: Fetcher<IndexCard[]> = (id: string) =>
  fetch(id).then(res => res.json())

export default fetcher
