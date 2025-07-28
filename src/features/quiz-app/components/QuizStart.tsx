import { useEffect, useRef, useState } from 'react'
import './QuizStart.css'
import QuizMain from './QuizMain'

const QuizStart = ({ closeModal }) => {
  const [time, setTime] = useState('')
  const [isQuizModal, setIsQuizModal] = useState(false)
  const inputRef = useRef(null)

  const handleChange = e => {
    const regex = /^\d*$/
    if (regex.test(time)) {
      setTime(e.target.value)
    }
  }

  const handleStart = () => {
    if (!time || isNaN(time) || Number(time) <= 0 || Number(time) > 60) {
      alert('Please enter the valid time(in seconds)')
      return
    }
    setIsQuizModal(true)
  }

  const handleCancel = () => {
    closeModal()
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <>
      <div className="modal-overlay"></div>
      {isQuizModal ? (
        <QuizMain close={handleCancel} />
      ) : (
        <section className="quiz-modal">
          <h2 className="intro-text">Welcome to the Quiz</h2>
          <label>
            <input
              type="number"
              value={time}
              ref={inputRef}
              onChange={handleChange}
              required
              placeholder="Time/Question (<= 60 Sec)"
            />
          </label>
          <nav className="quiz-button-container">
            <button className="start-button" onClick={handleStart}>
              Start
            </button>
            <button className="cancel-button" onClick={handleCancel}>
              Close
            </button>
          </nav>
        </section>
      )}
    </>
  )
}

export default QuizStart
