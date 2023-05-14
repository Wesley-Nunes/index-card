import getFilteredIndexCards from '../functions/getFilteredIndexCards'

describe('getFilteredIndexCards', () => {
  it('should return the filtered index card array', () => {
    const data = [
      {
        storyTitle: 'A primeira filha',
        universeTitle: 'Lágrimas de Jokhali',
        indexCards: [
          {
            id: 1,
            position: 1,
            sceneHeading: 'EXT. Salão',
            synopsis: '',
            conflict: ''
          }
        ]
      },
      {
        storyTitle: 'Os caídos',
        universeTitle: 'Lágrimas de Jokhali',
        indexCards: [
          { id: 37, position: 1, sceneHeading: '', synopsis: '', conflict: '' }
        ]
      }
    ]
    const universeTitle = 'Lágrimas de Jokhali'
    const storyTitle = 'A primeira filha'
    const expectedData = [
      {
        id: 1,
        position: 1,
        sceneHeading: 'EXT. Salão',
        synopsis: '',
        conflict: ''
      }
    ]

    const filteredData = getFilteredIndexCards(data, universeTitle, storyTitle)

    expect(filteredData).toStrictEqual(expectedData)
  })
})
