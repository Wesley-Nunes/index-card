import React, { memo } from 'react'
import { IoPulseSharp } from '@react-icons/all-files/io5/IoPulseSharp'
import { TextLayout, TextLayoutWrapper } from '../@generics'

const Conflict: React.FC<TextLayoutWrapper> = ({ text, setText, id }) => (
  <TextLayout
    description='conflict'
    icon={<IoPulseSharp />}
    text={text}
    setText={setText}
    id={id}
  />
)

export default memo(Conflict)
