import indexCardDataUpdater from '../indexCardDataUpdater'
import { IndexCardBody } from '../indexCard.interface'

describe('indexCardDataUpdater', () => {
  const mockIndexCardData = [
    {
      id: 1,
      position: 1,
      sceneHeading: 'Scene 1',
      synopsis: 'Synopsis 1',
      conflict: 'Conflict 1',
      timelineId: 1
    },
    {
      id: 2,
      position: 2,
      sceneHeading: 'Scene 2',
      synopsis: 'Synopsis 2',
      conflict: 'Conflict 2',
      timelineId: 1
    },
    {
      id: 3,
      position: 3,
      sceneHeading: 'Scene 3',
      synopsis: 'Synopsis 3',
      conflict: 'Conflict 3',
      timelineId: 1
    }
  ]

  it('should update the sceneHeading when passed a sceneHeading body', () => {
    const mockIndexCardBody: IndexCardBody = { sceneHeading: 'Updated Scene 1' }
    const updatedIndexCardData = indexCardDataUpdater(
      mockIndexCardData,
      mockIndexCardBody,
      1
    )
    expect(updatedIndexCardData).toEqual([
      {
        id: 1,
        position: 1,
        sceneHeading: 'Updated Scene 1',
        synopsis: 'Synopsis 1',
        conflict: 'Conflict 1',
        timelineId: 1
      },
      {
        id: 2,
        position: 2,
        sceneHeading: 'Scene 2',
        synopsis: 'Synopsis 2',
        conflict: 'Conflict 2',
        timelineId: 1
      },
      {
        id: 3,
        position: 3,
        sceneHeading: 'Scene 3',
        synopsis: 'Synopsis 3',
        conflict: 'Conflict 3',
        timelineId: 1
      }
    ])
  })

  it('should update the synopsis when passed a synopsis body', () => {
    const mockIndexCardBody: IndexCardBody = { synopsis: 'Updated Synopsis 2' }
    const updatedIndexCardData = indexCardDataUpdater(
      mockIndexCardData,
      mockIndexCardBody,
      2
    )
    expect(updatedIndexCardData).toEqual([
      {
        id: 1,
        position: 1,
        sceneHeading: 'Scene 1',
        synopsis: 'Synopsis 1',
        conflict: 'Conflict 1',
        timelineId: 1
      },
      {
        id: 2,
        position: 2,
        sceneHeading: 'Scene 2',
        synopsis: 'Updated Synopsis 2',
        conflict: 'Conflict 2',
        timelineId: 1
      },
      {
        id: 3,
        position: 3,
        sceneHeading: 'Scene 3',
        synopsis: 'Synopsis 3',
        conflict: 'Conflict 3',
        timelineId: 1
      }
    ])
  })

  it('should update the conflict when passed a conflict body', () => {
    const mockIndexCardBody: IndexCardBody = { conflict: 'Updated Conflict 3' }
    const updatedIndexCardData = indexCardDataUpdater(
      mockIndexCardData,
      mockIndexCardBody,
      3
    )
    expect(updatedIndexCardData).toEqual([
      {
        id: 1,
        position: 1,
        sceneHeading: 'Scene 1',
        synopsis: 'Synopsis 1',
        conflict: 'Conflict 1',
        timelineId: 1
      },
      {
        id: 2,
        position: 2,
        sceneHeading: 'Scene 2',
        synopsis: 'Synopsis 2',
        conflict: 'Conflict 2',
        timelineId: 1
      },
      {
        id: 3,
        position: 3,
        sceneHeading: 'Scene 3',
        synopsis: 'Synopsis 3',
        conflict: 'Updated Conflict 3',
        timelineId: 1
      }
    ])
  })

  it('should return the original data when passed an id that does not exist', () => {
    const mockIndexCardBody: IndexCardBody = { sceneHeading: 'Updated Scene 3' }

    expect(() => {
      indexCardDataUpdater(mockIndexCardData, mockIndexCardBody, 4)
    }).toThrow()
  })
})
