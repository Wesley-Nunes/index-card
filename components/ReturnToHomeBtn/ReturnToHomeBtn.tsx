import React, { memo } from 'react'
import Link from 'next/link'
import { IoIosArrowBack } from '@react-icons/all-files/io/IoIosArrowBack'
import { Button } from '../@generics'

const ReturnToHomeBtn = () => (
  <Link href='/'>
    <Button>
      <IoIosArrowBack size={36} />
    </Button>
  </Link>
)

export default memo(ReturnToHomeBtn)
