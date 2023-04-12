const getAdjacentPositions = (
  positionList: number[],
  curPosition: number = -1
): [number | undefined, number | undefined] => {
  const curPositionIndex = positionList.indexOf(curPosition)
  return [
    positionList[curPositionIndex - 1],
    positionList[curPositionIndex + 1]
  ]
}

const getPositionOfTheNewIndexCard = (
  positionList: number[],
  curPosition: number = -1
): number => {
  if (positionList[0] > 1) {
    return 1
  }

  const smallList = positionList.filter(pos => pos >= curPosition)
  return smallList.reduce(
    (nextPos, pos) => (pos === nextPos ? nextPos + 1 : nextPos),
    smallList[0] + 1
  )
}

const getAvailablePosition = (
  positionList: number[],
  curPosition: number = -1
): number | undefined => positionList.find(position => position !== curPosition)

export default {
  getAdjacentPositions,
  getPositionOfTheNewIndexCard,
  getAvailablePosition
}
