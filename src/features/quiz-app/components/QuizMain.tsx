import './QuizStart.css'
import useModal from '../hooks/useModal'
import { useEffect, useMemo, useRef, useState } from 'react'

interface quizMainProps {
  closeModal: () => void
  time: string
}

const QuizMain = ({ closeModal, time }: quizMainProps) => {
  console.log('quiz game rendering ---')
  const numericTime = Number(time)
  const [timer, setTimer] = useState<number>(numericTime)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
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

  const answerbuttons = useMemo(() => {
    return quizData[counter].answers.map(answer => {
      console.log('quiz options rendering --- ')
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
    })
  }, [quizData, counter, nextButtonShow])

  const handleNext = () => {
    if (selectedAnswer === quizData[counter].answer) {
      scoreRef.current = scoreRef.current + 1
    }
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    setTimer(numericTime)
    handleCounter()
  }

  const handleInterval = () => {
    return setInterval(() => {
      setTimer(prev => {
        if (prev > 0) {
          return prev - 1
        }
        handleNext()
        return numericTime
      })
    }, 1000)
  }

  useEffect(() => {
    // timerRef.current = handleInterval()

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
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
          onClick={closeModal}
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
        <span className="timer" aria-live="polite">
          Timer: {timer}
        </span>
      </header>
      <article className="quiz-main-container">
        <p>{quizData[counter].question}</p>
        <fieldset
          className="quiz-solution-container"
          style={{ border: 'none' }}
        >
          <legend className="sr-only">Select any one of the answer</legend>
          {answerbuttons}
        </fieldset>
      </article>
      <nav className="quiz-button-container">
        <button onClick={handleNext} disabled={!nextButtonShow}>
          {'<'}
          {counter === quizData.length - 1 ? 'Submit' : 'Next'}
          {'>'}
        </button>
        <button onClick={closeModal}>
          {'<'}End{'>'}
        </button>
      </nav>
    </section>
  )
}

export default QuizMain
