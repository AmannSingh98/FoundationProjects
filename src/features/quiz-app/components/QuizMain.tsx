import './QuizStart.css'
import useModal from '../hooks/useModal'
import { useEffect, useRef, useState } from 'react'

const QuizMain = ({ close, time }) => {
  const [timer, setTimer] = useState(time)
  const timerRef = useRef(null)
  const scoreRef = useRef(0)

  const {
    quizData,
    counter,
    handleCounter,
    handleSolution,
    nextButtonShow,
    selectedAnswer,
    showResult
  } = useModal()

  const handleCancel = () => {
    close()
  }

  const handleNext = () => {
    console.log(selectedAnswer)
    if (selectedAnswer === quizData[counter].answer) {
      scoreRef.current = scoreRef.current + 1
    }
    console.log(scoreRef.current)

    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    setTimer(time)
    handleCounter()
  }

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev > 0) {
          return prev - 1
        } else {
          handleNext()
        }
      })
    }, 1000)

    return () => clearInterval(timerRef.current)
  }, [counter])

  if (showResult) {
    return (
      <section className="quiz-modal question">
        <h2 style={{ textAlign: 'center' }}>Congratulations</h2>
        <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>
          {' '}
          Total Score - {scoreRef.current}
        </h3>
        <button
          onClick={handleCancel}
          style={{ width: 'fit-content', margin: 'auto' }}
        >
          Close
        </button>
      </section>
    )
  }

  return (
    <section className="quiz-modal question">
      <header className="quiz-header">
        <h2>JS Trivia</h2>
        <span className="timer">Timer: {timer}</span>
      </header>
      <article className="quiz-main-container">
        <p>{quizData[counter].question}</p>
        <fieldset
          className="quiz-solution-container"
          style={{ border: 'none' }}
        >
          {quizData[counter].answers.map(answer => {
            const isCorrect = answer === selectedAnswer
            let style = ''
            if (isCorrect) {
              if (selectedAnswer === quizData[counter].answer) {
                style = 'correct'
              } else {
                style = 'wrong'
              }
            }
            return (
              <button
                className={`answer-button ${style}`}
                onClick={() => handleSolution(answer)}
                disabled={nextButtonShow}
              >
                {answer}
              </button>
            )
          })}
        </fieldset>
      </article>
      <nav className="quiz-button-container">
        <button
          onClick={handleNext}
          className={`next-button ${nextButtonShow ? 'show' : 'hide'}`}
        >
          {'<'} {counter === quizData.length - 1 ? 'Submit' : 'Next'}
          {'>'}
        </button>
        <button onClick={handleCancel}>
          {'<'}End{'>'}
        </button>
      </nav>
    </section>
  )
}

export default QuizMain
