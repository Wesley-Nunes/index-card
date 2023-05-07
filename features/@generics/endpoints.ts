const endpoints = () => {
  const root = '/api/'

  return {
    universesURI: `${root}universes`,
    storiesURI: `${root}stories`,
    indexCardsURI: `${root}indexcards`
  }
}

export const { universesURI, storiesURI, indexCardsURI } = endpoints()
