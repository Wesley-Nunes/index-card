function extractTitles(key: string) {
  const searchParams = new URLSearchParams(key.split('?')[1])
  const realityTitle = searchParams.get('realityTitle') as string
  const timelineTitle = searchParams.get('timelineTitle') as string

  return [realityTitle, timelineTitle]
}

export default extractTitles
