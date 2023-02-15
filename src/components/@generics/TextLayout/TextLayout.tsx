import React from 'react'
import type { TextLayoutProps } from './TextLayout.interface'
import styles from './TextLayout.module.css'

function TextLayout({
  icon,
  description,
  text,
  setText,
  state,
  withTextArea = false
}: TextLayoutProps) {
  return (
    <span
      className={`${styles.container} ${withTextArea ? styles.fullHeight : ''}`}
    >
      {icon}
      {withTextArea ? (
        <textarea
          name={description}
          aria-label={description}
          placeholder={description}
          className={`${styles.input} ${styles.fullHeight} ${styles.noResize} ${
            styles[`${state}`]
          }`}
          disabled={state === 'loading'}
          readOnly={state === 'loading'}
          value={text}
          onChange={e => state === 'success' && setText(e.target.value)}
        />
      ) : (
        <input
          type='text'
          name={description}
          aria-label={description}
          placeholder={description}
          className={`${styles.input} ${styles[`${state}`]}`}
          disabled={state === 'loading'}
          readOnly={state === 'loading'}
          value={text}
          onChange={e => state === 'success' && setText(e.target.value)}
        />
      )}
    </span>
  )
}

export default TextLayout
