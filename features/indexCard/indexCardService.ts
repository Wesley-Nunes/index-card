import { Body, IndexCardPosAndTitles } from './indexCard.interface'

const httpMethodMap = {
  POST: 'create',
  PATCH: 'update',
  DELETE: 'delete'
}

/**
 * Sends an HTTP request to the specified URL using the provided method and optional request body.
 * @param {string} url - The URL to send the request to.
 * @param {string} method - The HTTP method to use for the request.
 * @param {Body | IndexCardPosAndTitles} [body] - The optional request body.
 * @returns {Promise<Response>} - A promise that resolves to the response from the server.
 * @throws {Error} - Throws an error if the request fails or encounters an error.
 */
async function sendRequest(
  url: string,
  method: string,
  body?: Body | IndexCardPosAndTitles
): Promise<Response> {
  try {
    const response = await fetch(url, {
      method,
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })

    if (!response.ok) {
      throw new Error(
        `Failed to ${
          httpMethodMap[method as keyof typeof httpMethodMap]
        } the resource`
      )
    }

    return response
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(
      `Error ${
        httpMethodMap[method as keyof typeof httpMethodMap]
      } the resource:`,
      error
    )
    throw error
  }
}

/**
 * Creates a new index card by sending a POST request to the specified URL with the provided body.
 * @param {string} url - The URL to send the request to.
 * @param {IndexCardPosAndTitles} body - The request body containing data for creating the new index card.
 * @returns {Promise<Response>} - A promise that resolves to the response from the server.
 * @throws {Error} - Throws an error if the request fails or encounters an error.
 */
async function createNewIndexCard(
  url: string,
  body: IndexCardPosAndTitles
): Promise<Response> {
  return sendRequest(url, 'POST', body)
}

/**
 * Updates an existing index card by sending a PATCH request to the specified URL with the provided body.
 * @param {string} url - The URL to send the request to.
 * @param {Body} body - The request body containing data for updating the index card.
 * @returns {Promise<Response>} - A promise that resolves to the response from the server.
 * @throws {Error} - Throws an error if the request fails or encounters an error.
 */
async function updateIndexCard(url: string, body: Body): Promise<Response> {
  return sendRequest(url, 'PATCH', body)
}

/**
 * Deletes an existing index card by sending a DELETE request to the specified URL.
 * @param {string} url - The URL to send the request to.
 * @returns {Promise<Response>} - A promise that resolves to the response from the server.
 * @throws {Error} - Throws an error if the request fails or encounters an error.
 */
async function deleteIndexCard(url: string): Promise<Response> {
  return sendRequest(url, 'DELETE')
}

const indexCardService = {
  createNewIndexCard,
  updateIndexCard,
  deleteIndexCard
}

export default indexCardService
