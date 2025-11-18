import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>GEC Tech Club</h3>
            <p>Innovating Tomorrow, Today</p>
            <div className="social-links">
              <a href="https://www.instagram.com/asimo_gecsamastipur?utm_source=ig_web_button_share_sheet&igsh=MXZ1MjBmM2pucjh1cQ==" target="_blank" rel="noopener noreferrer" title="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://x.com/asimo_gecsmp" target="_blank" rel="noopener noreferrer" title="X (Twitter)">
                <i className="fab fa-x-twitter"></i>
              </a>
              <a href="https://www.linkedin.com/company/asimo-gecsamastipur/posts/?feedView=all" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#events">Events</a></li>
              <li><a href="#workshops">Workshops</a></li>
              <li><a href="#gallery">Gallery</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>GEC Samastipur</p>
            <p>Bihar, India</p>
            <p>https://www.asimogecs.com/</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>@asimo.All right reserve</p>
          <Link to="/admin" className="admin-link">
            <i className="fas fa-lock"></i> Admin Panel
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
