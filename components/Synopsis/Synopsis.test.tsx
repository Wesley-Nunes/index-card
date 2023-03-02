import React from 'react'
import { render, screen } from '@testing-library/react'
import Synopsis from './Synopsis'

describe('Synopsis', () => {
  it('should render a synopsis text area field', () => {
    render(<Synopsis text='' setText={() => {}} state='success' id={2} />)

    const synopsis = screen.getByRole<HTMLInputElement>('textbox', {
      name: /synopsis/i
    })

    expect(synopsis).toBeInTheDocument()
    expect(synopsis).toBeVisible()
  })

  it('should be possible to change the text content of the synopsis', () => {
    render(
      <Synopsis
        text='Luna corre pela floresta'
        setText={() => {}}
        state='success'
        id={2}
      />
    )

    const synopsis = screen.getByRole<HTMLInputElement>('textbox', {
      name: /synopsis/i
    })

    expect(synopsis.value).toBe('Luna corre pela floresta')

    synopsis.value = 'Luna corre pela cidade'

    expect(synopsis.value).toBe('Luna corre pela cidade')
  })

  it('should NOT be possible to change the text content of the synopsis when the state is loading', () => {
    render(
      <Synopsis
        text='Luna corre pela floresta'
        setText={() => {}}
        state='loading'
        id={2}
      />
    )

    const synopsis = screen.getByRole<HTMLInputElement>('textbox', {
      name: /synopsis/i
    })

    expect(synopsis.value).toBe('Luna corre pela floresta')
    expect(synopsis).toBeDisabled()
  })
})
