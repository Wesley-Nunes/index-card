import dataMaker from '../functions/dataMaker'

describe('dataMaker', () => {
  it('should throw an error when create/update/delete a new index card without indexCardBody information', () => {
    const data = [
      {
        storyTitle: 'The old dwarf',
        universeTitle: 'The old world',
        indexCards: [
          {
            id: 28,
            conflict: '',
            position: 1,
            sceneHeading: 'EXT. ',
            synopsis: ''
          }
        ]
      }
    ]
    const indexCardBody = {}

    // @ts-ignore
    expect(() => dataMaker(data, indexCardBody, { type: 'create' })).toThrow()
    // @ts-ignore
    expect(() => dataMaker(data, indexCardBody, { type: 'update' })).toThrow()
    // @ts-ignore
    expect(() => dataMaker(data, indexCardBody, { type: 'delete' })).toThrow()
  })

  it("should throw an error when create/update/delete a new index card, and the universe title doesn't match", () => {
    const data = [
      {
        storyTitle: 'The old dwarf',
        universeTitle: 'The old world',
        indexCards: [
          {
            id: 28,
            conflict: '',
            position: 1,
            sceneHeading: 'EXT. ',
            synopsis: ''
          }
        ]
      }
    ]
    const indexCardBody = {
      universeTitle: 'The new world',
      storyTitle: 'The old dwarf',
      field: {
        position: 2
      }
    }

    expect(() => dataMaker(data, indexCardBody, { type: 'create' })).toThrow()
    expect(() => dataMaker(data, indexCardBody, { type: 'update' })).toThrow()
    expect(() => dataMaker(data, indexCardBody, { type: 'delete' })).toThrow()
  })

  it("should throw an error when create/update/delete a new index card, and the universe title doesn't match", () => {
    const data = [
      {
        storyTitle: 'The old dwarf',
        universeTitle: 'The old world',
        indexCards: [
          {
            id: 28,
            conflict: '',
            position: 1,
            sceneHeading: 'EXT. ',
            synopsis: ''
          }
        ]
      }
    ]
    const indexCardBody = {
      universeTitle: 'The old world',
      storyTitle: 'The new horizon',
      field: {
        position: 2
      }
    }

    expect(() => dataMaker(data, indexCardBody, { type: 'create' })).toThrow()
    expect(() => dataMaker(data, indexCardBody, { type: 'update' })).toThrow()
    expect(() => dataMaker(data, indexCardBody, { type: 'delete' })).toThrow()
  })

  it('should throw an error when create/update/delete a new index card, and the position is missing', () => {
    const data = [
      {
        storyTitle: 'The old dwarf',
        universeTitle: 'The old world',
        indexCards: [
          {
            id: 28,
            conflict: '',
            position: 1,
            sceneHeading: 'EXT. ',
            synopsis: ''
          }
        ]
      }
    ]
    const indexCardBody = {
      universeTitle: 'The old world',
      storyTitle: 'The new horizon',
      field: {}
    }

    expect(() => dataMaker(data, indexCardBody, { type: 'create' })).toThrow()
    expect(() => dataMaker(data, indexCardBody, { type: 'update' })).toThrow()
    expect(() => dataMaker(data, indexCardBody, { type: 'delete' })).toThrow()
  })

  it('It should create an index card at position one if the index card is empty.', () => {
    const data = [
      {
        storyTitle: 'The old dwarf',
        universeTitle: 'The old world',
        indexCards: []
      }
    ]
    const indexCardBody = {
      universeTitle: 'The old world',
      storyTitle: 'The old dwarf',
      field: {
        position: 1
      }
    }
    const expectedIndexCard = [
      {
        storyTitle: 'The old dwarf',
        universeTitle: 'The old world',
        indexCards: [
          {
            id: 1,
            conflict: '',
            position: 1,
            sceneHeading: '',
            synopsis: ''
          }
        ]
      }
    ]

    const updatedIndexCard = dataMaker(data, indexCardBody, { type: 'create' })

    expect(updatedIndexCard).toStrictEqual(expectedIndexCard)
  })

  it('It should create an index card at position two if the index card has only one index card at position one.', () => {
    const data = [
      {
        storyTitle: 'The old dwarf',
        universeTitle: 'The old world',
        indexCards: [
          {
            id: 28,
            conflict: '',
            position: 1,
            sceneHeading: 'EXT. ',
            synopsis: ''
          }
        ]
      }
    ]
    const indexCardBody = {
      universeTitle: 'The old world',
      storyTitle: 'The old dwarf',
      field: {
        position: 2
      }
    }
    const expectedIndexCard = [
      {
        storyTitle: 'The old dwarf',
        universeTitle: 'The old world',
        indexCards: [
          {
            id: 28,
            conflict: '',
            position: 1,
            sceneHeading: 'EXT. ',
            synopsis: ''
          },
          {
            id: 29,
            conflict: '',
            position: 2,
            sceneHeading: '',
            synopsis: ''
          }
        ]
      }
    ]

    const updatedIndexCard = dataMaker(data, indexCardBody, { type: 'create' })

    expect(updatedIndexCard).toStrictEqual(expectedIndexCard)
  })
  it('It should create an index card at position one if the index card has only one index card at position two.', () => {
    const data = [
      {
        storyTitle: 'The old dwarf',
        universeTitle: 'The old world',
        indexCards: [
          {
            id: 28,
            conflict: '',
            position: 2,
            sceneHeading: 'EXT. ',
            synopsis: ''
          }
        ]
      }
    ]
    const indexCardBody = {
      universeTitle: 'The old world',
      storyTitle: 'The old dwarf',
      field: {
        position: 1
      }
    }
    const expectedIndexCard = [
      {
        storyTitle: 'The old dwarf',
        universeTitle: 'The old world',
        indexCards: [
          {
            id: 29,
            conflict: '',
            position: 1,
            sceneHeading: '',
            synopsis: ''
          },
          {
            id: 28,
            conflict: '',
            position: 2,
            sceneHeading: 'EXT. ',
            synopsis: ''
          }
        ]
      }
    ]

    const updatedIndexCard = dataMaker(data, indexCardBody, { type: 'create' })

    expect(updatedIndexCard).toStrictEqual(expectedIndexCard)
  })
  it('It should create an index card at position five if the index card is the positions: [1, 2, 3, 4]', () => {
    const data = [
      {
        storyTitle: 'The old dwarf',
        universeTitle: 'The old world',
        indexCards: [
          {
            id: 28,
            conflict: '',
            position: 1,
            sceneHeading: '',
            synopsis: ''
          },
          {
            id: 29,
            conflict: '',
            position: 2,
            sceneHeading: 'EXT.',
            synopsis: ''
          },
          {
            id: 30,
            conflict: '',
            position: 3,
            sceneHeading: '',
            synopsis: ''
          },
          {
            id: 31,
            conflict: '',
            position: 4,
            sceneHeading: 'INT.',
            synopsis: ''
          }
        ]
      }
    ]
    const indexCardBody = {
      universeTitle: 'The old world',
      storyTitle: 'The old dwarf',
      field: {
        position: 5
      }
    }
    const expectedIndexCard = [
      {
        storyTitle: 'The old dwarf',
        universeTitle: 'The old world',
        indexCards: [
          {
            id: 28,
            conflict: '',
            position: 1,
            sceneHeading: '',
            synopsis: ''
          },
          {
            id: 29,
            conflict: '',
            position: 2,
            sceneHeading: 'EXT.',
            synopsis: ''
          },
          {
            id: 30,
            conflict: '',
            position: 3,
            sceneHeading: '',
            synopsis: ''
          },
          {
            id: 31,
            conflict: '',
            position: 4,
            sceneHeading: 'INT.',
            synopsis: ''
          },
          {
            id: 32,
            conflict: '',
            position: 5,
            sceneHeading: '',
            synopsis: ''
          }
        ]
      }
    ]

    const updatedIndexCard = dataMaker(data, indexCardBody, { type: 'create' })

    expect(updatedIndexCard).toStrictEqual(expectedIndexCard)
  })
  it('It should create an index card at position two if the index card is the positions: [1, 3, 4]', () => {
    const data = [
      {
        storyTitle: 'The old dwarf',
        universeTitle: 'The old world',
        indexCards: [
          {
            id: 28,
            conflict: '',
            position: 1,
            sceneHeading: '',
            synopsis: ''
          },
          {
            id: 30,
            conflict: '',
            position: 3,
            sceneHeading: '',
            synopsis: ''
          },
          {
            id: 31,
            conflict: '',
            position: 4,
            sceneHeading: 'INT.',
            synopsis: ''
          }
        ]
      }
    ]
    const indexCardBody = {
      universeTitle: 'The old world',
      storyTitle: 'The old dwarf',
      field: {
        position: 2
      }
    }
    const expectedIndexCard = [
      {
        storyTitle: 'The old dwarf',
        universeTitle: 'The old world',
        indexCards: [
          {
            id: 28,
            conflict: '',
            position: 1,
            sceneHeading: '',
            synopsis: ''
          },
          {
            id: 32,
            conflict: '',
            position: 2,
            sceneHeading: '',
            synopsis: ''
          },
          {
            id: 30,
            conflict: '',
            position: 3,
            sceneHeading: '',
            synopsis: ''
          },
          {
            id: 31,
            conflict: '',
            position: 4,
            sceneHeading: 'INT.',
            synopsis: ''
          }
        ]
      }
    ]

    const updatedIndexCard = dataMaker(data, indexCardBody, { type: 'create' })

    expect(updatedIndexCard).toStrictEqual(expectedIndexCard)
  })

  it('should throw an error when create a new index card, and the position already exists', () => {
    const data = [
      {
        storyTitle: 'The old dwarf',
        universeTitle: 'The old world',
        indexCards: [
          {
            id: 28,
            conflict: '',
            position: 1,
            sceneHeading: 'EXT. ',
            synopsis: ''
          }
        ]
      }
    ]
    const indexCardBody = {
      storyTitle: 'The old dwarf',
      universeTitle: 'The old world',
      field: {
        position: 1
      }
    }

    expect(() => dataMaker(data, indexCardBody, { type: 'create' })).toThrow()
  })

  it('should update an index card', () => {
    const data = [
      {
        storyTitle: 'The old dwarf',
        universeTitle: 'The old world',
        indexCards: [
          {
            id: 28,
            conflict: '',
            position: 1,
            sceneHeading: 'EXT.',
            synopsis: ''
          }
        ]
      }
    ]
    const indexCardBody = {
      storyTitle: 'The old dwarf',
      universeTitle: 'The old world',
      field: {
        sceneHeading: 'INT.',
        position: 1
      }
    }
    const expectedIndexCard = [
      {
        storyTitle: 'The old dwarf',
        universeTitle: 'The old world',
        indexCards: [
          {
            id: 28,
            conflict: '',
            position: 1,
            sceneHeading: 'INT.',
            synopsis: ''
          }
        ]
      }
    ]

    const updatedIndexCard = dataMaker(data, indexCardBody, { type: 'update' })

    expect(updatedIndexCard).toStrictEqual(expectedIndexCard)
  })

  it('should throw an error when updating a new index card, and the position no exists', () => {
    const data = [
      {
        storyTitle: 'The old dwarf',
        universeTitle: 'The old world',
        indexCards: [
          {
            id: 28,
            conflict: '',
            position: 1,
            sceneHeading: 'EXT. ',
            synopsis: ''
          }
        ]
      }
    ]
    const indexCardBody = {
      storyTitle: 'The old dwarf',
      universeTitle: 'The old world',
      field: {
        sceneHeading: 'INT.',
        position: 2
      }
    }

    expect(() => dataMaker(data, indexCardBody, { type: 'update' })).toThrow()
  })

  it('should delete an index card', () => {
    const data = [
      {
        storyTitle: 'The old dwarf',
        universeTitle: 'The old world',
        indexCards: [
          {
            id: 28,
            conflict: '',
            position: 1,
            sceneHeading: 'EXT.',
            synopsis: ''
          },
          {
            id: 29,
            conflict: '',
            position: 2,
            sceneHeading: 'INT.',
            synopsis: ''
          }
        ]
      }
    ]
    const indexCardBody = {
      storyTitle: 'The old dwarf',
      universeTitle: 'The old world',
      field: {
        position: 2
      }
    }
    const expectedIndexCard = [
      {
        storyTitle: 'The old dwarf',
        universeTitle: 'The old world',
        indexCards: [
          {
            id: 28,
            conflict: '',
            position: 1,
            sceneHeading: 'EXT.',
            synopsis: ''
          }
        ]
      }
    ]

    const updatedIndexCard = dataMaker(data, indexCardBody, { type: 'delete' })

    expect(updatedIndexCard).toStrictEqual(expectedIndexCard)
  })

  it('should throw an error when updating a new index card, and the position no exists', () => {
    const data = [
      {
        storyTitle: 'The old dwarf',
        universeTitle: 'The old world',
        indexCards: [
          {
            id: 28,
            conflict: '',
            position: 1,
            sceneHeading: 'EXT. ',
            synopsis: ''
          }
        ]
      }
    ]
    const indexCardBody = {
      storyTitle: 'The old dwarf',
      universeTitle: 'The old world',
      field: {
        position: 2
      }
    }

    expect(() => dataMaker(data, indexCardBody, { type: 'delete' })).toThrow()
  })
})
