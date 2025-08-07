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
    message = message === 'yes' ? 'Thanks for the feedback' : 'Please, get lost'
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
          <legend className="toast-heading">Do you like the website ?</legend>
          <button
            type="button"
            className="toast-button"
            onClick={() => handleClick('yes')}
          >
            Yash
          </button>
          <button
            type="button"
            className="toast-button"
            onClick={() => handleClick('no')}
          >
            Nora
          </button>
          <div className="notification-container">
            {notification.map(message => {
              console.log(message)
              return (
                <div className="single-notification">
                  <Notification
                    notification={message}
                    handleClose={closeNotification}
                  />
                </div>
              )
            })}
          </div>
        </fieldset>
      </form>
    </article>
  )
}

export default ToastReview
