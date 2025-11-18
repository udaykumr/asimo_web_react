import { useEffect } from 'react'
import ThemeToggle from '../components/ThemeToggle'
import Navigation from '../components/Navigation'
import HeroSection from '../components/HeroSection'
import FeaturedSection from '../components/FeaturedSection'
import EventsSection from '../components/EventsSection'
import WorkshopsSection from '../components/WorkshopsSection'
import GallerySection from '../components/GallerySection'
import TeamsSection from '../components/TeamsSection'
import AboutSection from '../components/AboutSection'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'

function HomePage() {
  useEffect(() => {
    // Initialize AOS (Animate On Scroll)
    if (window.AOS) {
      window.AOS.init({
        duration: 1000,
        once: true,
        offset: 100
      })
    }

    // Tube light effect on scroll
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]')
      
      sections.forEach(section => {
        const tubeLight = section.querySelector('.section-tube-light')
        const darkOverlay = section.querySelector('.section-dark-overlay')
        
        if (!tubeLight || !darkOverlay) return
        
        const rect = section.getBoundingClientRect()
        const windowHeight = window.innerHeight
        
        // Check if section is in viewport - trigger earlier (at 70% from top)
        const isInView = rect.top < windowHeight * 0.7 && rect.bottom > 0
        
        if (isInView) {
          // Calculate progress based on how far into viewport the section is
          const progress = Math.min(1, Math.max(0, (windowHeight * 0.7 - rect.top) / (windowHeight * 0.3)))
          
          // Activate tube light with smooth progression
          tubeLight.style.opacity = progress
          tubeLight.style.width = `${20 + (progress * 60)}%` // 20% to 80%
          tubeLight.style.height = `${2 + (progress * 6)}px` // 2px to 8px
          
          // Fade out dark overlay
          darkOverlay.style.opacity = 1 - progress
        } else {
          // Deactivate tube light
          tubeLight.style.opacity = '0'
          tubeLight.style.width = '20%'
          tubeLight.style.height = '2px'
          
          // Show dark overlay
          darkOverlay.style.opacity = '1'
        }
      })
    }
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (window.AOS) {
        window.AOS.refresh()
      }
    }
  }, [])

  return (
    <>
      <ThemeToggle />
      <Navigation />
      <HeroSection />
      <FeaturedSection />
      <EventsSection />
      <WorkshopsSection />
      <GallerySection />
      <TeamsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </>
  )
}

export default HomePage
