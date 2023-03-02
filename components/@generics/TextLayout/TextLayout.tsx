import React from 'react'
import type { TextLayoutProps } from './TextLayout.interface'
import styles from './TextLayout.module.css'

function TextLayout({
  icon,
  description,
  text,
  setText,
  state,
  id
}: TextLayoutProps) {
  return (
    <span
      className={`
        ${styles.container}
        ${description !== 'conflict' ? styles.divider : ''}
        ${description === 'synopsis' ? styles.fullHeight : ''}`}
    >
      {icon}
      <textarea
        className={`
          ${styles[`${state}`]}
          ${styles.input} ${styles.noResize} ${styles.fullHeight}
        `}
        name={description}
        aria-label={description}
        placeholder={description}
        disabled={state === 'loading'}
        readOnly={state === 'loading'}
        value={text}
        onChange={e =>
          state === 'success' && setText({ value: e.target.value, id })
        }
        data-testid={description}
      />
    </span>
  )
}

export default TextLayout
