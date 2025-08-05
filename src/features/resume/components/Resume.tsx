import { useEffect, useRef, useState } from 'react'
import ProfileMain from 'assets/images/ProfileMain.svg'
import './Resume.css'
import QuizStart from 'features/quiz-app/components/QuizStart'

const Resume = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const testRef = useRef<HTMLButtonElement | null>(null)

  const handleModal: () => void = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    if (!isModalOpen && testRef.current) {
      testRef.current.focus()
    }
  }, [isModalOpen])

  return (
    <>
      <section className="secondary-container" aria-hidden={isModalOpen}>
        <figure className="profile-icon">
          <img src={ProfileMain} alt="" data-testid="profile-image" />
        </figure>
        <div className="profile-info">
          <h1 id="profile-title">Hi, I am Aman Singh</h1>
          <p>Frontend Developer</p>
          <button
            className="quiz-button"
            onClick={() => setIsModalOpen(true)}
            ref={testRef}
          >
            Test Me
          </button>
        </div>
      </section>
      {isModalOpen && <QuizStart closeModal={handleModal} />}
    </>
  )
}

export default Resume
