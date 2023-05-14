/**
 * A function that takes in a list of positions and the current position,
 * and returns an object containing functions for getting adjacent positions,
 * the position of the new index card, and the next available position.
 * @param {number[]} positionList - An array of index card positions.
 * @param {number} [curPosition=-1] - The current index card position. Defaults to -1.
 * @returns Object containing functions for getting index card positions.
 */
const positionsOperations = (
  positionList: number[],
  curPosition: number = -1
): {
  getAdjacentPositions: [number | undefined, number | undefined]
  getPositionOfTheNewIndexCard: number
  getAvailablePosition: number | undefined
} => {
  const getAdjacentPositions = (): [number | undefined, number | undefined] => {
    const curPositionIndex = positionList.indexOf(curPosition)
    return [
      positionList[curPositionIndex - 1],
      positionList[curPositionIndex + 1]
    ]
  }

  const getPositionOfTheNewIndexCard = (): number => {
    if (positionList[0] > 1 || !positionList.length) {
      return 1
    }

    const smallList = positionList.filter(pos => pos >= curPosition)
    return smallList.reduce(
      (nextPos, pos) => (pos === nextPos ? nextPos + 1 : nextPos),
      smallList[0] + 1
    )
  }

  const getAvailablePosition = (): number | undefined =>
    positionList.find(position => position !== curPosition)

  return {
    getAdjacentPositions: getAdjacentPositions(),
    getPositionOfTheNewIndexCard: getPositionOfTheNewIndexCard(),
    getAvailablePosition: getAvailablePosition()
  }
}

export default positionsOperations
