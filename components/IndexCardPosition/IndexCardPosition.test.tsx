import React from 'react'
import { render, screen } from '@testing-library/react'
import IndexCardPosition from './IndexCardPosition'

describe('Index Card Position', () => {
  it('should render the actual position of the index card', () => {
    const actualPosition = 44
    render(<IndexCardPosition position={actualPosition} state='success' />)

    const indexCardPosition = screen.getByText(/44/i)

    expect(indexCardPosition).toBeInTheDocument()
    expect(indexCardPosition).toBeVisible()
    expect(indexCardPosition).toHaveTextContent(actualPosition.toString())
  })

  it('should render an empty string if the state is loading', () => {
    const actualPosition = 44
    render(<IndexCardPosition position={actualPosition} state='loading' />)

    const indexCardPosition = screen.getByTestId('index-card-position')

    expect(indexCardPosition).toHaveTextContent('')
  })
})
