const endpoints = {
  getRealities: 'api/realities',
  getTimelines: (realityTitle: string) =>
    `api/timelines?realityTitle=${realityTitle}`,
  getIndexCards: (realityTitle: string, timelineTitle: string) =>
    `/api/indexcards?realityTitle=${realityTitle}&timelineTitle=${timelineTitle}`,
  updateIndexCardById: (
    realityTitle: string,
    timelineTitle: string,
    id: number
  ): string =>
    `/api/indexcards/${id}?realityTitle=${realityTitle}&timelineTitle=${timelineTitle}`
}

export const {
  getRealities,
  getTimelines,
  getIndexCards,
  updateIndexCardById
} = endpoints
