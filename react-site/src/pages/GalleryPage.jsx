import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

function GalleryPage() {
  const [gallery, setGallery] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    // Initialize AOS
    if (window.AOS) {
      window.AOS.init({
        duration: 1000,
        once: true,
        offset: 100
      })
    }

    // Load all gallery images
    fetch('/data/gallery.json')
      .then(res => res.json())
      .then(data => {
        setGallery(data.gallery)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading gallery:', err)
        setLoading(false)
      })

    return () => {
      if (window.AOS) {
        window.AOS.refresh()
      }
    }
  }, [])

  const openLightbox = (item) => {
    setSelectedImage(item)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    document.body.style.overflow = ''
  }

  return (
    <>
      <ThemeToggle />
      <Navigation />
      
      <section className="gallery-extended-section">
        <div className="container">
          <div className="page-header">
            <Link to="/" className="back-btn">
              <i className="fas fa-arrow-left"></i> Back to Home
            </Link>
            <h1 className="page-title">Gallery</h1>
            <p className="page-subtitle">Moments of Innovation</p>
          </div>

          {loading ? (
            <div className="content-loading">
              <div className="loading-spinner"></div>
              <span>Loading gallery...</span>
            </div>
          ) : (
            <div className="gallery-extended-grid">
              {gallery.map((item, index) => (
                <div
                  key={index}
                  className="gallery-item-extended glass-container"
                  data-aos="fade-up"
                  data-aos-delay={index * 30}
                  onClick={() => openLightbox(item)}
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
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content">
            <button className="lightbox-close" onClick={closeLightbox}>
              <i className="fas fa-times"></i>
            </button>
            <img src={selectedImage.image} alt={selectedImage.title} />
            <div className="lightbox-caption">
              <h3>{selectedImage.title}</h3>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}

export default GalleryPage
