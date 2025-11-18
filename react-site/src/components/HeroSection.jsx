function HeroSection() {
  const scrollToTimeline = () => {
    const eventsSection = document.querySelector('#events')
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section id="home" className="hero advanced-hero">
      {/* Club Logo in left corner */}
      <div className="hero-club-logo">
        <img 
          src="/assets/logos/club-logo.png" 
          alt="ASIMO Technical Club Logo - Government Engineering College Samastipur GEC GECS" 
          className="hero-logo-img"
        />
      </div>
      
      <div className="hero-background-advanced">
        <div className="cosmic-background"></div>
      </div>
      
      <div className="hero-content-advanced">
        <div className="glass-container hero-glass-advanced">
          <div className="hero-title-advanced">
            <div className="title-line-2">
              <span className="main-title gradient-text-advanced">ASIMO</span>
            </div>
            <div className="title-line-3">
              <span className="subtitle-title">THE TECHNICAL CLUB</span>
            </div>
            <div className="title-line-4">
              <span className="college-name-hero">Government Engineering College, Samastipur</span>
            </div>
          </div>
          <div className="hero-subtitle-advanced">
            <span className="subtitle-main">Advance step in MultiTech orientation</span>
            <span className="subtitle-secondary">Innovating Tomorrow, Today</span>
          </div>
          <div className="hero-buttons-advanced">
            <button className="btn-explore-timeline" onClick={scrollToTimeline}>
              <span className="btn-text">Explore Timeline</span>
              <div className="waterfill-effect"></div>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
