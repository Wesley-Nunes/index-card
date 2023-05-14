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

  it('should create a new index card', () => {
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
