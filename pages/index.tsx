import React from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useSWRConfig } from 'swr'
import { IoTrashBinOutline } from '@react-icons/all-files/io5/IoTrashBinOutline'
import { IoLogOut } from '@react-icons/all-files/io5/IoLogOut'
import { Loading, Instructions } from 'components'
import { Button, homeStyles, IndexCardBtn, editorStyles } from 'components/@generics'
import {
  useIndexCards,
  indexCardOperations,
  positionsOperations,
  IndexCard
} from 'features/indexCard'

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
    <section className={homeStyles['container-items']}>
      {indexCards.map(({ position, id }) => (
        <div
          className={
            `${homeStyles['container-btns']} ${homeStyles['shadow-home']}`
          }
          key={id}
        >
          <Link href={`${position}`}>
            <Button>{`${position}`}</Button>
          </Link>
          <IndexCardBtn
            description='Delete current index card'
            className={homeStyles['btn-del']}
            handleClick={() => deleteIndexCard(position)}
            icon={<IoTrashBinOutline size={32} />}
          />
        </div>
      ))}
      <div
        className={
          `${homeStyles['create-wrapper']} ${homeStyles['shadow-home']}`
        }
      >
        <Button handleClick={handleClick}>Create new index card</Button>
      </div>
    </section>
  )
}

const AuthenticatedHome = () => {
  const { indexCards, isError, isLoading } = useIndexCards()

  if (!isLoading && !isError) {
    return (
      <div className={editorStyles.wrapper}>
        <Button
          handleClick={async () => {
            await signOut()
          }}
        >
          <IoLogOut size={36} />
        </Button>
        <section className={editorStyles.container}>
          <h1 className={editorStyles.title}>Index cards</h1>
          <IndexCardsContainer indexCards={indexCards} />
        </section>
      </div>
    )
  }

  return <Loading />
}
const NavBar = () => (
  <nav className={homeStyles.navbar}>
    <h1 className={homeStyles["main-heading"]}>Index Card</h1>
    <span className={homeStyles["login-wrapper"]}>
      <Button
        handleClick={async () => {
          await signIn();
        }}
      >
        Login
      </Button>
    </span>
  </nav>
);

const UnauthenticatedHome = () => (
  <>
    <NavBar />
    <p className={homeStyles['container-description']}>
      The Index Card is a tool for organizing stories in a structured and
      user-friendly way.
    </p>
    <Instructions />
  </>
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
