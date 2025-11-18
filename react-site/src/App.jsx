import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import EventsPage from './pages/EventsPage'
import GalleryPage from './pages/GalleryPage'
import TeamsPage from './pages/TeamsPage'
import AdminPanel from './pages/AdminPanel'
import SphereDemo from './pages/SphereDemo'

function App() {
  console.log('App component rendering')
  
  return (
    <Router>
      <div style={{ 
        position: 'relative', 
        zIndex: 1,
        minHeight: '100vh',
        width: '100%'
      }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events.html" element={<EventsPage />} />
          <Route path="/gallery.html" element={<GalleryPage />} />
          <Route path="/teams.html" element={<TeamsPage />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/sphere-demo" element={<SphereDemo />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
