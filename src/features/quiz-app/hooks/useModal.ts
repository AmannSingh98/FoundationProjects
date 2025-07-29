import { useState } from 'react'
import { data } from '../data/data'

const useModal = () => {
  const [quizData, setQuizData] = useState(data)
  const [counter, setCounter] = useState(0)
  const [nextButtonShow, setNextButtonShow] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)

  const handleCounter = () => {
    if (counter < quizData.length - 1) {
      setCounter(prevCounter => prevCounter + 1)
      setNextButtonShow(false)
      setSelectedAnswer('')
      return
    }
    setShowResult(true)
  }

  const handleSolution = answer => {
    setNextButtonShow(true)
    setSelectedAnswer(answer)
  }

  return {
    quizData,
    counter,
    handleCounter,
    handleSolution,
    nextButtonShow,
    selectedAnswer,
    showResult
  }
}

export default useModal
