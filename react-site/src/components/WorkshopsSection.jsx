import { useEffect, useState } from 'react'

function WorkshopsSection() {
  const [workshops, setWorkshops] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedWorkshop, setSelectedWorkshop] = useState(null)

  useEffect(() => {
    fetch('/data/workshops.json')
      .then(res => res.json())
      .then(data => {
        setWorkshops(data.workshops)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading workshops:', err)
        setLoading(false)
      })
  }, [])

  const openModal = (workshop) => {
    setSelectedWorkshop(workshop)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setSelectedWorkshop(null)
    document.body.style.overflow = ''
  }

  if (loading) {
    return (
      <section id="workshops" className="workshops-section">
        <div className="section-tube-light" data-section="workshops"></div>
        <div className="section-dark-overlay" data-section="workshops"></div>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Workshops</h2>
            <div className="section-subtitle">Hands-on Learning Experience</div>
          </div>
          <div className="content-loading">
            <div className="loading-spinner"></div>
            <span>Loading workshops...</span>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section id="workshops" className="workshops-section">
        <div className="section-tube-light" data-section="workshops"></div>
        <div className="section-dark-overlay" data-section="workshops"></div>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Workshops</h2>
            <div className="section-subtitle">Hands-on Learning Experience</div>
          </div>
          
          <div className="workshops-grid workshops-container">
            {workshops.map((workshop, index) => (
              <div
                key={index}
                className="workshop-card glass-container"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <div className="workshop-icon">
                  <i className={workshop.icon}></i>
                </div>
                <h3 className="workshop-title">{workshop.title}</h3>
                <p className="workshop-description">{workshop.description}</p>
                <div className="workshop-meta">
                  {workshop.date && (
                    <div className="meta-item">
                      <i className="fas fa-calendar"></i>
                      <span>{workshop.date}</span>
                    </div>
                  )}
                  {workshop.duration && (
                    <div className="meta-item">
                      <i className="fas fa-clock"></i>
                      <span>{workshop.duration}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop Modal */}
      {selectedWorkshop && (
        <div id="workshopModal" className="workshop-modal" style={{ display: 'flex' }}>
          <div className="workshop-modal-overlay" onClick={closeModal}></div>
          <div className="workshop-modal-content glass-container">
            <div className="workshop-modal-header">
              <h4 id="workshopModalTitle">{selectedWorkshop.title}</h4>
              <button className="close-modal" onClick={closeModal}>&times;</button>
            </div>
            <div className="workshop-modal-body">
              <div className="workshop-modal-icon">
                <i id="workshopModalIcon" className={selectedWorkshop.icon}></i>
              </div>
              <p id="workshopModalDescription">{selectedWorkshop.description}</p>
              {selectedWorkshop.details && (
                <div className="workshop-details">
                  <p>{selectedWorkshop.details}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default WorkshopsSection
