# 🚀 Quick Start Guide - 3D Image Sphere

## ✅ Status: READY TO USE

**Dev Server**: ✅ Running on http://localhost:5174  
**Component**: ✅ Installed at `src/components/ui/img-sphere.tsx`  
**Demo Page**: ✅ Available at http://localhost:5174/sphere-demo  

---

## 🎯 View the Demo NOW

Open your browser and visit:
```
http://localhost:5174/sphere-demo
```

You should see:
- 60 rotating images in a 3D sphere
- Drag to rotate
- Click images to view full size
- Auto-rotating sphere

---

## 🛠️ Quick Customization

### 1. Change Images
Edit `src/pages/SphereDemo.tsx`, line ~15:

```typescript
const BASE_IMAGES = [
  {
    src: "YOUR_IMAGE_URL_HERE",
    alt: "Description",
    title: "Title",
    description: "Description"
  },
  // Add more...
];
```

### 2. Change Size
Edit `CONFIG` object, line ~100:

```typescript
containerSize: 600,  // Make bigger: 800, smaller: 400
```

### 3. Change Rotation Speed
```typescript
autoRotateSpeed: 0.2,  // Faster: 0.5, slower: 0.1
```

### 4. Disable Auto-Rotation
```typescript
autoRotate: false,
```

---

## 🔗 Add to Your Site

### Quick Integration

**In HomePage.jsx or any page:**

```jsx
import SphereImageGrid from '@/components/ui/img-sphere'

// Inside your component
<div className="flex justify-center items-center p-6 min-h-screen">
  <SphereImageGrid
    images={yourImages}
    containerSize={600}
    autoRotate={true}
  />
</div>
```

---

## 📦 Files Created

✅ `src/components/ui/img-sphere.tsx` - Main component  
✅ `src/pages/SphereDemo.tsx` - Demo page  
✅ `tsconfig.json` - TypeScript config  
✅ `vite.config.ts` - Vite with path aliases  
✅ `tailwind.config.js` - Tailwind CSS config  
✅ `postcss.config.js` - PostCSS config  

---

## 💡 Pro Tips

1. **Use Your Gallery Images**:
   ```typescript
   fetch('/data/gallery.json')
     .then(res => res.json())
     .then(data => {
       const images = data.gallery.map((item, i) => ({
         id: `img-${i}`,
         src: item.image,
         alt: item.title
       }));
       // Use images in sphere
     });
   ```

2. **Adjust Sensitivity**:
   ```typescript
   dragSensitivity: 0.8,  // More responsive
   ```

3. **Change Image Count**:
   In `SphereDemo.tsx`, change the loop:
   ```typescript
   for (let i = 0; i < 30; i++) {  // 30 images instead of 60
   ```

---

## 🎨 All Configuration Options

```typescript
{
  containerSize: 600,        // Size in pixels
  sphereRadius: 200,         // Sphere size
  dragSensitivity: 0.8,      // How fast it rotates (0.1-2.0)
  momentumDecay: 0.96,       // How long it spins (0.8-0.99)
  maxRotationSpeed: 6,       // Top speed (1-10)
  baseImageScale: 0.15,      // Image size (0.05-0.3)
  hoverScale: 1.3,           // Hover zoom (1.0-2.0)
  perspective: 1000,         // 3D depth (500-2000)
  autoRotate: true,          // Spin by itself
  autoRotateSpeed: 0.2       // Spin speed (0.1-2.0)
}
```

---

## ❓ Need Help?

Check these files:
- `INTEGRATION_COMPLETE.md` - Full documentation
- `SPHERE_SETUP_GUIDE.md` - Setup details
- `src/pages/SphereDemo.tsx` - Example usage

---

## 🎉 That's It!

Visit **http://localhost:5174/sphere-demo** to see it in action!
