import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import ProfileMain from 'assets/images/ProfileMain.webp'
import './Resume.css'
import '../../quiz-app/components/QuizStart.css'

// import lazy load for the quiz start component
const QuizStart = lazy(() => import('features/quiz-app/components/QuizStart'))

const Resume = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const testRef = useRef<HTMLButtonElement | null>(null)

  const handleModal = (): void => {
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
          <img
            src={ProfileMain}
            alt=""
            data-testid="profile-image"
            width={150}
            height={300}
            fetchPriority="high"
          />
        </figure>
        <div className="profile-info">
          <h1 id="profile-title">Hi, I am Aman Singh</h1>
          <p>Frontend Developer</p>
          <button
            className="quiz-button"
            onClick={() => setIsModalOpen(true)}
            ref={testRef}
            aria-haspopup="dialog"
          >
            Test Me
          </button>
        </div>
      </section>
      {isModalOpen && (
        <Suspense
          fallback={
            <div className="modal-overlay">
              <div className="quiz-modal">
                <h2>Loading...</h2>
              </div>
            </div>
          }
        >
          <QuizStart closeModal={handleModal} />
        </Suspense>
      )}
    </>
  )
}

export default Resume
