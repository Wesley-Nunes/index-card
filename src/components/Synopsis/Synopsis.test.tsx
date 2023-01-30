import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Synopsis from './Synopsis'

describe('Synopsis', () => {
  it('should render a synopsis text area field', () => {
    render(<Synopsis synopsis='' state='default' />)

    const synopsis = screen.getByRole<HTMLInputElement>('textbox', {
      name: /synopsis/i
    })

    expect(synopsis).toBeInTheDocument()
    expect(synopsis).toBeVisible()
  })

  it('should be possible to change the text content of the synopsis', () => {
    render(<Synopsis synopsis='Luna corre pela floresta' state='default' />)

    const synopsis = screen.getByRole<HTMLInputElement>('textbox', {
      name: /synopsis/i
    })

    expect(synopsis.value).toBe('Luna corre pela floresta')

    fireEvent.change(synopsis, { target: { value: 'Luna corre pela cidade' } })

    expect(synopsis.value).toBe('Luna corre pela cidade')
  })

  it('should NOT be possible to change the text content of the synopsis when the state is loading', () => {
    render(<Synopsis synopsis='Luna corre pela floresta' state='loading' />)

    const synopsis = screen.getByRole<HTMLInputElement>('textbox', {
      name: /synopsis/i
    })

    expect(synopsis.value).toBe('Luna corre pela floresta')

    fireEvent.change(synopsis, { target: { value: 'Luna corre pela cidade' } })

    expect(synopsis.value).toBe('Luna corre pela floresta')
  })
})
