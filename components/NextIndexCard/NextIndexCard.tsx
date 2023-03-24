import React from 'react'
import { IoIosArrowForward } from '@react-icons/all-files/io/IoIosArrowForward'
import { NewIndexCardPosLayout, NewIndexCardPosWrapper } from '../@generics'

const NextIndexCard: React.FC<NewIndexCardPosWrapper> = ({
  position,
  setPosition
}) => (
  <NewIndexCardPosLayout
    icon={<IoIosArrowForward size={24} />}
    description='Next Index Card'
    position={position}
    setPosition={setPosition}
  />
)

export default NextIndexCard
