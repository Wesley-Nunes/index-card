import { useSWRConfig } from 'swr'
import { IndexCardBody, TextValues, Timeline } from './editor.interface'
import indexCardService from './services/indexCardService'
import url from './services/url'
import timelineDataUpdater from './timelineUpdater'

function useEditorMutations(data: Timeline[], key: string) {
  const { mutate } = useSWRConfig()

  const dataMaker = (indexCardBody: IndexCardBody, id: number) => {
    indexCardService
      .updateText(url.indexCardById(id), indexCardBody)
      .then(res => res.status === 500 && new Error('something wrong'))

    return timelineDataUpdater(data, indexCardBody, id)
  }

  const setSceneHeading = ({ id, value }: TextValues) => {
    const indexCardBody: IndexCardBody = { sceneHeading: value }

    mutate(key, dataMaker(indexCardBody, id), { revalidate: false })
  }

  const setSynopsis = ({ id, value }: TextValues) => {
    const indexCardBody: IndexCardBody = { synopsis: value }

    mutate(key, dataMaker(indexCardBody, id), { revalidate: false })
  }

  const setConflict = ({ id, value }: TextValues) => {
    const indexCardBody: IndexCardBody = { conflict: value }

    mutate(key, dataMaker(indexCardBody, id), { revalidate: false })
  }

  return {
    setSceneHeading,
    setSynopsis,
    setConflict
  }
}

export default useEditorMutations
