import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

function NotificationsPage() {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initialize AOS
    if (window.AOS) {
      window.AOS.init({
        duration: 1000,
        once: true,
        offset: 100
      })
    }

    // Load notifications
    fetch('/data/notifications.json')
      .then(res => res.json())
      .then(data => {
        setNotifications(data.notifications)
        setLoading(false)
        
        // Mark all as read
        localStorage.setItem('notificationsRead', 'true')
      })
      .catch(err => {
        console.error('Error loading notifications:', err)
        setLoading(false)
      })

    return () => {
      if (window.AOS) {
        window.AOS.refresh()
      }
    }
  }, [])

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'event':
        return 'fa-calendar-alt'
      case 'workshop':
        return 'fa-tools'
      case 'announcement':
        return 'fa-bullhorn'
      case 'achievement':
        return 'fa-trophy'
      default:
        return 'fa-bell'
    }
  }

  return (
    <>
      <ThemeToggle />
      <Navigation />
      
      <section className="notifications-page">
        <div className="container">
          <div className="page-header">
            <Link to="/" className="back-btn">
              <i className="fas fa-arrow-left"></i> Back to Home
            </Link>
            <h1 className="page-title">Notifications</h1>
            <p className="page-subtitle">Stay updated with latest announcements</p>
          </div>

          {loading ? (
            <div className="content-loading">
              <div className="loading-spinner"></div>
              <span>Loading notifications...</span>
            </div>
          ) : notifications.length === 0 ? (
            <div className="no-notifications glass-container">
              <i className="fas fa-bell-slash"></i>
              <h3>No Notifications</h3>
              <p>You're all caught up! Check back later for updates.</p>
            </div>
          ) : (
            <div className="notifications-list">
              {notifications.map((notification, index) => (
                <div
                  key={index}
                  className={`notification-item glass-container ${notification.read ? 'read' : 'unread'}`}
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                >
                  <div className="notification-icon">
                    <i className={`fas ${getNotificationIcon(notification.type)}`}></i>
                  </div>
                  <div className="notification-content">
                    <div className="notification-header">
                      <h3 className="notification-title">{notification.title}</h3>
                      <span className="notification-date">{notification.date}</span>
                    </div>
                    <p className="notification-message">{notification.message}</p>
                    {notification.link && (
                      <a href={notification.link} className="notification-link">
                        Learn More <i className="fas fa-arrow-right"></i>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}

export default NotificationsPage
