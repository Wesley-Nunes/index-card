import React from 'react'
import { Html, Head, Main, NextScript } from 'next/document'
import { notoSans } from '../app/fonts'

export default function Document() {
  return (
    <Html lang='en' className={notoSans.className}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
