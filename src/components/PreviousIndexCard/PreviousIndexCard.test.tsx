import React from 'react'
import { render, screen } from '@testing-library/react'
import PreviousIndexCard from './PreviousIndexCard'

describe('PreviousIndexCard', () => {
  it('should render a previous index card button', () => {
    render(
      <PreviousIndexCard position={12} setPosition={() => {}} state='success' />
    )

    const previousIndexCardBtn = screen.getByRole('button', {
      name: /previous index card/i
    })

    expect(previousIndexCardBtn).toBeInTheDocument()
    expect(previousIndexCardBtn).toBeVisible()
  })

  it('should the button be enabled if the state allows it', () => {
    render(
      <PreviousIndexCard position={6} setPosition={() => {}} state='success' />
    )

    const previousIndexCardBtn = screen.getByRole('button', {
      name: /previous index card/i
    })

    expect(previousIndexCardBtn).toBeEnabled()
  })

  it('should be the button disabled if the state is an error', () => {
    render(
      <PreviousIndexCard position={5} setPosition={() => {}} state='error' />
    )

    const previousIndexCardBtn = screen.getByRole('button', {
      name: /previous index card/i
    })

    expect(previousIndexCardBtn).toBeDisabled()
  })

  it('should be the button disabled if the state is loading', () => {
    render(
      <PreviousIndexCard position={3} setPosition={() => {}} state='loading' />
    )

    const previousIndexCardBtn = screen.getByRole('button', {
      name: /previous index card/i
    })

    expect(previousIndexCardBtn).toBeDisabled()
  })
})
