import { Body } from './indexCard.interface'

const httpMethodMap = {
  POST: 'create',
  PATCH: 'update',
  DELETE: 'delete'
}

async function sendRequest(
  url: string,
  method: string,
  body?: Body
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

async function createNewIndexCard(url: string, body: Body): Promise<Response> {
  return sendRequest(url, 'POST', body)
}

async function updateIndexCard(url: string, body: Body): Promise<Response> {
  return sendRequest(url, 'PATCH', body)
}

async function deleteIndexCard(url: string): Promise<Response> {
  return sendRequest(url, 'DELETE')
}

const indexCardService = {
  createNewIndexCard,
  updateIndexCard,
  deleteIndexCard
}

export default indexCardService
