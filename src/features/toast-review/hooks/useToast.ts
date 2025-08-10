import { useState, useEffect, useRef } from 'react'

export interface notificationItem {
  id: number
  message: string
}

const useToast = () => {
  const timerRef = useRef<Record<number, number>>({})
  const [notification, setNotification] = useState<notificationItem[]>([])

  const handleYes = () => handleClick('yes')

  const handleNo = () => handleClick('no')

  const handleClick = (message: string) => {
    const id = new Date().getTime()
    message =
      message === 'yes' ? 'Thanks for the feedback' : 'Sorry, will work on it'
    setNotification(msg => {
      return [...msg, { id, message }]
    })

    timerRef.current[id] = setTimeout(() => {
      handleClose(id)
    }, 3000)
  }

  const handleClose = (id: number) => {
    console.log('close')
    if (timerRef.current[id]) {
      setNotification(prev => {
        return prev.filter(message => message.id !== id)
      })
    }
  }

  useEffect(() => {
    return () => {
      Object.values(timerRef.current).forEach(clearTimeout)
    }
  }, [])
  return { notification, handleYes, handleNo, handleClose }
}

export default useToast
