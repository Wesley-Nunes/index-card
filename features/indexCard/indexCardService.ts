import { IndexCardBody } from './indexCard.interface'

async function updateText(url: string, body: IndexCardBody): Promise<Response> {
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })

    if (!response.ok) {
      throw new Error('Failed to update text')
    }

    return response
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error updating text:', error)
    throw error
  }
}

const indexCardService = {
  updateText
}

export default indexCardService
