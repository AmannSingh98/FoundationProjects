import { useEffect, useRef, useState } from 'react'
import './QuizModal.css'
import { data } from './data.ts'
const QuizModal = ({ handleModal }) => {
  const [time, setTime] = useState('')
  const [quiz, setQuiz] = useState(false)
  const inputRef = useRef(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (/^\d*$/.test(value)) {
      setTime(value)
    }
  }

  const handleStart = () => {
    if (!time || isNaN(time) || Number(time) <= 0 || Number(time) > 60) {
      alert('Please enter a valid number of seconds.')
      return
    }
    setQuiz(true)
  }
  const handleCancel = () => {
    handleModal(false)
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <>
      <div className="modal-overlay"></div>
      {quiz ? (
        <div className="quiz-modal">
          <h2>Quiz App</h2>
          {data.map(val => (
            <div>
              <span>{val.question}</span>
              <li>
                {val.answers.map(v => {
                  return (
                    <div>
                      <span>{v.solution}</span>
                    </div>
                  )
                })}
              </li>
            </div>
          ))}
        </div>
      ) : (
        <div className="quiz-modal">
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

          <div className="quiz-button-container">
            <button className="start-button" onClick={handleStart}>
              Start Quiz
            </button>
            <button className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default QuizModal
