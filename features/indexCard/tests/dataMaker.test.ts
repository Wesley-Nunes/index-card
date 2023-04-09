import { IndexCard } from '@prisma/client'
import dataMaker from '../dataMaker'
import { IndexCardBody, PositionBody } from '../indexCard.interface'

describe('dataMaker', () => {
  const indexCards: IndexCard[] = [
    {
      id: 1,
      sceneHeading: 'Scene 1',
      synopsis: 'Synopsis 1',
      conflict: 'Conflict 1',
      position: 1,
      timelineId: 1
    },
    {
      id: 3,
      sceneHeading: 'Scene 3',
      synopsis: 'Synopsis 3',
      conflict: 'Conflict 3',
      position: 3,
      timelineId: 1
    }
  ]

  describe('addIndexCard', () => {
    it('should add a new index card for position two', () => {
      const expectedIndexCards: IndexCard[] = [
        {
          id: 1,
          sceneHeading: 'Scene 1',
          synopsis: 'Synopsis 1',
          conflict: 'Conflict 1',
          position: 1,
          timelineId: 1
        },
        {
          id: 3,
          sceneHeading: 'Scene 3',
          synopsis: 'Synopsis 3',
          conflict: 'Conflict 3',
          position: 3,
          timelineId: 1
        },
        {
          id: 4,
          sceneHeading: '',
          synopsis: '',
          conflict: '',
          position: 4,
          timelineId: 1
        }
      ]
      const positionBody: PositionBody = { position: 4 }
      const result = dataMaker(indexCards, positionBody)
      expect(result).toEqual(expectedIndexCards)
    })

    it('should add a new index card for position two', () => {
      const expectedIndexCards: IndexCard[] = [
        {
          id: 1,
          sceneHeading: 'Scene 1',
          synopsis: 'Synopsis 1',
          conflict: 'Conflict 1',
          position: 1,
          timelineId: 1
        },
        {
          id: 3,
          sceneHeading: 'Scene 3',
          synopsis: 'Synopsis 3',
          conflict: 'Conflict 3',
          position: 3,
          timelineId: 1
        },
        {
          id: 4,
          sceneHeading: '',
          synopsis: '',
          conflict: '',
          position: 2,
          timelineId: 1
        }
      ]
      const result = dataMaker(indexCards, { position: 2 })
      expect(result).toEqual(expectedIndexCards)
    })
  })

  describe('updateIndexCardById', () => {
    let indexCardData: IndexCard[]
    const idToUpdate = 2
    const indexCardBody: IndexCardBody = {
      sceneHeading: 'Updated Scene Heading',
      synopsis: 'Updated Synopsis',
      conflict: 'Updated Conflict'
    }

    beforeEach(() => {
      // Create some sample data
      indexCardData = [
        {
          id: 1,
          sceneHeading: 'Scene 1',
          synopsis: 'Synopsis 1',
          conflict: 'Conflict 1',
          position: 1,
          timelineId: 1
        },
        {
          id: 2,
          sceneHeading: 'Scene 2',
          synopsis: 'Synopsis 2',
          conflict: 'Conflict 2',
          position: 2,
          timelineId: 1
        },
        {
          id: 3,
          sceneHeading: 'Scene 3',
          synopsis: 'Synopsis 3',
          conflict: 'Conflict 3',
          position: 3,
          timelineId: 1
        }
      ]
    })

    it('should update an index card by ID', () => {
      const updatedIndexCardData = dataMaker(
        indexCardData,
        indexCardBody,
        idToUpdate
      )

      expect(updatedIndexCardData).toHaveLength(3)

      // Verify that only the specified index card was updated
      expect(updatedIndexCardData![0]).toEqual(indexCardData[0])
      expect(updatedIndexCardData![1]).toEqual({
        ...indexCardData[1],
        ...indexCardBody
      })
      expect(updatedIndexCardData![2]).toEqual(indexCardData[2])
    })

    it('should throw an error when updating an index card that does not exist', () => {
      const nonexistentId = 999
      expect(() =>
        dataMaker(indexCardData, indexCardBody, nonexistentId)
      ).toThrow(`Index card with ID ${nonexistentId} not found`)
    })
  })
})
