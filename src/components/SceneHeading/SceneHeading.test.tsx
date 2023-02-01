import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import SceneHeading from './SceneHeading'

describe('Scene Heading', () => {
  it('should render a scene heading input field', () => {
    render(<SceneHeading sceneHeading='' state='success' />)

    const sceneHeading = screen.getByRole<HTMLInputElement>('textbox', {
      name: /scene heading/i
    })

    expect(sceneHeading).toBeInTheDocument()
    expect(sceneHeading).toBeVisible()
  })

  it('should be possible to change the text content of the scene heading', () => {
    render(<SceneHeading sceneHeading='INT. Castelo' state='success' />)

    const sceneHeading = screen.getByRole<HTMLInputElement>('textbox', {
      name: /scene heading/i
    })

    expect(sceneHeading.value).toBe('INT. Castelo')

    fireEvent.change(sceneHeading, { target: { value: 'INT. Casebre' } })

    expect(sceneHeading.value).toBe('INT. Casebre')
  })

  it('should NOT be possible to change the text content of the scene heading when the state is loading', () => {
    render(<SceneHeading sceneHeading='INT. Castelo' state='loading' />)

    const sceneHeading = screen.getByRole<HTMLInputElement>('textbox', {
      name: /scene heading/i
    })

    expect(sceneHeading.value).toBe('INT. Castelo')

    fireEvent.change(sceneHeading, { target: { value: 'INT. Casebre' } })

    expect(sceneHeading.value).toBe('INT. Castelo')
  })
})
