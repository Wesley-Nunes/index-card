import React from 'react'
import { render, screen } from '@testing-library/react'
import IndexCardPosition from './IndexCardPosition'

describe('Index Card Position', () => {
  it('should render the actual position of the index card', () => {
    const actualPosition = 44
    render(<IndexCardPosition position={actualPosition} />)

    const indexCardPosition = screen.getByText(/44/i)

    expect(indexCardPosition).toBeInTheDocument()
    expect(indexCardPosition).toBeVisible()
    expect(indexCardPosition).toHaveTextContent(actualPosition.toString())
  })
})
