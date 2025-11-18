# 3D Image Sphere Component - Setup Guide

## ✅ Setup Complete!

Your project now has:
- ✅ TypeScript configured
- ✅ Tailwind CSS installed
- ✅ Path aliases (@/*) configured
- ✅ Component structure ready (/components/ui)
- ✅ 3D Sphere component installed

## 📦 Installation Steps

Run these commands in your terminal:

```bash
cd "C:\Users\prajj\Downloads\asimo-web-main\asimo-web-main original\asimo-web-main\react-site"

# Install required dependencies
npm install lucide-react

# Install dev dependencies (if not done already)
npm install -D tailwindcss postcss autoprefixer

# Delete old vite.config.js (we created vite.config.ts)
Remove-Item vite.config.js -ErrorAction SilentlyContinue

# Start dev server
npm run dev
```

## 📁 Project Structure

```
react-site/
├── src/
│   ├── components/
│   │   └── ui/
│   │       └── img-sphere.tsx      ← Component installed ✅
│   ├── pages/
│   │   └── SphereDemo.tsx          ← Demo page ✅
│   └── index.css                    ← Updated with Tailwind ✅
├── tsconfig.json                    ← Created ✅
├── tsconfig.node.json               ← Created ✅
├── vite.config.ts                   ← Created ✅
├── tailwind.config.js               ← Created ✅
└── postcss.config.js                ← Created ✅
```

## 🚀 Usage

### Add Route to App

Update your `src/App.jsx` or `src/App.tsx`:

```tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SphereDemo from './pages/SphereDemo'
// ... other imports

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/sphere-demo" element={<SphereDemo />} />
        {/* ... other routes */}
      </Routes>
    </Router>
  )
}
```

### Access the Component

Visit: `http://localhost:5174/sphere-demo`

### Customize Configuration

Edit `src/pages/SphereDemo.tsx` and modify the `CONFIG` object:

```typescript
const CONFIG: SphereConfig = {
  containerSize: 600,          // Container size in pixels
  sphereRadius: 200,           // Virtual sphere radius
  dragSensitivity: 0.8,        // Mouse drag sensitivity (0.1 - 2.0)
  momentumDecay: 0.96,         // How fast momentum fades (0.8 - 0.99)
  maxRotationSpeed: 6,         // Maximum rotation speed (1 - 10)
  baseImageScale: 0.15,        // Base image size
  hoverScale: 1.3,             // Hover scale multiplier (1.0 - 2.0)
  perspective: 1000,           // CSS perspective value (500 - 2000)
  autoRotate: true,            // Enable/disable auto rotation
  autoRotateSpeed: 0.2         // Auto rotation speed (0.1 - 2.0)
};
```

## 🎨 Using Your Own Images

Replace the `BASE_IMAGES` array in `SphereDemo.tsx`:

```typescript
const BASE_IMAGES: Omit<ImageData, 'id'>[] = [
  {
    src: "./assets/images/gallery/image1.jpg",
    alt: "Your Image 1",
    title: "Image Title",
    description: "Image description"
  },
  // Add more images...
];
```

## 🔧 Why /components/ui?

The `/components/ui` folder is the standard location for:
- **Reusable UI components** that can be used across your app
- **shadcn/ui compatibility** if you add more shadcn components later
- **Clean architecture** separating UI components from page components
- **Easy imports** with path alias: `@/components/ui/img-sphere`

## 📝 Component Features

✨ **Interactive 3D Sphere**
- Drag to rotate with momentum physics
- Auto-rotation option
- Smooth animations

🎯 **Smart Image Distribution**
- Fibonacci sphere algorithm for even coverage
- Collision detection prevents overlaps
- Dynamic scaling based on position

📱 **Mobile Support**
- Touch gestures
- Responsive sizing
- Optimized performance

🖼️ **Modal View**
- Click any image to view full size
- Shows title and description
- Smooth animations

## 🐛 Troubleshooting

### TypeScript errors in existing .jsx files?
- Rename files from `.jsx` to `.tsx` as needed
- Or keep using `.jsx` for non-TypeScript components

### Tailwind classes not working?
- Ensure dev server is running: `npm run dev`
- Check that `index.css` has Tailwind directives at the top

### Import errors?
- Delete `node_modules` and run `npm install` again
- Ensure `vite.config.js` is deleted (use `.ts` version)

### Port 5174 already in use?
- Change port in `vite.config.ts`: `server: { port: 3000 }`

## 📚 Next Steps

1. Install dependencies: `npm install lucide-react`
2. Delete old config: `Remove-Item vite.config.js`
3. Start dev server: `npm run dev`
4. Add route to your App
5. Visit `/sphere-demo`
6. Customize to your needs!

## 🎉 You're All Set!

The component is ready to use. Check the demo page and customize it for your gallery!
