/**
 * Converts a given title into a slug by removing spaces, diacritics, and converting to lowercase.
 * And saves the original title in the browser's local storage.
 * @param {string} title - The title to be slugified.
 * @returns {string} - The slugified string.
 */
function slugify(title: string): string {
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

export default slugify
