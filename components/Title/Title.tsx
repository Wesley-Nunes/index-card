import React, { memo } from 'react'
import { Noto_Sans } from '@next/font/google'
import styles from './Title.module.css'

const noto = Noto_Sans({
  subsets: ['latin'],
  variable: '--noto-font',
  weight: '400'
})

function Title({ title }: { title: string }) {
  return <h1 className={`${styles.title} ${noto.className}`}>{title}</h1>
}

export default memo(Title)