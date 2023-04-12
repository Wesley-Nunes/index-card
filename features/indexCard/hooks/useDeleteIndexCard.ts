import { useSWRConfig } from 'swr'
import { IndexCard } from '@prisma/client'
import indexCardService from '../indexCardService'
import dataMaker from '../dataMaker'
import { deleteIndexCardAtPosition } from '../../@generics/endpoints'
import extractTitles from '../../@generics/extractTitles'

function useDeleteIndexCard(data: IndexCard[], key: string) {
  const { mutate } = useSWRConfig()

  const [realityTitle, timelineTitle] = extractTitles(key)

  const deleteIndexCard = (position: number) => {
    indexCardService.deleteIndexCard(
      deleteIndexCardAtPosition(realityTitle, timelineTitle, position)
    )

    mutate(key, dataMaker(data, { position, delete: true }), {
      revalidate: false
    })
  }

  return {
    deleteIndexCard
  }
}

export default useDeleteIndexCard
