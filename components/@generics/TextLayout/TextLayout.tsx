import React from 'react'
import styles from './TextLayout.module.css'
import type { TextLayoutProps } from './TextLayout.interface'

const TextLayout: React.FC<TextLayoutProps> = ({
  icon,
  description,
  text,
  setText,
  id
}) => {
  const containerClassNames = [
    styles.container,
    description !== 'conflict' ? styles.divider : '',
    description === 'synopsis' ? styles.fullHeight : ''
  ].join(' ')

  return (
    <span className={containerClassNames}>
      {icon}
      <textarea
        className={`${styles.input} ${styles.noResize} ${styles.fullHeight}`}
        name={description}
        aria-label={description}
        placeholder={description}
        value={text}
        onChange={e => setText({ value: e.target.value, id })}
        data-testid={description}
      />
    </span>
  )
}

export default TextLayout
