import React, { useMemo } from 'react'
import { firaMono } from 'app/fonts'
import styles from './TextLayout.module.css'
import type {
  TextLayoutProps,
  TextLayoutTextFields
} from './TextLayout.interface'

const TextLayout: React.FC<TextLayoutProps> = ({
  icon,
  description,
  text,
  setText
}) => {
  const containerClassNames = useMemo(() => {
    const classes = [styles.container]
    if (description === 'scene heading') {
      classes.push(styles['grid-scene-heading-item'])
    } else if (description === 'synopsis') {
      classes.push(styles['full-height'], styles['grid-synopsis-item'])
    } else if (description === 'conflict') {
      classes.push(styles['grid-conflict-item'])
    }
    return classes.join(' ')
  }, [description])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const fieldName =
      e.target.name === 'scene heading'
        ? 'sceneHeading'
        : (e.target.name as TextLayoutTextFields)
    setText({ [fieldName]: e.target.value })
  }

  return (
    <span className={`${containerClassNames} ${firaMono.className}`}>
      {icon}
      <textarea
        className={`${styles.input} ${styles['no-resize']} ${styles['full-height']}`}
        name={description}
        aria-label={description}
        placeholder={description}
        value={text}
        onChange={e => handleChange(e)}
        data-testid={description}
      />
    </span>
  )
}

export default TextLayout
