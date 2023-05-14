import positionsOperations from '../functions/positionsOperations'

describe('positionsOperations', () => {
  it('should return correct adjacent positions in the middle', () => {
    const positionList = [1, 2, 3, 4, 5]
    const curPosition = 3
    const expectedAdjacentPositions = [2, 4]

    const { getAdjacentPositions } = positionsOperations(
      positionList,
      curPosition
    )

    expect(getAdjacentPositions).toEqual(expectedAdjacentPositions)
  })

  it('should return correct adjacent positions at the beginning', () => {
    const positionList = [1, 2, 3, 4, 5]
    const curPosition = 1
    const expectedAdjacentPositions = [undefined, 2]

    const { getAdjacentPositions } = positionsOperations(
      positionList,
      curPosition
    )

    expect(getAdjacentPositions).toEqual(expectedAdjacentPositions)
  })

  it('should return correct adjacent positions at the end', () => {
    const positionList = [1, 2, 3, 4, 5]
    const curPosition = 5
    const expectedAdjacentPositions = [4, undefined]

    const { getAdjacentPositions } = positionsOperations(
      positionList,
      curPosition
    )

    expect(getAdjacentPositions).toEqual(expectedAdjacentPositions)
  })

  it('should return correct position of the new index card when list is not empty', () => {
    const positionList = [1, 2, 4, 5]
    const curPosition = 2
    const expectedPosition = 3

    const { getPositionOfTheNewIndexCard } = positionsOperations(
      positionList,
      curPosition
    )

    expect(getPositionOfTheNewIndexCard).toBe(expectedPosition)
  })

  it('should return correct position of the new index card when list is empty', () => {
    const positionList: number[] = []
    const curPosition = -1
    const expectedPosition = 1

    const { getPositionOfTheNewIndexCard } = positionsOperations(
      positionList,
      curPosition
    )

    expect(getPositionOfTheNewIndexCard).toBe(expectedPosition)
  })

  it('should return available position v1', () => {
    const positionList = [1, 2, 3]
    const curPosition = 2
    const expectedPosition = 1

    const { getAvailablePosition } = positionsOperations(
      positionList,
      curPosition
    )
    expect(getAvailablePosition).toBe(expectedPosition)
  })

  it('should return available position v2', () => {
    const positionList = [2, 3]
    const curPosition = 3
    const expectedPosition = 2

    const { getAvailablePosition } = positionsOperations(
      positionList,
      curPosition
    )
    expect(getAvailablePosition).toBe(expectedPosition)
  })

  it('should return undefined when there are no available positions', () => {
    const positionList = [2]
    const curPosition = 2
    const expectedPosition = undefined

    const { getAvailablePosition } = positionsOperations(
      positionList,
      curPosition
    )
    expect(getAvailablePosition).toBe(expectedPosition)
  })
})
