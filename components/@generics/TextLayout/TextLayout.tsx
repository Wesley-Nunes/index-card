import React, { useMemo } from 'react'
import styles from './TextLayout.module.css'
import type { TextLayoutProps } from './TextLayout.interface'

const TextLayout: React.FC<TextLayoutProps> = ({
  icon,
  description,
  text,
  setText,
  id
}) => {
  const containerClassNames = useMemo(
    () =>
      [
        styles.container,
        description === 'scene heading'
          ? styles['grid-scene-heading-item']
          : '',
        description === 'synopsis'
          ? `${styles['full-height']} ${styles['grid-synopsis-item']}`
          : '',
        description === 'conflict' ? styles['grid-conflict-item'] : ''
      ].join(' '),
    [description]
  )

  return (
    <span className={containerClassNames}>
      {icon}
      <textarea
        className={`${styles.input} ${styles['no-resize']} ${styles['full-height']}`}
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
