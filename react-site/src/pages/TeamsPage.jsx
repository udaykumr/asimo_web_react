import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

function TeamsPage() {
  const [batches, setBatches] = useState([])
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    // Initialize AOS
    if (window.AOS) {
      window.AOS.init({
        duration: 1000,
        once: true,
        offset: 100
      })
    }

    // Load members data
    fetch('/data/members.json')
      .then(res => res.json())
      .then(data => {
        if (data && data.teamMembers && data.teamMembers.batches) {
          setBatches(data.teamMembers.batches.sort((a, b) => parseInt(b.year) - parseInt(a.year)))
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading members:', err)
        setLoading(false)
      })

    return () => {
      if (window.AOS) {
        window.AOS.refresh()
      }
    }
  }, [])

  useEffect(() => {
    // Scroll to batch if hash is present
    if (location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 300)
    }
  }, [location.hash, loading])

  return (
    <>
      <ThemeToggle />
      <Navigation />
      
      <section className="teams-extended-section">
        <div className="container">
          <div className="page-header">
            <Link to="/" className="back-btn">
              <i className="fas fa-arrow-left"></i> Back to Home
            </Link>
            <h1 className="page-title">Our Team</h1>
            <p className="page-subtitle">Meet the Innovators</p>
          </div>

          {loading ? (
            <div className="content-loading">
              <div className="loading-spinner"></div>
              <span>Loading team members...</span>
            </div>
          ) : (
            <div className="batches-container">
              {batches.map((batch) => (
                <div 
                  key={batch.year} 
                  id={`batch-${batch.year}`}
                  className="batch-section"
                  data-aos="fade-up"
                >
                  <div className="batch-header">
                    <div className="batch-icon-large">
                      <i className={batch.icon || 'fas fa-users'}></i>
                    </div>
                    <h2 className="batch-title">{batch.name}</h2>
                  </div>

                  <div className="members-grid">
                    {batch.members && batch.members.map((member) => (
                      <div 
                        key={member.id}
                        className="member-card"
                        data-aos="zoom-in"
                      >
                        <div className="member-photo-frame">
                          <img 
                            src={member.photo} 
                            alt={member.name}
                            className="member-photo"
                            onError={(e) => {
                              e.target.src = '/assets/images/members/default-avatar.png'
                            }}
                          />
                        </div>
                        <h3 className="member-name">{member.name}</h3>
                      </div>
                    ))}
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

export default TeamsPage
