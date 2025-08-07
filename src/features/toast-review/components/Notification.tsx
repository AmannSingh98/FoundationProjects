import type { notificationItem } from './ToastReview'

interface notificationProps {
  notification: notificationItem
  handleClose: (id: number) => void
}

const Notification = ({ notification, handleClose }: notificationProps) => {
  const { id, message } = notification
  return (
    <>
      <span className="notification-message">{message}</span>
      <button
        className="close-button"
        type="button"
        onClick={() => handleClose(id)}
      >
        X
      </button>
    </>
  )
}

export default Notification
