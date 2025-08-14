import type { notificationItem } from '../hooks/useToast'
import React from 'react'

interface notificationProps {
  notification: notificationItem
  handleClose: (id: number) => void
}

const Notification = React.memo(
  ({ notification, handleClose }: notificationProps) => {
    const { id, message } = notification
    return (
      <div className="single-notification">
        <span className="notification-message">{message}</span>
        <button
          className="close-button"
          type="button"
          onClick={() => handleClose(id)}
        >
          X
        </button>
      </div>
    )
  }
)

export default Notification
