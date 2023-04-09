import { IndexCardBody, PositionBody } from './indexCard.interface'

async function sendRequest(
  url: string,
  method: string,
  body: IndexCardBody | PositionBody
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
        `Failed to ${method === 'POST' ? 'create' : 'update'} the resource`
      )
    }

    return response
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(
      `Error ${method === 'POST' ? 'creating' : 'updating'} the resource:`,
      error
    )
    throw error
  }
}

async function createNewIndexCard(
  url: string,
  body: PositionBody
): Promise<Response> {
  return sendRequest(url, 'POST', body)
}

async function updateIndexCard(
  url: string,
  body: IndexCardBody
): Promise<Response> {
  return sendRequest(url, 'PATCH', body)
}

const indexCardService = {
  createNewIndexCard,
  updateIndexCard
}

export default indexCardService
