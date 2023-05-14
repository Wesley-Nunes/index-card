import { slugify, unslugify } from '../slugOperations'

describe('slugOperations', () => {
  it('should slugify a title', () => {
    const title = 'O filho do dragão'
    const expectedTitle = 'o-filho-do-dragao'

    const slugifyTitle = slugify(title)

    expect(slugifyTitle).toBe(expectedTitle)
  })

  it('should unslugify the title', () => {
    const slugifyTitle = 'o-filho-do-dragao'
    const expectedTitle = 'O filho do dragão'

    const unslugifyTitle = unslugify(slugifyTitle)

    expect(unslugifyTitle).toBe(expectedTitle)
  })

  it("should return an empty string if the slugify title doesn't exist", () => {
    const inexistentTitle = 'lorem-ipsum'
    const expectedTitle = ''

    const unslugifyTitle = unslugify(inexistentTitle)

    expect(unslugifyTitle).toBe(expectedTitle)
  })
})
