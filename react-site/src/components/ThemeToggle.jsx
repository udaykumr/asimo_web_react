import { useEffect } from 'react'

function ThemeToggle() {
  useEffect(() => {
    // Initialize theme from localStorage
    const currentTheme = localStorage.getItem('theme') || 'dark'
    document.body.classList.add(`${currentTheme}-theme`)
  }, [])

  const toggleTheme = () => {
    const body = document.body
    const themeIcon = document.getElementById('theme-icon')
    const themeText = document.getElementById('theme-text')
    
    if (body.classList.contains('light-theme')) {
      body.classList.remove('light-theme')
      body.classList.add('dark-theme')
      themeIcon.classList.remove('fa-moon')
      themeIcon.classList.add('fa-sun')
      themeText.textContent = 'Light'
      localStorage.setItem('theme', 'dark')
    } else {
      body.classList.remove('dark-theme')
      body.classList.add('light-theme')
      themeIcon.classList.remove('fa-sun')
      themeIcon.classList.add('fa-moon')
      themeText.textContent = 'Dark'
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <div className="theme-toggle" onClick={toggleTheme}>
      <i className="fas fa-sun theme-toggle-icon" id="theme-icon"></i>
      <span id="theme-text">Light</span>
    </div>
  )
}

export default ThemeToggle
