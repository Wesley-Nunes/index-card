import { Timeline as Timelines } from '@prisma/client'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import prisma from 'features/@generics/prisma'

export default function Timeline({ timelines }: { timelines: Timelines[] }) {
  return (
    <>
      <h1>Timeline Page</h1>
      {timelines.map((timeline, i) => (
        <Link
          key={timeline.id}
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

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query
}) => {
  const session = await getSession({ req })
  if (!session) {
    res.statusCode = 403
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    }
  }

  const queryId = parseInt(query.id as string, 10)
  const timelines = await prisma.timeline.findMany({
    where: {
      reality: {
        user: {
          email: session.user?.email as string
        },
        id: queryId
      }
    }
  })
  const timelinesWithDateStringified = timelines.map(
    ({ id, title, description, dateOfCreation, realityId }) => ({
      id,
      title,
      description,
      dateOfCreation: JSON.stringify(dateOfCreation),
      realityId
    })
  )

  return {
    props: {
      timelines: timelinesWithDateStringified
    }
  }
}
