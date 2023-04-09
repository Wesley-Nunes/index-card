import { useSWRConfig } from 'swr'
import { IndexCard } from '@prisma/client'
import indexCardService from '../indexCardService'
import dataMaker from '../dataMaker'
import { createIndexCardAtPosition } from '../../@generics/endpoints'
import extractTitles from '../../@generics/extractTitles'

function useCreateIndexCard(data: IndexCard[], key: string) {
  const { mutate } = useSWRConfig()

  const [realityTitle, timelineTitle] = extractTitles(key)

  const createNewIndexCard = (position: number) => {
    indexCardService.createNewIndexCard(
      createIndexCardAtPosition(realityTitle, timelineTitle),
      { position }
    )

    mutate(key, dataMaker(data, { position }), { revalidate: false })
  }

  return {
    createNewIndexCard
  }
}

export default useCreateIndexCard
