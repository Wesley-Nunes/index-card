import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

import { IoIosArrowUp } from '@react-icons/all-files/io/IoIosArrowUp'
import { IoIosArrowDown } from '@react-icons/all-files/io/IoIosArrowDown'
import { IoIosMore } from '@react-icons/all-files/io/IoIosMore'
// import { useRouter } from 'next/router'
// import { loginPage } from 'features/@generics/urls'
import { useUniverse } from 'features/universe'
import { useStory } from 'features/story'
// import Link from 'next/link'

const Item = ({
  title,
  children
}: {
  title: string | number
  children?: JSX.Element | JSX.Element[] | null
}) => {
  const [childrenVisibility, toggleChildrenVisibility] = useState(false)
  const Arrow = childrenVisibility ? (
    <IoIosArrowUp size={24} />
  ) : (
    <IoIosArrowDown size={24} />
  )

  useEffect(() => {
    if (children) {
      toggleChildrenVisibility(true)
    }
  }, [children, childrenVisibility])

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        flexDirection: 'column',
        rowGap: 8,
        fontSize: '2.4rem',
        marginBottom: 16
      }}
    >
      <div style={{ display: 'flex', columnGap: 32 }}>
        <span style={{ borderBottom: '1px dashed green' }}>{title}</span>
        {typeof title === 'string' ? Arrow : <div style={{ width: 24 }} />}
        <IoIosMore size={24} />
      </div>
      {children ? <div style={{ marginLeft: 32 }}>{children}</div> : <> </>}
    </div>
  )
}

Item.defaultProps = {
  children: null
}

function Home() {
  // const router = useRouter()
  const { data: session, status } = useSession()
  const { universes, loadingUniverses, errorUniverses } = useUniverse()
  const { stories, loadingStories, errorStories } = useStory()

  if (status === 'loading' || loadingUniverses || loadingStories) {
    return <h1>Loading</h1>
  }

  if ((errorUniverses || errorStories) && status !== 'unauthenticated') {
    return <h1>Error</h1>
  }

  if (session) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '99vh'
        }}
      >
        {universes.length ? (
          universes.map(universe => (
            <Item title={universe.title} key={universe.id}>
              {stories.length ? (
                stories
                  .filter(story => story.universeId === universe.id)
                  .map(story => <Item title={story.title} key={story.id} />)
              ) : (
                <> </>
              )}
            </Item>
          ))
        ) : (
          <> </>
        )}
      </div>
    )
  }

  // if (session) {
  //   return (
  //     <div
  //       style={{
  //         display: 'flex',
  //         flexDirection: 'column',
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //         height: '99vh'
  //       }}
  //     >
  //       {realities.length ? (
  //         realities.map(reality => (
  //           <Item title={reality.title} key={reality.id}>
  //             {reality?.timelines.length ? (
  //               reality.timelines.map(timeline => (
  //                 <Item title={timeline.title} key={timeline.id}>
  //                   {timeline?.indexCards.length ? (
  //                     timeline.indexCards.map(indexCard => (
  //                       <Link
  //                         key={indexCard.id}
  //                         href={{
  //                           pathname: `${reality.title}/${timeline.title}/${indexCard.position}`
  //                         }}
  //                       >
  //                         <Item title={indexCard.position} key={indexCard.id} />
  //                       </Link>
  //                     ))
  //                   ) : (
  //                     <> </>
  //                   )}
  //                 </Item>
  //               ))
  //             ) : (
  //               <> </>
  //             )}
  //           </Item>
  //         ))
  //       ) : (
  //         <> </>
  //       )}

  //       {/* <Item title='Marvel Cinematic'>
  //         <Item title='Iron Man'>
  //           <Item title={1} />
  //           <Item title={2} />
  //           <Item title={3} />
  //         </Item>
  //         <Item title='Thor' />
  //       </Item> */}
  //     </div>
  //   )
  // }
}

export default Home
