import { useEffect, useRef, useState } from 'react'
import './QuizStart.css'
import QuizMain from './QuizMain'

interface quizStartProp {
  closeModal: () => void
}
const QuizStart = ({ closeModal }: quizStartProp) => {
  const [time, setTime] = useState('')
  const [isQuizModal, setIsQuizModal] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e)
    const regex = /^\d*$/
    if (regex.test(e.target.value)) {
      setTime(e.target.value)
    }
  }

  const handleStart = () => {
    const numeric = Number(time)
    if (!time || isNaN(numeric) || numeric <= 0 || numeric > 60) {
      alert('Please enter the valid time(in seconds)')
      return
    }
    setIsQuizModal(true)
  }

  const handleEscClose = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      document.removeEventListener('keydown', handleEscClose)
      closeModal()
    }
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }

    document.addEventListener('keydown', handleEscClose)
  }, [])

  return (
    <>
      <div className="modal-overlay" aria-hidden="true"></div>
      {isQuizModal ? (
        <QuizMain closeModal={closeModal} time={time} />
      ) : (
        <section className="quiz-modal">
          <h2 className="intro-text" id="quiz-modal">
            Welcome to the Quiz
          </h2>
          <label htmlFor="time-input">
            Enter time limit (in seconds, max 60)
          </label>
          <input
            id="time-input"
            type="number"
            value={time}
            ref={inputRef}
            onChange={handleChange}
            required
            placeholder="Ex-21"
          />

          <nav
            className="quiz-button-container"
            aria-label="Quiz start and cancel section"
          >
            <button className="start-button" onClick={handleStart}>
              Start
            </button>
            <button className="cancel-button" onClick={closeModal}>
              Close
            </button>
          </nav>
        </section>
      )}
    </>
  )
}

export default QuizStart
