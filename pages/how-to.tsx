import React, { useState } from 'react'
import { IoIosArrowBack } from '@react-icons/all-files/io/IoIosArrowBack'
import { IoIosArrowForward } from '@react-icons/all-files/io/IoIosArrowForward'
import { IoIosAdd } from '@react-icons/all-files/io/IoIosAdd'
import { IoIosRemove } from '@react-icons/all-files/io/IoIosRemove'
import { IoIosArrowDown } from '@react-icons/all-files/io/IoIosArrowDown'
import { StepBtn, HowToStyles } from 'components/@generics'
import { ReturnToHomeBtn } from 'components'

interface Steps {
  [key: string]: React.ReactNode
}

const Login = () => (
  <>
    <p>
      <strong>To Login:</strong>
    </p>
    <p>1. Access the home page;</p>
    <p>2. Click on the login button;</p>
    <p>3. Log in with your GitHub account.</p>
  </>
)
const Home = () => (
  <>
    <div>
      <p>
        <strong>On the home page, you can:</strong>
      </p>
      <p>- Create, access, or delete the index cards;</p>
      <p>- Logout.</p>
    </div>
    <br />
    <div>
      <p>
        <strong>To create a new index card:</strong>
      </p>
      <p>Click on the &lsquo;Create new index card&rsquo; button.</p>
    </div>
    <br />
    <div>
      <p>
        <strong>To access the index card:</strong>
      </p>
      <p>Click on the number of the index card.</p>
    </div>
    <br />
    <div>
      <p>
        <strong>To delete the index card:</strong>
      </p>
      <p>Click on the trash icon on the right of the index card.</p>
    </div>
    <br />
    <div>
      <p>
        <strong>To Logout:</strong>
      </p>
      <p>Click on the &lsquo;Logout&rsquo; button.</p>
    </div>
  </>
)
const IndexCard = () => (
  <>
    <div>
      <p>
        <strong>On the index card page, you can:</strong>
      </p>
      <p>- Edit the current index card;</p>
      <p>- Go to the next or previous index card;</p>
      <p>- Access the index card options(covered in the next step).</p>
    </div>
    <br />
    <div>
      <p>
        <strong>To edit the index card:</strong>
      </p>
      <p>You have three texts fields, Scene heading, Synopsis, and conflict.</p>
      <p>Click in the desired text field and start typing.</p>
      <p>The content is saved automatically.</p>
    </div>
    <br />
    <div>
      <p>
        <strong>To navigate between the index cards:</strong>
      </p>
      <p>
        Click on the &lsquo;Previous Index Card: <IoIosArrowBack size={14} />
        &rsquo; button or &lsquo;Next Index Card:{' '}
        <IoIosArrowForward size={14} />
        &rsquo; button.
      </p>
    </div>
  </>
)
const IndexCardOptions = () => (
  <>
    <div>
      <p>
        <strong>
          On the index card page(After click the &lsquo;options{' '}
          <IoIosArrowDown size={14} />
          &rsquo; button), you can:
        </strong>
      </p>
      <p>- Create a new index card;</p>
      <p>- Delete the current index card.</p>
    </div>
    <br />
    <div>
      <p>
        <strong>To create a new index card:</strong>
      </p>
      <p>
        Click on the &lsquo;Create new index card: <IoIosAdd size={14} />
        &rsquo; button.
      </p>
    </div>
    <br />
    <div>
      <p>
        <strong>To delete the current index card:</strong>
      </p>
      <p>
        Click on the &lsquo;Delete the current index card:{' '}
        <IoIosRemove size={14} />
        &rsquo; button.
      </p>
    </div>
  </>
)

const HowTo: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const handleTabClick = (index: number) => {
    setActiveIndex(index)
  }
  const tabs = ['Login', 'Home', 'Index Card', 'Index Card Options']
  const steps: Steps = {
    Login: <Login />,
    Home: <Home />,
    'Index Card': <IndexCard />,
    'Index Card Options': <IndexCardOptions />
  }

  return (
    <div className={HowToStyles['how-to-container']}>
      <ReturnToHomeBtn />
      <div className={HowToStyles.grid}>
        <ul className={HowToStyles.items}>
          {tabs.map((tab, index) => (
            <button
              key={tab}
              className={HowToStyles.btn}
              type='button'
              onClick={() => handleTabClick(index)}
            >
              <li
                className={`${HowToStyles.item} ${
                  activeIndex === index ? HowToStyles['active-item'] : ''
                }`}
              >
                {tab}
              </li>
            </button>
          ))}
        </ul>
        <div className={`${HowToStyles['previous-step']} `}>
          {activeIndex === 0 ? (
            ''
          ) : (
            <StepBtn
              icon={<IoIosArrowBack size={24} color='var(--accent-color)' />}
              handleClick={() => {
                if (activeIndex > 0) {
                  handleTabClick(activeIndex - 1)
                }
              }}
            />
          )}
        </div>
        <div className={HowToStyles['step-description']}>
          {steps[tabs[activeIndex]]}
        </div>
        <div className={`${HowToStyles['next-step']}`}>
          {' '}
          {activeIndex === tabs.length - 1 ? (
            ''
          ) : (
            <StepBtn
              icon={<IoIosArrowForward size={24} color='var(--accent-color)' />}
              handleClick={() => {
                if (activeIndex < tabs.length - 1) {
                  handleTabClick(activeIndex + 1)
                }
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default HowTo
