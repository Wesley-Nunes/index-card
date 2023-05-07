import React from 'react'
import { render, screen } from '@testing-library/react'
import SceneHeading from './SceneHeading'

describe('Scene Heading', () => {
  it('should render a scene heading input field', () => {
    render(<SceneHeading text='' setText={() => {}} />)

    const sceneHeading = screen.getByRole<HTMLInputElement>('textbox', {
      name: /scene heading/i
    })

    expect(sceneHeading).toBeInTheDocument()
    expect(sceneHeading).toBeVisible()
  })

  it('should be possible to change the text content of the scene heading', () => {
    render(<SceneHeading text='INT. Castelo' setText={() => {}} />)

    const sceneHeading = screen.getByRole<HTMLInputElement>('textbox', {
      name: /scene heading/i
    })

    expect(sceneHeading.value).toBe('INT. Castelo')

    sceneHeading.value = 'INT. Casebre'

    expect(sceneHeading.value).toBe('INT. Casebre')
  })
})
