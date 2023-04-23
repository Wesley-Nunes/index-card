const indexCards = (realityTitle: string, timelineTitle: string) =>
  `/api/indexcards?realityTitle=${realityTitle}&timelineTitle=${timelineTitle}`

const endpoints = {
  getUniverses: 'api/universes',
  getTimelines: (realityTitle: string) =>
    `api/timelines?realityTitle=${realityTitle}`,
  getIndexCards: indexCards,
  updateIndexCardById: (
    realityTitle: string,
    timelineTitle: string,
    id: number
  ): string =>
    `/api/indexcards/${id}?realityTitle=${realityTitle}&timelineTitle=${timelineTitle}`,
  createIndexCardAtPosition: indexCards,
  deleteIndexCardAtPosition: (
    realityTitle: string,
    timelineTitle: string,
    position: number
  ): string =>
    `/api/indexcards?realityTitle=${realityTitle}&timelineTitle=${timelineTitle}&position=${position}`
}

export const {
  getUniverses,
  getTimelines,
  getIndexCards,
  updateIndexCardById,
  createIndexCardAtPosition,
  deleteIndexCardAtPosition
} = endpoints
