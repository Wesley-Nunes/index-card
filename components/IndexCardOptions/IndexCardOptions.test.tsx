import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import IndexCardOptions from './IndexCardOptions'

describe('IndexCardOptions', () => {
  it('should show the correct message when the options are closed', () => {
    render(
      <IndexCardOptions
        availablePosition={0}
        position={1}
        newPosition={2}
        createIndexCard={() => {}}
        setPosition={() => {}}
        deleteIndexCard={() => {}}
      />
    )

    const button = screen.getByRole('button', {
      name: /options/i
    })
    const msgOptions = screen.getByTestId('index-card-options-menu')

    fireEvent.mouseEnter(button)
    expect(msgOptions.getAttribute('data-msg')).toBe('Open options')
  })

  it('should show the correct message when the options are open', () => {
    render(
      <IndexCardOptions
        availablePosition={0}
        position={1}
        newPosition={2}
        createIndexCard={() => {}}
        setPosition={() => {}}
        deleteIndexCard={() => {}}
      />
    )

    const button = screen.getByRole('button', {
      name: /options/i
    })
    const msgOptions = screen.getByTestId('index-card-options-menu')

    fireEvent.click(button)
    fireEvent.mouseEnter(button)
    expect(msgOptions.getAttribute('data-msg')).toBe('Close options')
  })

  it('should show the correct message when hover the plus button', () => {
    render(
      <IndexCardOptions
        availablePosition={0}
        position={1}
        newPosition={2}
        createIndexCard={() => {}}
        setPosition={() => {}}
        deleteIndexCard={() => {}}
      />
    )

    const optionsButton = screen.getByRole('button', {
      name: /options/i
    })
    fireEvent.click(optionsButton)

    const createButton = screen.getByRole('button', {
      name: /create new index card/i
    })
    const msgCreate = screen.getByTestId('index-card-options-action-create')
    fireEvent.mouseEnter(createButton)
    expect(msgCreate.getAttribute('data-msg')).toBe(
      'Create a new index card at position 2'
    )
  })
})
