import React from 'react'
import { render, screen } from '@testing-library/react'
import Conflict from './Conflict'

describe('Conflict', () => {
  it('should render a conflict input field', () => {
    render(<Conflict text='' setText={() => {}} />)

    const conflict = screen.getByRole<HTMLInputElement>('textbox', {
      name: /conflict/i
    })

    expect(conflict).toBeInTheDocument()
    expect(conflict).toBeVisible()
  })

  it('should be possible to change the text content of the conflict', () => {
    render(<Conflict text='O Vizir trama matar o sultão' setText={() => {}} />)

    const conflict = screen.getByRole<HTMLInputElement>('textbox', {
      name: /conflict/i
    })

    expect(conflict.value).toBe('O Vizir trama matar o sultão')

    conflict.value = 'O Vizir culpa Luna pela morte do sultão'

    expect(conflict.value).toBe('O Vizir culpa Luna pela morte do sultão')
  })
})
