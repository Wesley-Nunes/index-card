import React from 'react'
import { IoIosArrowForward } from '@react-icons/all-files/io/IoIosArrowForward'
import { NewIndexCardPosLayout, NewIndexCardPosWrapper } from '../@generics'

function NextIndexCard({
  position,
  setPosition,
  state
}: NewIndexCardPosWrapper) {
  const currentState = position === 0 ? 'error' : state

  return (
    <NewIndexCardPosLayout
      icon={<IoIosArrowForward size={24} />}
      description='Next Index Card'
      position={position}
      setPosition={setPosition}
      state={currentState}
    />
  )
}

export default NextIndexCard
