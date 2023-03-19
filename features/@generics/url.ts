const url = {
  getRealities: 'api/realities',
  getTimelines: (realityTitle: string) =>
    `api/timelines?realityTitle=${realityTitle}`,
  getIndexCards: (realityTitle: string, TimelineTitle: string) =>
    `/api/indexcards?realityTitle=${realityTitle}&timelineTitle=${TimelineTitle}`
}

export default url
