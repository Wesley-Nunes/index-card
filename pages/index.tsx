import { Reality as Realities } from '@prisma/client'
import Link from 'next/link'
import React from 'react'
import useSWR, { Fetcher } from 'swr'

interface User {
  id: number
  name: string
  email: string
  realities: Realities[]
  createdAt: string
  updatedAt: string
}

const fetcher: Fetcher<User[]> = (id: string) =>
  fetch(id).then(res => res.json())

export default function Reality() {
  const { error, isLoading, data } = useSWR(`api/user/uniqueIdLOL`, fetcher)

  if (error) {
    return (
      <div>
        <main>
          <strong>
            <p>
              An error occurred.
              <br /> Please, check your internet connection.
            </p>
          </strong>
        </main>
      </div>
    )
  }

  if (isLoading) {
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

  const { realities } = data![0]

  return (
    <>
      <h1>Reality Page</h1>
      {realities.map((reality, i) => (
        <Link
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
