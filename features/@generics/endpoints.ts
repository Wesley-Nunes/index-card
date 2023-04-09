const indexCards = (realityTitle: string, timelineTitle: string) =>
  `/api/indexcards?realityTitle=${realityTitle}&timelineTitle=${timelineTitle}`

const endpoints = {
  getRealities: 'api/realities',
  getTimelines: (realityTitle: string) =>
    `api/timelines?realityTitle=${realityTitle}`,
  getIndexCards: indexCards,
  updateIndexCardById: (
    realityTitle: string,
    timelineTitle: string,
    id: number
  ): string =>
    `/api/indexcards/${id}?realityTitle=${realityTitle}&timelineTitle=${timelineTitle}`,
  createIndexCardAtPosition: indexCards
}

export const {
  getRealities,
  getTimelines,
  getIndexCards,
  updateIndexCardById,
  createIndexCardAtPosition
} = endpoints
