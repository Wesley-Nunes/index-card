import React, { memo } from 'react'
import { IoLocationSharp } from '@react-icons/all-files/io5/IoLocationSharp'
import { TextLayout, TextLayoutWrapper } from '../@generics'

const SceneHeading: React.FC<TextLayoutWrapper> = ({ text, setText, id }) => (
  <TextLayout
    description='scene heading'
    icon={<IoLocationSharp />}
    text={text}
    setText={setText}
    id={id}
  />
)

export default memo(SceneHeading)
