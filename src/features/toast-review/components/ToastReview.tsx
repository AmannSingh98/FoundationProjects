import { useEffect, useRef, useState } from 'react'
import './ToastReview.css'
import Notification from './Notification'

export interface notificationItem {
  id: number
  message: string
}
const ToastReview = () => {
  const [notification, setNotification] = useState<notificationItem[]>([])
  const timerRef = useRef<Record<number, number>>({})

  const handleClick = (message: string) => {
    const id = new Date().getTime()
    message =
      message === 'yes' ? 'Thanks for the feedback' : 'Sorry, will work on it'
    setNotification(msg => {
      return [...msg, { id, message }]
    })

    timerRef.current[id] = setTimeout(() => {
      closeNotification(id)
    }, 3000)
  }

  const closeNotification = (id: number) => {
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

  return (
    <article className="toast-main">
      <form>
        <fieldset className="toast-container">
          <legend className="toast-heading">Do you like the website :)</legend>
          <button
            type="button"
            className="toast-button"
            onClick={() => handleClick('yes')}
          >
            Yes!
          </button>
          <button
            type="button"
            className="toast-button"
            onClick={() => handleClick('no')}
          >
            No!
          </button>
          <div className="notification-container">
            {notification.map(message => {
              console.log(message)
              return (
                <Notification
                  notification={message}
                  handleClose={closeNotification}
                />
              )
            })}
          </div>
        </fieldset>
      </form>
    </article>
  )
}

export default ToastReview
