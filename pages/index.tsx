import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useReality } from 'features/reality'

function Home() {
  const { data: session, status } = useSession()
  const { realities, isLoading, isError } = useReality()

  if (status === 'loading' || isLoading) {
    return <h1>Loading</h1>
  }

  if (isError && status !== 'unauthenticated') {
    return <h1>Error</h1>
  }

  if (!session) {
    return (
      <div className='right'>
        <Link href='/api/auth/signin'>
          <button type='button' data-testid='signBtn'>
            Log in
          </button>
        </Link>
      </div>
    )
  }

  if (session) {
    return (
      <>
        <h1>Realities</h1>
        {realities!.map((reality, i) => (
          <Link
            key={reality.id}
            href={{
              pathname: reality.title
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
}

export default Home
