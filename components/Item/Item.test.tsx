import React from 'react'
import { render, screen } from '@testing-library/react'
import Item from './Item'

describe('Item', () => {
  it('should render the title', () => {
    const title = 'Test Title'
    render(<Item title={title} />)

    const titleElement = screen.getByText(title)
    expect(titleElement).toBeInTheDocument()
  })

  it('should render the children content when children are present', () => {
    const childrenContent = 'Children Content'
    render(
      <Item title='Test Title'>
        <div>{childrenContent}</div>
      </Item>
    )

    const childrenElement = screen.getByText(childrenContent)
    expect(childrenElement).toBeInTheDocument()
  })

  it('should not render any children content when children are not present', () => {
    render(<Item title='Test Title' />)

    const childrenElement = screen.queryByRole('presentation')
    expect(childrenElement).not.toBeInTheDocument()
  })
})
