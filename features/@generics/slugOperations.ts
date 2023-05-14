/**
 * Converts a given title into a slug by removing spaces, diacritics, and converting to lowercase.
 * And saves the original title in the browser's local storage.
 * @param {string} title - The title to be slugified.
 * @returns {string} - The slugified string.
 */
export function slugify(title: string): string {
  const string = title
    .toLowerCase()
    .replaceAll(' ', '-')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

  if (typeof window !== 'undefined') {
    localStorage.setItem(string, title)
  }
  return string
}

/**
 * Retrieves the original title from a slug by looking it up in the browser's local storage.
 * @param {string} title - The slugified string.
 * @returns {string} - The original title retrieved from local storage, or an empty string if not found.
 */

export function unslugify(title: string): string {
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
