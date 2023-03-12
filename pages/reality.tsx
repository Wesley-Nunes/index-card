import React from 'react'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { Reality as Realities } from '@prisma/client'
import prisma from 'features/@generics/prisma'
import Link from 'next/link'

export default function Reality({ realities }: { realities: Realities[] }) {
  return (
    <>
      <h1>Reality Page</h1>
      {realities.map((reality, i) => (
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

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
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

  const realities = await prisma.reality.findMany({
    where: { user: { email: session.user?.email as string } }
  })
  const realitiesWithDateStringified = realities.map(
    ({ id, title, description, dateOfCreation, userId }) => ({
      id,
      title,
      description,
      dateOfCreation: JSON.stringify(dateOfCreation),
      userId
    })
  )

  return {
    props: {
      realities: realitiesWithDateStringified
    }
  }
}
