import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function GallerySection() {
  const [gallery, setGallery] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/gallery.json')
      .then(res => res.json())
      .then(data => {
        // Show only first 6 images on homepage
        setGallery(data.gallery.slice(0, 6))
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading gallery:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <section id="gallery" className="gallery-section">
        <div className="section-tube-light" data-section="gallery"></div>
        <div className="section-dark-overlay" data-section="gallery"></div>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title" style={{color: 'white'}}>Gallery</h2>
            <div className="section-subtitle">Moments of Innovation</div>
          </div>
          <div className="content-loading">
            <div className="loading-spinner"></div>
            <span>Loading gallery...</span>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="gallery" className="gallery-section">
      <div className="section-tube-light" data-section="gallery"></div>
      <div className="section-dark-overlay" data-section="gallery"></div>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title" style={{color: 'white'}}>Gallery</h2>
          <div className="section-subtitle">Moments of Innovation</div>
        </div>
        
        <div className="gallery-grid">
          {gallery.map((item, index) => (
            <div
              key={index}
              className="gallery-item glass-container"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="gallery-image-wrapper">
                <img src={item.image} alt={item.title} className="gallery-image" />
                <div className="gallery-overlay">
                  <h4 className="gallery-title">{item.title}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="gallery-actions">
          <Link to="/gallery.html" className="view-more-btn">View More</Link>
        </div>
      </div>
    </section>
  )
}

export default GallerySection
