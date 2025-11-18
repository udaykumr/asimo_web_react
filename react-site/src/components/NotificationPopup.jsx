import { useState, useEffect, useRef } from 'react'

function NotificationPopup({ isOpen, onClose }) {
  const [notifications, setNotifications] = useState([])
  const popupRef = useRef(null)

  useEffect(() => {
    // Load notifications data
    fetch('/data/notifications.json')
      .then(res => res.json())
      .then(data => {
        if (data && data.notifications) {
          setNotifications(data.notifications)
        }
      })
      .catch(err => console.error('Error loading notifications:', err))
  }, [])

  useEffect(() => {
    // Handle click outside to close
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      // Prevent body scroll when popup is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="notification-overlay">
      <div className="notification-popup" ref={popupRef}>
        <div className="notification-header">
          <h2>
            <i className="fas fa-bell"></i> Notifications
          </h2>
          <button className="close-btn" onClick={onClose} aria-label="Close notifications">
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="notification-content">
          {notifications.length > 0 ? (
            <div className="notifications-list">
              {notifications.map((notification, index) => (
                <div 
                  key={index} 
                  className={`notification-item ${notification.type || 'info'}`}
                >
                  <div className="notification-icon">
                    <i className={notification.icon || 'fas fa-info-circle'}></i>
                  </div>
                  <div className="notification-body">
                    <h3>{notification.title}</h3>
                    <p dangerouslySetInnerHTML={{ __html: notification.message }}></p>
                    {notification.timestamp && (
                      <span className="notification-date">
                        <i className="fas fa-clock"></i> {new Date(notification.timestamp).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-notifications">
              <i className="fas fa-bell-slash"></i>
              <p>No notifications at the moment</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function getIconForType(type) {
  switch (type) {
    case 'event':
      return 'fa-calendar-alt'
    case 'workshop':
      return 'fa-chalkboard-teacher'
    case 'achievement':
      return 'fa-trophy'
    case 'announcement':
      return 'fa-bullhorn'
    case 'warning':
      return 'fa-exclamation-triangle'
    case 'success':
      return 'fa-check-circle'
    default:
      return 'fa-info-circle'
  }
}

export default NotificationPopup
