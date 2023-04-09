import { useSWRConfig } from 'swr'
import { IndexCard } from '@prisma/client'
import {
  IndexCardBodyProp,
  IndexCardBody,
  TextValues,
  UpdateIndexCard
} from '../indexCard.interface'
import indexCardService from '../indexCardService'
import { updateIndexCardById } from '../../@generics/endpoints'
import dataMaker from '../dataMaker'
import extractTitles from '../../@generics/extractTitles'

function useUpdateIndexCard(data: IndexCard[], key: string): UpdateIndexCard {
  const { mutate } = useSWRConfig()

  const [realityTitle, timelineTitle] = extractTitles(key)

  const setValue =
    (prop: IndexCardBodyProp) =>
    ({ id, value }: TextValues) => {
      const indexCardBody: IndexCardBody = { [prop]: value } as IndexCardBody

      indexCardService.updateIndexCard(
        updateIndexCardById(realityTitle, timelineTitle, id),
        indexCardBody
      )

      mutate(key, dataMaker(data, indexCardBody, id), { revalidate: false })
    }

  return {
    setSceneHeading: setValue('sceneHeading'),
    setSynopsis: setValue('synopsis'),
    setConflict: setValue('conflict')
  }
}

export default useUpdateIndexCard
