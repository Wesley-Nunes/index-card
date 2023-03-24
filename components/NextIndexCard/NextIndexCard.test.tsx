import React from 'react'
import { render, screen } from '@testing-library/react'
import NextIndexCard from './NextIndexCard'

describe('NextIndexCard', () => {
  it('should render a next index card button', () => {
    render(<NextIndexCard position={12} setPosition={() => {}} />)

    const nextIndexCardBtn = screen.getByRole('button', {
      name: /next index card/i
    })

    expect(nextIndexCardBtn).toBeInTheDocument()
    expect(nextIndexCardBtn).toBeVisible()
  })

  it('should the button be enabled if the state allows it', () => {
    render(<NextIndexCard position={13} setPosition={() => {}} />)

    const nextIndexCardBtn = screen.getByRole('button', {
      name: /next index card/i
    })

    expect(nextIndexCardBtn).toBeEnabled()
  })
})
