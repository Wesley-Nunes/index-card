import React, { memo } from 'react'
import { IoPulseSharp } from '@react-icons/all-files/io5/IoPulseSharp'
import { TextLayout, TextLayoutWrapper } from '../@generics'

function Conflict({ text, setText, state }: TextLayoutWrapper) {
  return (
    <TextLayout
      description='conflict'
      icon={<IoPulseSharp />}
      text={text}
      setText={setText}
      state={state}
    />
  )
}

export default memo(Conflict)
