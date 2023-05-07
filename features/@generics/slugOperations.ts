export function slugify(title: string) {
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

export function unslugify(title: string) {
  try {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(title)
    }
    return ''
  } catch (error) {
    // eslint-disable-next-line no-console
    return console.error(error)
  }
}
