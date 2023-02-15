import React from 'react'
import { IoArrowForwardCircleSharp } from '@react-icons/all-files/io5/IoArrowForwardCircleSharp'
import { NewIndexCardPosLayout, NewIndexCardPosWrapper } from '../@generics'

function NextIndexCard({
  position,
  setPosition,
  state
}: NewIndexCardPosWrapper) {
  const currentState = position === 0 ? 'error' : state

  return (
    <NewIndexCardPosLayout
      icon={<IoArrowForwardCircleSharp size={24} />}
      description='Next Index Card'
      position={position}
      setPosition={setPosition}
      state={currentState}
    />
  )
}

export default NextIndexCard
