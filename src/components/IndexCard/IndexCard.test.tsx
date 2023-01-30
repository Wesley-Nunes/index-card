import React from 'react'
import { render, screen } from '@testing-library/react'
import IndexCard from './IndexCard'

describe('IndexCard', () => {
  it('should show an error message when the status is an error', () => {
    render(<IndexCard sceneHeading='' synopsis='' conflict='' state='error' />)
    const errorMsg =
      'An error occurred. Please, check your internet connection.'

    const errorScreen = screen.getByText(
      /an error occurred\. please, check your internet connection\./i
    )

    expect(errorScreen).toBeInTheDocument()
    expect(errorScreen).toBeVisible()
    expect(errorScreen).toHaveTextContent(errorMsg)
  })
})
