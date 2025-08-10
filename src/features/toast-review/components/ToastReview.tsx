import './ToastReview.css'
import Notification from './Notification'
import useToast from '../hooks/useToast'

const ToastReview = () => {
  const { notification, handleYes, handleNo, handleClose } = useToast()

  return (
    <article className="toast-main">
      <form>
        <fieldset className="toast-container">
          <legend className="toast-heading">Do you like the website :)</legend>
          <button type="button" className="toast-button" onClick={handleYes}>
            Yes!
          </button>
          <button type="button" className="toast-button" onClick={handleNo}>
            No!
          </button>
          <div className="notification-container">
            {notification.map(message => {
              console.log(message)
              return (
                <Notification
                  notification={message}
                  handleClose={handleClose}
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
