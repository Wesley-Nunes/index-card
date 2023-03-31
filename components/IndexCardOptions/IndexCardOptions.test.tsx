import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import IndexCardOptions from './IndexCardOptions'

describe('IndexCardOptions', () => {
  it('should show the correct message when the options are closed', () => {
    render(<IndexCardOptions />)

    const button = screen.getByRole('button', {
      name: /options/i
    })
    const msgOptions = screen.getByTestId('index-card-options-menu')

    fireEvent.mouseEnter(button)
    expect(msgOptions.getAttribute('data-msg')).toBe('Open options')
  })

  it('should show the correct message when the options are open', () => {
    render(<IndexCardOptions />)

    const button = screen.getByRole('button', {
      name: /options/i
    })
    const msgOptions = screen.getByTestId('index-card-options-menu')

    fireEvent.click(button)
    fireEvent.mouseEnter(button)
    expect(msgOptions.getAttribute('data-msg')).toBe('Close options')
  })
})
