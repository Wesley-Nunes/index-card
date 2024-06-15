import React from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useSWRConfig } from 'swr'
import { IoTrashSharp } from '@react-icons/all-files/io5/IoTrashSharp'
import { Loading } from 'components'
import { Button, homeStyles, IndexCardBtn } from 'components/@generics'
import {
  useIndexCards,
  indexCardOperations,
  positionsOperations,
  IndexCard
} from 'features/indexCard'
import { Url } from 'next/dist/shared/lib/router/router'

const IndexCardsContainer = ({
  indexCards = []
}: {
  indexCards: IndexCard[]
}) => {
  const { mutate } = useSWRConfig()
  const { createIndexCard, deleteIndexCard } = indexCardOperations(
    indexCards,
    mutate
  )
  const handleClick = () => {
    const positionList = indexCards.map(indexCard => indexCard.position)
    const { getPositionOfTheNewIndexCard } = positionsOperations(
      positionList,
      1
    )

    createIndexCard(getPositionOfTheNewIndexCard)
  }

  return (
    <>
      <Button handleClick={handleClick}>Create new index card</Button>
      <section className={homeStyles['container-items']}>
        {indexCards.map(({ position, id }) => (
          <div className={homeStyles['container-btns']} key={id}>
            <Link href={`${position}`}>
              <Button>{`${position}`}</Button>
            </Link>
            <IndexCardBtn
              description='Delete current index card'
              className={homeStyles['btn-del']}
              handleClick={() => deleteIndexCard(position)}
              icon={<IoTrashSharp size={22} color='var(--accent-color)' />}
            />
          </div>
        ))}
      </section>
    </>
  )
}

const AuthenticatedHome = () => {
  const { indexCards, isError, isLoading } = useIndexCards()

  if (!isLoading && !isError) {
    return (
      <div className={homeStyles['container-page']}>
        <span>
          <h1>Index Card</h1>
          <Button
            handleClick={async () => {
              await signOut()
            }}
          >
            Logout
          </Button>
        </span>
        <hr />
        <IndexCardsContainer indexCards={indexCards} />
      </div>
    )
  }

  return <Loading />
}

const UnauthenticatedHome = () => (
  <div className={homeStyles['container-page']}>
    <h1>Index Card</h1>
    <p className={homeStyles['container-description']}>
      The Index Card is a tool for organizing stories in a structured and
      user-friendly way.
    </p>
    <section className={homeStyles['container-items']}>
      <Link href={process.env.NEXT_PUBLIC_DOCS as Url}>
        <Button>How To</Button>
      </Link>
      <Button
        handleClick={async () => {
          await signIn()
        }}
      >
        Login
      </Button>
    </section>
  </div>
)

function Home() {
  const { status } = useSession()

  if (status === 'authenticated') {
    return <AuthenticatedHome />
  }

  if (status === 'unauthenticated') {
    return <UnauthenticatedHome />
  }

  return <Loading />
}

export default Home
