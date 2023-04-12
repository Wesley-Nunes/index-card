import positions from '../positions'

describe('getAdjacentPositions', () => {
  const positionList = [1, 2, 3, 4, 5]

  it('should return the correct previous and next positions for the current position', () => {
    const [previousPosition1, nextPosition1] = positions.getAdjacentPositions(
      positionList,
      1
    )

    expect(previousPosition1).toEqual(undefined)
    expect(nextPosition1).toEqual(2)

    const [previousPosition2, nextPosition2] = positions.getAdjacentPositions(
      positionList,
      2
    )

    expect(previousPosition2).toEqual(1)
    expect(nextPosition2).toEqual(3)

    const [previousPosition3, nextPosition4] = positions.getAdjacentPositions(
      positionList,
      5
    )

    expect(previousPosition3).toEqual(4)
    expect(nextPosition4).toEqual(undefined)
  })
})

describe('getpositionOfTheNewIndexCard', () => {
  it('should return the next available position after the current position', () => {
    const positionList = [1, 2, 4, 5]

    expect(positions.getPositionOfTheNewIndexCard(positionList, 1)).toEqual(3)
    expect(positions.getPositionOfTheNewIndexCard(positionList, 4)).toEqual(6)
  })

  it('should return the first available position', () => {
    const positionList = [2, 4, 5]

    expect(positions.getPositionOfTheNewIndexCard(positionList, 2)).toEqual(1)
  })
})

describe('getAvailablePosition', () => {
  it('should return the first available position', () => {
    const positionList = [1, 2, 3, 4, 5]

    expect(positions.getAvailablePosition(positionList, 1)).toEqual(2)
    expect(positions.getAvailablePosition(positionList, 2)).toEqual(1)
    expect(positions.getAvailablePosition(positionList, 5)).toEqual(1)
  })

  it('should return the first available position', () => {
    const positionList = [2, 3, 4, 5]

    expect(positions.getAvailablePosition(positionList, 2)).toEqual(3)
  })
})
