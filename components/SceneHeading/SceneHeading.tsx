import React, { memo } from 'react'
import { IoLocationSharp } from '@react-icons/all-files/io5/IoLocationSharp'
import { TextLayout, TextLayoutWrapper } from '../@generics'

function SceneHeading({ text, setText, state, id }: TextLayoutWrapper) {
  return (
    <TextLayout
      description='scene heading'
      icon={<IoLocationSharp />}
      text={text}
      setText={setText}
      state={state}
      id={id}
    />
  )
}

export default memo(SceneHeading)
