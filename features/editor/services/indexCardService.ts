import { IndexCardBody } from '../editor.interface'

function updateText(url: string, body: IndexCardBody) {
  return fetch(url, {
    method: 'PATCH',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
}

export default {
  updateText
}
