import { Fetcher } from 'swr'
import { Timeline } from '../editor.interface'

const fetcher: Fetcher<Timeline[]> = (id: string) =>
  fetch(id).then(res => res.json())

export default fetcher
