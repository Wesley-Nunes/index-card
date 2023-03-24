import React from 'react'
import { render, screen } from '@testing-library/react'
import PreviousIndexCard from './PreviousIndexCard'

describe('PreviousIndexCard', () => {
  it('should render a previous index card button', () => {
    render(<PreviousIndexCard position={12} setPosition={() => {}} />)

    const previousIndexCardBtn = screen.getByRole('button', {
      name: /previous index card/i
    })

    expect(previousIndexCardBtn).toBeInTheDocument()
    expect(previousIndexCardBtn).toBeVisible()
  })

  it('should the button be enabled if the state allows it', () => {
    render(<PreviousIndexCard position={6} setPosition={() => {}} />)

    const previousIndexCardBtn = screen.getByRole('button', {
      name: /previous index card/i
    })

    expect(previousIndexCardBtn).toBeEnabled()
  })
})
