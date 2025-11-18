import { useEffect, useState } from 'react'
import { AnimatedTestimonials } from './ui/animated-testimonials'

function AboutSection() {
  const [about, setAbout] = useState(null)
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/data/about.json').then(res => res.json()),
      fetch('/data/testimonials.json').then(res => res.json())
    ])
      .then(([aboutData, testimonialsData]) => {
        setAbout(aboutData)
        setTestimonials(testimonialsData)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading data:', err)
        setLoading(false)
      })
  }, [])

  if (loading || !about) {
    return (
      <section id="about" className="about-section">
        <div className="section-tube-light" data-section="about"></div>
        <div className="section-dark-overlay" data-section="about"></div>
        <div className="container">
          <div className="section-title" data-aos="fade-up">
            <h2>About ASIMO Technical Club</h2>
            <div className="title-divider"></div>
          </div>
          <div className="content-loading">
            <div className="loading-spinner"></div>
            <span>Loading about content...</span>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="about" className="about-section">
      <div className="section-tube-light" data-section="about"></div>
      <div className="section-dark-overlay" data-section="about"></div>
      <div className="container">
        <div className="section-title" data-aos="fade-up">
          <h2 id="about-title">{about.sectionTitle}</h2>
          <div className="title-divider"></div>
          <p className="section-subtitle-text">{about.sectionSubtitle}</p>
        </div>
        <div className="about-content-new" data-aos="fade-up" data-aos-delay="200">
          <div className="about-text-section">
            <div 
              className="about-description-new"
              dangerouslySetInnerHTML={{ __html: 
                about.description.paragraph1 + '<br/><br/>' + 
                about.description.paragraph2 + '<br/><br/>' + 
                about.description.paragraph3 
              }}
            />
            <div className="about-highlights" id="about-highlights">
              {about.highlights && about.highlights.map((highlight, index) => (
                <div key={index} className="highlight-item">
                  <i className={highlight.icon}></i>
                  <span dangerouslySetInnerHTML={{ __html: highlight.text }}></span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="testimonials-section">
            <AnimatedTestimonials testimonials={testimonials} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
