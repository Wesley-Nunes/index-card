import React from 'react'
import { render, screen } from '@testing-library/react'
import NextIndexCard from './NextIndexCard'

describe('NextIndexCard', () => {
  it('should render a next index card button', () => {
    render(
      <NextIndexCard position={12} setPosition={() => {}} state='success' />
    )

    const nextIndexCardBtn = screen.getByRole('button', {
      name: /next index card/i
    })

    expect(nextIndexCardBtn).toBeInTheDocument()
    expect(nextIndexCardBtn).toBeVisible()
  })

  it('should the button be enabled if the state allows it', () => {
    render(
      <NextIndexCard position={13} setPosition={() => {}} state='success' />
    )

    const nextIndexCardBtn = screen.getByRole('button', {
      name: /next index card/i
    })

    expect(nextIndexCardBtn).toBeEnabled()
  })

  it('should be the button disabled if the state is an error', () => {
    render(<NextIndexCard position={56} setPosition={() => {}} state='error' />)

    const nextIndexCardBtn = screen.getByRole('button', {
      name: /next index card/i
    })

    expect(nextIndexCardBtn).toBeDisabled()
  })

  it('should be the button disabled if the state is loading', () => {
    render(
      <NextIndexCard position={56} setPosition={() => {}} state='loading' />
    )

    const nextIndexCardBtn = screen.getByRole('button', {
      name: /next index card/i
    })

    expect(nextIndexCardBtn).toBeDisabled()
  })
})
