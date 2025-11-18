import { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import NotificationPopup from './NotificationPopup'

function Navigation() {
  const [notificationCount, setNotificationCount] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const handleNavClick = (e, section) => {
    e.preventDefault()
    
    // If we're not on home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/')
      // Wait for navigation then scroll
      setTimeout(() => {
        const target = document.querySelector(section)
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    } else {
      // Already on home page, just scroll
      const target = document.querySelector(section)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  useEffect(() => {
    // Load notification count
    fetch('/data/notifications.json')
      .then(res => res.json())
      .then(data => {
        const unreadCount = data.notifications.filter(n => !n.read).length
        setNotificationCount(unreadCount)
      })
      .catch(err => console.error('Error loading notifications:', err))
  }, [])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
    document.body.style.overflow = !mobileMenuOpen ? 'hidden' : ''
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
    document.body.style.overflow = ''
  }

  const handleMobileNavClick = (e, section) => {
    handleNavClick(e, section)
    closeMobileMenu()
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="desktop-nav">
        <div className="nav-container-desktop">
          <div className="nav-glass-inner">
            <div className="nav-menu-desktop">
              <div className="nav-item">
                <a href="#home" className="nav-link" onClick={(e) => handleNavClick(e, '#home')}>
                  <span>Home</span>
                </a>
              </div>
              <div className="nav-item">
                <a href="#about" className="nav-link" onClick={(e) => handleNavClick(e, '#about')}>
                  <span>About</span>
                </a>
              </div>
              <div className="nav-item">
                <a href="#featured" className="nav-link" onClick={(e) => handleNavClick(e, '#featured')}>
                  <span>Featured</span>
                </a>
              </div>
              <div className="nav-item">
                <a href="#events" className="nav-link" onClick={(e) => handleNavClick(e, '#events')}>
                  <span>Events</span>
                </a>
              </div>
              <div className="nav-item">
                <a href="#workshops" className="nav-link" onClick={(e) => handleNavClick(e, '#workshops')}>
                  <span>Workshops</span>
                </a>
              </div>
              <div className="nav-item">
                <a href="#gallery" className="nav-link" onClick={(e) => handleNavClick(e, '#gallery')}>
                  <span>Gallery</span>
                </a>
              </div>
              <div className="nav-item">
                <a href="#teams" className="nav-link" onClick={(e) => handleNavClick(e, '#teams')}>
                  <span>Teams</span>
                </a>
              </div>
              <div className="nav-item">
                <a href="#contact" className="nav-link" onClick={(e) => handleNavClick(e, '#contact')}>
                  <span>Contact</span>
                </a>
              </div>
              <div className="nav-item nav-notification">
                <button onClick={() => setShowNotifications(true)} className="nav-link notification-btn" id="desktop-notification-btn">
                  <i className="fas fa-bell"></i>
                  {notificationCount > 0 && (
                    <span className="notification-badge" id="desktop-notification-badge">{notificationCount}</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className={`mobile-nav-overlay ${mobileMenuOpen ? 'active' : ''}`} onClick={closeMobileMenu}></div>
      <nav className={`mobile-nav ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-nav-menu">
          <a href="#home" className="mobile-nav-link" onClick={(e) => handleMobileNavClick(e, '#home')}>
            <span>Home</span>
          </a>
          <button onClick={() => { setShowNotifications(true); closeMobileMenu(); }} className="mobile-nav-link notification-btn">
            <i className="fas fa-bell"></i>
            {notificationCount > 0 && (
              <span className="notification-badge">{notificationCount}</span>
            )}
          </button>
          <a href="#about" className="mobile-nav-link" onClick={(e) => handleMobileNavClick(e, '#about')}>
            <span>About</span>
          </a>
          <a href="#featured" className="mobile-nav-link" onClick={(e) => handleMobileNavClick(e, '#featured')}>
            <span>Featured</span>
          </a>
          <a href="#events" className="mobile-nav-link" onClick={(e) => handleMobileNavClick(e, '#events')}>
            <span>Events</span>
          </a>
          <a href="#workshops" className="mobile-nav-link" onClick={(e) => handleMobileNavClick(e, '#workshops')}>
            <span>Workshops</span>
          </a>
          <a href="#gallery" className="mobile-nav-link" onClick={(e) => handleMobileNavClick(e, '#gallery')}>
            <span>Gallery</span>
          </a>
          <a href="#teams" className="mobile-nav-link" onClick={(e) => handleMobileNavClick(e, '#teams')}>
            <span>Teams</span>
          </a>
          <a href="#contact" className="mobile-nav-link" onClick={(e) => handleMobileNavClick(e, '#contact')}>
            <span>Contact</span>
          </a>
        </div>
      </nav>

      {/* Mobile Hamburger Button */}
      <button className={`mobile-hamburger ${mobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      {/* Notification Popup */}
      <NotificationPopup 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />
    </>
  )
}

export default Navigation
