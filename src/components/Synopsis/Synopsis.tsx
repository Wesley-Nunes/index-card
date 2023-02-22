import React, { memo } from 'react'
import { IoReaderSharp } from '@react-icons/all-files/io5/IoReaderSharp'
import { TextLayout, TextLayoutWrapper } from '../@generics'

function Synopsis({ text, setText, state }: TextLayoutWrapper) {
  return (
    <TextLayout
      description='synopsis'
      icon={<IoReaderSharp />}
      text={text}
      setText={setText}
      state={state}
    />
  )
}

export default memo(Synopsis)
