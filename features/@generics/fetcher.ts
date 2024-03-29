import { Fetcher } from 'swr'
// import { Universe, Story } from '@prisma/client'
import { IndexCard } from '../indexCard/indexCard.interface'

/**
 * Helper function for fetching data from a specified URL.
 * @template T - The type of data expected from the fetch request.
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<T>} - A promise that resolves to the fetched data.
 * @throws {Error} - Throws an error if the fetch request fails.
 */
const fetcher: Fetcher<IndexCard[]> = async <T>(url: string): Promise<T> => {
  const res = await fetch(url)

  if (!res.ok) {
    const { message } = await res.json()
    const error = new Error(message)

    throw error
  }

  return res.json()
}

export default fetcher
