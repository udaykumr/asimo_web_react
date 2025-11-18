import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

function EventsPage() {
  const [events, setEvents] = useState([])
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

    // Load all events
    fetch('/data/events.json')
      .then(res => res.json())
      .then(data => {
        setEvents(data.events)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading events:', err)
        setLoading(false)
      })

    return () => {
      if (window.AOS) {
        window.AOS.refresh()
      }
    }
  }, [])

  return (
    <>
      <ThemeToggle />
      <Navigation />
      
      <section className="events-extended-section">
        <div className="container">
          <div className="page-header">
            <Link to="/" className="back-btn">
              <i className="fas fa-arrow-left"></i> Back to Home
            </Link>
            <h1 className="page-title">All Events</h1>
            <p className="page-subtitle">Celebrating Innovation and Excellence</p>
          </div>

          {loading ? (
            <div className="content-loading">
              <div className="loading-spinner"></div>
              <span>Loading events...</span>
            </div>
          ) : (
            <div className="events-extended-grid">
              {events.map((event, index) => (
                <div
                  key={index}
                  className="event-card-extended glass-container"
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                >
                  {event.image && (
                    <div className="event-image-wrapper">
                      <img src={event.image} alt={event.title} className="event-image" />
                    </div>
                  )}
                  <div className="event-content">
                    <div className="event-date">
                      <i className="fas fa-calendar-alt"></i>
                      <span>{event.date}</span>
                    </div>
                    <h3 className="event-title">{event.title}</h3>
                    <p className="event-description">{event.description}</p>
                    <div className="event-footer">
                      <div className="event-stats">
                        {event.participants && (
                          <div className="stat">
                            <i className="fas fa-users"></i>
                            <span>{event.participants} Participants</span>
                          </div>
                        )}
                        {event.duration && (
                          <div className="stat">
                            <i className="fas fa-clock"></i>
                            <span>{event.duration}</span>
                          </div>
                        )}
                      </div>
                    </div>
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

export default EventsPage
