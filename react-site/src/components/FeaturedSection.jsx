import { useEffect, useState } from 'react'

function FeaturedSection() {
  const [banners, setBanners] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load featured data
    fetch('/data/featured.json')
      .then(res => res.json())
      .then(data => {
        if (data && data.featuredBanners && Array.isArray(data.featuredBanners)) {
          setBanners(data.featuredBanners)
          setLoading(false)
        } else {
          console.error('Invalid featured data format')
          setBanners([])
          setLoading(false)
        }
      })
      .catch(err => {
        console.error('Error loading featured:', err)
        setBanners([])
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    // Start auto-rotation only when banners are loaded
    if (banners.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % banners.length)
      }, 5000)
      
      return () => clearInterval(interval)
    }
  }, [banners.length])

  const nextBanner = () => {
    if (banners.length > 0) {
      console.log('Next banner clicked, current:', currentIndex)
      setCurrentIndex((currentIndex + 1) % banners.length)
    }
  }

  const prevBanner = () => {
    if (banners.length > 0) {
      console.log('Prev banner clicked, current:', currentIndex)
      setCurrentIndex((currentIndex - 1 + banners.length) % banners.length)
    }
  }

  const goToBanner = (index) => {
    console.log('Go to banner:', index)
    setCurrentIndex(index)
  }

  if (loading) {
    return (
      <section id="featured" className="featured-section">
        <div className="section-tube-light" data-section="featured"></div>
        <div className="section-dark-overlay" data-section="featured"></div>
        <div className="container">
          <div className="section-title" data-aos="fade-up">
            <h2>Featured</h2>
            <p>Discover our latest highlights and exciting announcements</p>
          </div>
          <div className="content-loading">
            <div className="loading-spinner"></div>
            <span>Loading featured content...</span>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="featured" className="featured-section">
      <div className="section-tube-light" data-section="featured"></div>
      <div className="section-dark-overlay" data-section="featured"></div>
      <div className="container">
        <div className="section-title" data-aos="fade-up">
          <h2>Featured</h2>
          <p>Discover our latest highlights and exciting announcements</p>
        </div>
        
        <div className="featured-banners-wrapper" data-aos="fade-up" data-aos-delay="200">
          <div className="featured-banners-container" id="featured-banners-container">
            {banners && banners.length > 0 ? banners.map((banner, index) => (
              <div
                key={index}
                className={`featured-banner ${index === currentIndex ? 'active' : ''}`}
                style={{ display: index === currentIndex ? 'block' : 'none' }}
              >
                <div className="banner-content">
                  <div className="banner-image-wrapper">
                    <img src={banner.image} alt={banner.title} className="banner-image" />
                  </div>
                  <div className="banner-text">
                    <h3 className="banner-title">{banner.title}</h3>
                    <p className="banner-subtitle">{banner.subtitle}</p>
                    <p className="banner-description">{banner.description}</p>
                    {banner.buttonLink && (
                      <a href={banner.buttonLink} className="banner-link" target="_blank" rel="noopener noreferrer">
                        {banner.buttonText || 'Learn More'} <i className="fas fa-arrow-right"></i>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )) : (
              <div className="no-content">No featured content available</div>
            )}
          </div>
          
          {/* Navigation Controls */}
          <div className="banner-navigation">
            <div className="banner-nav-btn banner-nav-prev" onClick={prevBanner}>
              <i className="fas fa-chevron-left"></i>
            </div>
            <div className="banner-indicators" id="banner-indicators">
              {banners && banners.length > 0 && banners.map((_, index) => (
                <div
                  key={index}
                  className={`banner-indicator ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => goToBanner(index)}
                ></div>
              ))}
            </div>
            <div className="banner-nav-btn banner-nav-next" onClick={nextBanner}>
              <i className="fas fa-chevron-right"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedSection
