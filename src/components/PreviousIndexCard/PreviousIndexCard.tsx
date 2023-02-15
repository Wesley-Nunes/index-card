import React from 'react'
import { IoArrowBackCircleSharp } from '@react-icons/all-files/io5/IoArrowBackCircleSharp'
import { NewIndexCardPosLayout, NewIndexCardPosWrapper } from '../@generics'

function PreviousIndexCard({
  position,
  setPosition,
  state
}: NewIndexCardPosWrapper) {
  const currentState = position === 0 ? 'error' : state

  return (
    <NewIndexCardPosLayout
      icon={<IoArrowBackCircleSharp size={24} />}
      description='Previous Index Card'
      position={position}
      setPosition={setPosition}
      state={currentState}
    />
  )
}

export default PreviousIndexCard
