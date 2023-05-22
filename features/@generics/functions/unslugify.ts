/**
 * Retrieves the original title from a slug by looking it up in the browser's local storage.
 * @param {string} title - The slugified string.
 * @returns {string} - The original title retrieved from local storage, or an empty string if not found.
 */

function unslugify(title: string): string {
  try {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(title) || ''
    }
    return ''
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    return ''
  }
}

export default unslugify
