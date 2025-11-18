# ASIMO Technical Club - React Migration

This is the React version of the ASIMO Technical Club website, migrated from vanilla HTML/CSS/JavaScript while preserving all functionality, effects, and styling.

## 🚀 Features Preserved

- ✅ All visual effects and animations (AOS, glassmorphism, gradients)
- ✅ Theme toggle (light/dark mode)
- ✅ Responsive navigation (desktop + mobile hamburger menu)
- ✅ All sections: Hero, Featured, Events, Workshops, Gallery, Teams, About, Contact
- ✅ Dedicated pages: Events, Gallery, Teams, Notifications
- ✅ Smooth scroll navigation
- ✅ All original CSS styling
- ✅ All color schemes and design elements
- ✅ Notification system with badges
- ✅ Modal windows for workshops
- ✅ Image lightbox for gallery
- ✅ Batch-based team filtering

## 📁 Project Structure

```
react-site/
├── public/
│   ├── assets/        # Images, logos, team photos
│   ├── css/           # All original CSS files
│   └── data/          # JSON data files
├── src/
│   ├── components/    # Reusable React components
│   │   ├── ThemeToggle.jsx
│   │   ├── Navigation.jsx
│   │   ├── HeroSection.jsx
│   │   ├── FeaturedSection.jsx
│   │   ├── EventsSection.jsx
│   │   ├── WorkshopsSection.jsx
│   │   ├── GallerySection.jsx
│   │   ├── TeamsSection.jsx
│   │   ├── AboutSection.jsx
│   │   ├── ContactSection.jsx
│   │   └── Footer.jsx
│   ├── pages/         # Page components
│   │   ├── HomePage.jsx
│   │   ├── EventsPage.jsx
│   │   ├── GalleryPage.jsx
│   │   ├── TeamsPage.jsx
│   │   └── NotificationsPage.jsx
│   ├── App.jsx        # Main app with routing
│   ├── main.jsx       # React entry point
│   └── index.css      # CSS imports
├── index.html
├── package.json
└── vite.config.js
```

## 🛠️ Tech Stack

- **React 18** - UI library
- **React Router DOM** - Client-side routing
- **Vite** - Build tool and dev server
- **AOS (Animate On Scroll)** - Scroll animations
- **Font Awesome** - Icons
- **Original CSS** - All styling preserved from original site

## 📦 Installation

1. Navigate to the react-site directory:
```bash
cd react-site
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open http://localhost:5174 in your browser

## 🔧 Build for Production

```bash
npm run build
```

The production build will be created in the `dist/` folder.

## 🎨 Customization

### Updating Content

All content is stored in JSON files in `public/data/`:
- `featured.json` - Featured banners
- `events.json` - Events timeline
- `workshops.json` - Workshop cards
- `gallery.json` - Gallery images
- `members.json` - Team members
- `notifications.json` - Notification items
- `about.json` - About section content

### Styling

Original CSS files are in `public/css/`:
- `style.css` - Main styles
- `components.css` - Component styles
- `responsive.css` - Responsive breakpoints
- `advanced-graphics.css` - Hero and advanced effects
- `theme-system.css` - Theme toggle styles
- `featured-section.css` - Featured slider
- And more...

## 🌐 Routing

- `/` - Home page
- `/events.html` - All events page
- `/gallery.html` - Full gallery page
- `/teams.html` - Team members page
- `/notifications.html` - Notifications page

## ✨ Key Differences from Original

1. **Component-based Architecture**: Each section is now a reusable React component
2. **React Router**: Client-side routing instead of separate HTML files
3. **State Management**: React hooks for dynamic content loading
4. **Preserved Functionality**: All original features work identically

## 🔍 Features

### Navigation
- Desktop glassmorphism navigation
- Mobile hamburger menu
- Smooth scroll to sections
- Notification badges

### Sections
- **Hero**: Animated hero section with call-to-action
- **Featured**: Auto-rotating banner carousel
- **Events**: Timeline view with AOS animations
- **Workshops**: Grid layout with modal details
- **Gallery**: Image grid with lightbox
- **Teams**: Batch-based member filtering
- **About**: Rich content with highlights
- **Contact**: Contact form and social links

### Theme System
- Light/Dark theme toggle
- Persistent theme selection (localStorage)
- Smooth theme transitions

## 📱 Responsive Design

Fully responsive across all devices:
- Desktop (1920px+)
- Laptop (1366px - 1920px)
- Tablet (768px - 1366px)
- Mobile (< 768px)

## 🎯 Performance

- Fast initial load with Vite
- Code splitting by route
- Optimized animations
- Lazy loading of images

## 🤝 Contributing

This is a faithful migration of the original website. Any changes should maintain the original design and functionality.

## 📄 License

Same as the original ASIMO website.

---

**Original Website**: HTML/CSS/JavaScript
**React Migration**: Completed with all features preserved
**Dev Server**: http://localhost:5174
**Build Tool**: Vite
