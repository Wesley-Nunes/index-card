import { IndexCardBody, Timeline } from './editor.interface'

function timelineDataUpdater(
  timelineData: Timeline[],
  indexCardBody: IndexCardBody,
  id: number
) {
  const updatedTimelineData = timelineData.map(oldData => {
    const updatedIndexCards = oldData.indexCards.map(indexCard => {
      if (indexCard.id === id) {
        const updatedIndexCard = {
          ...indexCard,
          ...indexCardBody
        }

        return updatedIndexCard
      }

      return indexCard
    })
    return { ...oldData, indexCards: updatedIndexCards }
  })

  return updatedTimelineData
}

export default timelineDataUpdater
