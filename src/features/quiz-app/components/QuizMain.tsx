import './QuizStart.css'
import useModal from '../hooks/useModal'

const QuizMain = ({ close }) => {
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

  if (showResult) {
    return (
      <section className="quiz-modal question">
        <h2 style={{ textAlign: 'center' }}>Congrats on Completing the Quiz</h2>
        <button onClick={handleCancel} style={{ width: 'fit-content' }}>
          Close
        </button>
      </section>
    )
  }

  return (
    <section className="quiz-modal question">
      <h2 style={{ textAlign: 'center' }}>JS Trivia</h2>
      <article className="quiz-main-container">
        <p>{quizData[counter].question}</p>
        <fieldset
          className="quiz-solution-container"
          style={{ border: 'none' }}
        >
          {quizData[counter].answers.map(answer => {
            const isCorrect = answer.solution === selectedAnswer
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
                onClick={() => handleSolution(answer.solution)}
                disabled={nextButtonShow}
              >
                {answer.solution}
              </button>
            )
          })}
        </fieldset>
      </article>
      <nav className="quiz-button-container">
        <button
          onClick={handleCounter}
          className={`next-button ${nextButtonShow ? 'show' : 'hide'}`}
        >
          {'<'}Next{'>'}
        </button>
        <button onClick={handleCancel}>
          {'<'}End{'>'}
        </button>
      </nav>
    </section>
  )
}

export default QuizMain
