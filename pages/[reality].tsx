import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTimeline } from 'features/timeline'

export default function Reality() {
  const { timelines, isLoading, isError } = useTimeline()
  const router = useRouter()
  const realityTitle = router.query.reality as string

  if (isLoading) {
    return <h1>loading</h1>
  }
  if (isError) {
    return <h1>Error</h1>
  }

  return (
    <>
      <h1>
        Timelines of reality:{' '}
        <span style={{ textTransform: 'capitalize' }}>{realityTitle}</span>
      </h1>
      {timelines.map((timeline, i) => (
        <Link
          key={timeline.id}
          href={{
            pathname: `${realityTitle}/${timeline.title}`
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
