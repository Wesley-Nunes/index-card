import React, { useMemo } from 'react'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { IconContext } from '@react-icons/all-files'
import 'features/@generics/global.css'

export default function App({ Component, pageProps }: AppProps) {
  const textColor = useMemo(() => ({ color: '#7bae8c' }), [])

  return (
    <SessionProvider session={pageProps.session}>
      <IconContext.Provider value={textColor}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </IconContext.Provider>
    </SessionProvider>
  )
}
