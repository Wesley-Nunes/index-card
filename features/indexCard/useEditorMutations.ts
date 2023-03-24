import { useSWRConfig } from 'swr'
import { IndexCard } from '@prisma/client'
import {
  IndexCardBodyProp,
  IndexCardBody,
  TextValues,
  EditorMutations
} from './indexCard.interface'
import indexCardService from './indexCardService'
import indexCardDataUpdater from './indexCardDataUpdater'
import { updateIndexCardById } from '../@generics/endpoints'

function useEditorMutations(data: IndexCard[], key: string): EditorMutations {
  const { mutate } = useSWRConfig()

  const dataMaker = (indexCardBody: IndexCardBody, id: number) => {
    const searchParams = new URLSearchParams(key.split('?')[1])
    const realityTitle = searchParams.get('realityTitle') as string
    const timelineTitle = searchParams.get('timelineTitle') as string

    indexCardService.updateText(
      updateIndexCardById(realityTitle, timelineTitle, id),
      indexCardBody
    )
    return indexCardDataUpdater(data, indexCardBody, id)
  }

  const setValue =
    (prop: IndexCardBodyProp) =>
    ({ id, value }: TextValues) => {
      const indexCardBody: IndexCardBody = { [prop]: value } as IndexCardBody
      mutate(key, dataMaker(indexCardBody, id), { revalidate: false })
    }

  return {
    setSceneHeading: setValue('sceneHeading'),
    setSynopsis: setValue('synopsis'),
    setConflict: setValue('conflict')
  }
}

export default useEditorMutations
