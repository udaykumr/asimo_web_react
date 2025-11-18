import { useEffect, useState, useMemo } from 'react'
import SphereImageGrid from '@/components/ui/img-sphere'

function TeamsSection() {
  const [batches, setBatches] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/members.json')
      .then(res => res.json())
      .then(data => {
        if (data && data.teamMembers && data.teamMembers.batches && Array.isArray(data.teamMembers.batches)) {
          setBatches(data.teamMembers.batches.sort((a, b) => parseInt(b.year) - parseInt(a.year)))
        } else {
          console.error('Invalid members data format')
          setBatches([])
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading members:', err)
        setBatches([])
        setLoading(false)
      })
  }, [])

  // Prepare all members for the sphere
  const allMembersForSphere = useMemo(() => {
    if (!batches || batches.length === 0) return []
    
    const members = []
    batches.forEach(batch => {
      if (batch.members && Array.isArray(batch.members)) {
        batch.members.forEach(member => {
          members.push({
            id: `${batch.year}-${member.id}`,
            src: member.photo,
            alt: `${member.name} - ${batch.name}`,
            title: member.name,
            description: batch.name
          })
        })
      }
    })
    return members
  }, [batches])

  if (loading) {
    return (
      <section id="teams" className="teams-section">
        <div className="section-tube-light" data-section="teams"></div>
        <div className="section-dark-overlay" data-section="teams"></div>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title" style={{color: 'white'}}>Our Team</h2>
            <div className="section-subtitle">Meet the Innovators</div>
          </div>
          <div className="content-loading">
            <div className="loading-spinner"></div>
            <span>Loading batches...</span>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="teams" className="teams-section">
      <div className="section-tube-light" data-section="teams"></div>
      <div className="section-dark-overlay" data-section="teams"></div>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title" style={{color: 'white'}}>Our Team</h2>
          <div className="section-subtitle">Meet the Innovators</div>
        </div>
        
        <div className="team-layout">
          {/* Batch Selection Cards */}
          <div className="batch-grid">
            {batches && batches.length > 0 ? batches.map((batch, index) => (
              <div
                key={batch.year}
                className="batch-card glass-container"
                data-aos="fade-up"
                data-aos-delay={index * 100}
                onClick={() => window.location.href = `/teams.html#batch-${batch.year}`}
                style={{ cursor: 'pointer' }}
              >
                <div className="batch-icon">
                  <i className={batch.icon || "fas fa-users"}></i>
                </div>
                <h3 className="batch-year">{batch.name}</h3>
                <div className="batch-arrow-btn">
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>
            )) : (
              <div className="no-content">No batch information available</div>
            )}
          </div>

          {/* 3D Sphere with All Team Members */}
          <div className="team-sphere-container glass-container" data-aos="fade-up" data-aos-delay="400">
            <div className="sphere-wrapper">
              <div className="sphere-title">
                <h3 style={{color: 'white', marginBottom: '5px', textAlign: 'center', fontSize: '1.6rem'}}>All Team Members</h3>
                <p style={{color: 'rgba(255,255,255,0.7)', textAlign: 'center', fontSize: '0.9rem', marginBottom: '15px'}}>
                  Drag to rotate • Click to view
                </p>
              </div>
              {allMembersForSphere.length > 0 ? (
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1}}>
                  <SphereImageGrid
                    images={allMembersForSphere}
                    containerSize={Math.min(750, window.innerWidth > 768 ? 750 : window.innerWidth > 480 ? 400 : 320)}
                    sphereRadius={Math.min(280, window.innerWidth > 768 ? 280 : window.innerWidth > 480 ? 160 : 130)}
                    dragSensitivity={0.7}
                    momentumDecay={0.96}
                    maxRotationSpeed={5}
                    baseImageScale={0.13}
                    hoverScale={1.3}
                    perspective={1000}
                    autoRotate={true}
                    autoRotateSpeed={0.15}
                    className="team-sphere"
                  />
                </div>
              ) : (
                <div style={{textAlign: 'center', padding: '40px', color: 'rgba(255,255,255,0.6)'}}>
                  No member photos available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TeamsSection
