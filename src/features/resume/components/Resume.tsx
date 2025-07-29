import { useState } from 'react'
import ProfileMain from 'assets/images/ProfileMain.svg'
import './Resume.css'
import QuizStart from 'features/quiz-app/components/QuizStart'

const Resume = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <section className="secondary-container">
        <figure className="profile-icon">
          <img src={ProfileMain} alt="" />
        </figure>
        <div className="profile-info">
          <h1 id="profile-title">Hi, I am Aman Singh</h1>
          <p>Frontend Developer</p>
          <button className="quiz-button" onClick={() => setIsModalOpen(true)}>
            Test Me
          </button>
        </div>
      </section>
      {isModalOpen && <QuizStart closeModal={handleModal} />}
    </>
  )
}

export default Resume
