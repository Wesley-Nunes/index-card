import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

function Home() {
  const router = useRouter()
  const { data: session, status } = useSession()

  if (session) {
    router.push('/reality')
  }

  if (status === 'loading') {
    return (
      <div>
        <main>
          <strong>
            <p>Loading</p>
          </strong>
        </main>
      </div>
    )
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
}

export default Home
