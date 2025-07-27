import { useState } from 'react'
import ProfileMain from '../../assets/images/ProfileMain.svg'
import './Resume.css'
import QuizModal from '../quiz-app/QuizModal'
const Resume = () => {
  const [modal, setModal] = useState(false)

  // const handleClick = (): void => {
  //   console.log('button clicked')
  // }

  return (
    <>
      <section className="secondary-container">
        <figure className="profile-icon">
          <img src={ProfileMain} alt="" />
        </figure>
        <div className="profile-into">
          <h1>Hi, I am Aman Singh</h1>
          <p>Frontend Developer</p>
          <button className="quiz-button" onClick={() => setModal(true)}>
            Test Me
          </button>
        </div>
      </section>
      {modal && <QuizModal handleModal={setModal} />}
    </>
  )
}

export default Resume
