import React, { memo } from 'react'
import { IoReaderSharp } from '@react-icons/all-files/io5/IoReaderSharp'
import { TextLayout, TextLayoutWrapper } from '../@generics'

const Synopsis: React.FC<TextLayoutWrapper> = ({ text, setText, id }) => (
  <TextLayout
    description='synopsis'
    icon={<IoReaderSharp />}
    text={text}
    setText={setText}
    id={id}
  />
)

export default memo(Synopsis)
