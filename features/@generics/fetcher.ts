import { Fetcher } from 'swr'
import { Reality } from '@prisma/client'

const fetcher: Fetcher<Reality[]> = (url: string) =>
  fetch(url).then(res => res.json())

export default fetcher
