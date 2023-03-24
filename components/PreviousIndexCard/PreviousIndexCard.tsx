import React from 'react'
import { IoIosArrowBack } from '@react-icons/all-files/io/IoIosArrowBack'
import { NewIndexCardPosLayout, NewIndexCardPosWrapper } from '../@generics'

const PreviousIndexCard: React.FC<NewIndexCardPosWrapper> = ({
  position,
  setPosition
}) => (
  <NewIndexCardPosLayout
    icon={<IoIosArrowBack size={24} />}
    description='Previous Index Card'
    position={position}
    setPosition={setPosition}
  />
)

export default PreviousIndexCard
