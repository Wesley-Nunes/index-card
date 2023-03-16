import React from 'react'
import Link from 'next/link'
import { useReality } from 'features/reality'

export default function Reality() {
  const { realities, isLoading, isError } = useReality()

  if (isLoading) {
    return <h1>loading</h1>
  }
  if (isError) {
    return <h1>Error</h1>
  }

  return (
    <>
      <h1>Reality Page</h1>
      {realities!.map((reality, i) => (
        <Link
          key={reality.id}
          href={{
            pathname: '/timeline',
            query: { id: reality.id }
          }}
        >
          <button type='button' data-testid={`reality-${i + 1}`}>
            {reality.title}
          </button>
        </Link>
      ))}
    </>
  )
}
