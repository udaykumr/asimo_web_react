import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function EventsSection() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load events data
    fetch('/data/events.json')
      .then(res => res.json())
      .then(data => {
        // Show only first 3 events on homepage
        setEvents(data.events.slice(0, 3))
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading events:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <section id="events" className="events-section">
        <div className="section-tube-light" data-section="events"></div>
        <div className="section-dark-overlay" data-section="events"></div>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title" style={{color: 'white'}}>Events</h2>
            <div className="section-subtitle">Celebrating Innovation and Excellence</div>
          </div>
          <div className="content-loading">
            <div className="loading-spinner"></div>
            <span>Loading events...</span>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="events" className="events-section">
      <div className="section-tube-light" data-section="events"></div>
      <div className="section-dark-overlay" data-section="events"></div>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title" style={{color: 'white'}}>Events</h2>
          <div className="section-subtitle">Celebrating Innovation and Excellence</div>
        </div>
        
        <div className="events-timeline">
          <div className="timeline-line"></div>
          
          {events.map((event, index) => (
            <div
              key={index}
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
              data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
              data-aos-delay={index * 100}
            >
              <div className="timeline-content glass-container">
                <div className="timeline-date">
                  <i className="fas fa-calendar-alt"></i>
                  <span>{event.date}</span>
                </div>
                <h3 className="event-title">{event.title}</h3>
                <p className="event-description">{event.description}</p>
                {event.image && (
                  <div className="event-image-wrapper">
                    <img src={event.image} alt={event.title} className="event-image" />
                  </div>
                )}
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
        
        <div className="events-actions">
          <Link to="/events.html" className="view-more-btn">View All Events</Link>
        </div>
      </div>
    </section>
  )
}

export default EventsSection
