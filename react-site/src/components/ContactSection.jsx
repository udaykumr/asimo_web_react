function ContactSection() {
  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Form submission would be handled here')
  }

  return (
    <section id="contact" className="contact-section">
      <div className="section-tube-light" data-section="contact"></div>
      <div className="section-dark-overlay" data-section="contact"></div>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title" style={{color: 'white'}}>Get In Touch</h2>
          <div className="section-subtitle">Connect with us</div>
        </div>
        
        <div className="contact-content">
          <div className="contact-info glass-container" data-aos="fade-right">
            <h3>Contact Information</h3>
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <strong>Address</strong>
                <p>Sarairanjan, Narghoghi<br/>Vidyapati - Kakarghatti - Sarairanjan Rd<br/>Samastipur, Bihar 848127</p>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <div>
                <strong>Email</strong>
                <p>asimo@gecsamastipur@gmail.com</p>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <div>
                <strong>Phone</strong>
                <p>+91 XXXXX XXXXX</p>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-share-alt"></i>
              <div>
                <strong>Follow Us</strong>
                <div className="contact-social-links">
                  <a href="https://www.instagram.com/asimo_gecsamastipur?utm_source=ig_web_button_share_sheet&igsh=MXZ1MjBmM2pucjh1cQ==" target="_blank" rel="noopener noreferrer" title="Instagram">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="https://www.linkedin.com/company/asimo-gecsamastipur/posts/?feedView=all" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a href="https://x.com/asimo_gecsmp" target="_blank" rel="noopener noreferrer" title="X (Twitter)">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="https://whatsapp.com/channel/0029VaTvSK3545v2dqAzyw0c" target="_blank" rel="noopener noreferrer" title="WhatsApp Channel">
                    <i className="fab fa-whatsapp"></i>
                  </a>
                  <a href="https://www.facebook.com/asimo.gecsamastipur" target="_blank" rel="noopener noreferrer" title="Facebook">
                    <i className="fab fa-facebook"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-map glass-container" data-aos="fade-left">
            <div className="map-wrapper">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3592.4523467234567!2d85.72897!3d25.727728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjXCsDQzJzM5LjgiTiA4NcKwNDMnNTIuMiJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '15px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Government Engineering College Samastipur Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
