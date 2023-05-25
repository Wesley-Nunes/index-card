import { IndexCard, IndexCardFields } from '../indexCard.interface'

/**
 * Returns an array of indexCards that match the given universe and story titles
 * @param data - An array of IndexCard objects
 * @param universeTitle - The title of the universe to filter the indexCards by
 * @param storyTitle - The title of the story to filter the indexCards by
 *
 * @returns An array of filtered IndexCard objects or an empty array if there is no match
 */
function getFilteredIndexCards(
  data: IndexCard[],
  universeTitle: string,
  storyTitle: string
): IndexCardFields[] | [] {
  try {
    if (!data) {
      return []
    }
    const foundData = data.find(
      indexCardBlock =>
        indexCardBlock.universeTitle === universeTitle &&
        indexCardBlock.storyTitle === storyTitle
    )

    return foundData?.indexCards || []
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
    return []
  }
}

export default getFilteredIndexCards
