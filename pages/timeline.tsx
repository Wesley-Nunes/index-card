import { Timeline as Timelines } from '@prisma/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import useSWR, { Fetcher } from 'swr'

interface Reality {
  id: number
  name: string
  email: string
  timelines: Timelines[]
  createdAt: string
  updatedAt: string
}

const fetcher: Fetcher<Reality[]> = (id: string) =>
  fetch(id).then(res => res.json())

export default function Timeline() {
  const router = useRouter()
  const { id } = router.query

  const { error, isLoading, data } = useSWR(`api/reality/${id}`, fetcher)

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

  const { timelines } = data![0]

  return (
    <>
      <h1>Timeline Page</h1>
      {timelines.map((timeline, i) => (
        <Link
          href={{
            pathname: '/editor',
            query: { id: timeline.id }
          }}
        >
          <button type='button' data-testid={`timeline-${i + 1}`}>
            {timeline.title}
          </button>
        </Link>
      ))}
    </>
  )
}
