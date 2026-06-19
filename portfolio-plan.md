# Portfolio Website — Claude Code Instructions

> **Stack:** React 18 + Vite 5 + Styled-Components v6 + Framer Motion 11 + GSAP 3 + ScrollTrigger  
> **Deploy:** Vercel  
> **Ilhom:** justsun.io — retro-futuristik, synthwave + pop art uslubi

---

## 1. Loyiha yaratish va dependencies

```bash
npm create vite@latest portfolio -- --template react
cd portfolio
npm install
npm install styled-components framer-motion gsap @gsap/react
npm install react-router-dom react-helmet-async
npm install -D vite-plugin-sitemap
```

---

## 2. Fayl tuzilmasi

Quyidagi tuzilmani yarat:

```
src/
├── components/
│   ├── common/
│   │   ├── Button.jsx
│   │   ├── Tag.jsx
│   │   └── SectionTitle.jsx
│   ├── sections/
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Experience.jsx
│   │   ├── Projects.jsx
│   │   └── Footer.jsx
│   └── layout/
│       ├── Navbar.jsx
│       ├── ScrollProgress.jsx
│       └── SEOHead.jsx
├── hooks/
│   ├── useScrollAnimation.js
│   └── usePrefersReducedMotion.js
├── styles/
│   ├── GlobalStyles.js
│   ├── theme.js
│   └── breakpoints.js
├── data/
│   ├── projects.js
│   └── experience.js
├── assets/
│   ├── fonts/
│   └── icons/
├── App.jsx
└── main.jsx
```

---

## 3. Design tokens — `src/styles/theme.js`

```js
export const theme = {
  colors: {
    primary: '#FF2D78',       // hot pink — hero bg
    accent: '#FFE600',        // bright yellow — headings, experience section
    cyan: '#00D4C8',          // about section bg
    navy: '#0D0D1A',          // footer bg
    cream: '#FFF8F0',         // card bg
    dark: '#1A0A12',          // dark text on light bg
    white: '#FFFFFF',
  },
  fonts: {
    display: "'Clash Display', 'Space Grotesk', sans-serif",
    body: "'Space Grotesk', sans-serif",
  },
  fontSizes: {
    hero: 'clamp(4rem, 10vw, 12rem)',
    h2: 'clamp(2rem, 5vw, 5rem)',
    h3: 'clamp(1.25rem, 2.5vw, 2rem)',
    body: '1rem',
    small: '0.875rem',
  },
  spacing: {
    section: 'clamp(4rem, 10vh, 8rem)',
    container: 'clamp(1.5rem, 5vw, 6rem)',
  },
  radius: {
    card: '16px',
    pill: '100px',
    sm: '8px',
  },
  zIndex: {
    navbar: 100,
    modal: 200,
  }
}
```

---

## 4. Breakpoints — `src/styles/breakpoints.js`

```js
export const bp = {
  mobile: '375px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1440px',
}

// styled-components ichida ishlatish uchun
export const media = {
  mobile: `@media (max-width: ${bp.tablet})`,
  tablet: `@media (min-width: ${bp.tablet})`,
  desktop: `@media (min-width: ${bp.desktop})`,
  wide: `@media (min-width: ${bp.wide})`,
}
```

---

## 5. Global styles — `src/styles/GlobalStyles.js`

```js
import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.body};
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.dark};
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  /* Skip to main content — accessibility */
  .skip-link {
    position: absolute;
    top: -100%;
    left: 1rem;
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.dark};
    padding: 0.5rem 1rem;
    border-radius: 0 0 8px 8px;
    font-weight: 500;
    z-index: 999;
    transition: top 0.2s;
  }

  .skip-link:focus {
    top: 0;
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* Focus ring */
  :focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 3px;
  }

  img {
    max-width: 100%;
    display: block;
  }
`
```

---

## 6. Hooks

### `src/hooks/usePrefersReducedMotion.js`

```js
import { useState, useEffect } from 'react'

export function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReduced(mq.matches)
    const handler = (e) => setPrefersReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return prefersReduced
}
```

### `src/hooks/useScrollAnimation.js`

```js
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Timeline cards reveal uchun
export function useScrollReveal(selector, options = {}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        selector,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
            ...options,
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [selector])

  return containerRef
}
```

---

## 7. Data fayllar

### `src/data/experience.js`

```js
export const experiences = [
  {
    id: 1,
    year: '2024',
    company: 'Kompaniya nomi',
    role: 'Frontend Developer',
    description: 'Qisqa tavsif — nima qildingiz, qanday texnologiyalar.',
    tags: ['React', 'Vue.js', 'TypeScript'],
    color: '#FF2D78',
  },
  // yana qo'shing...
]
```

### `src/data/projects.js`

```js
export const projects = [
  {
    id: 1,
    title: 'Loyiha nomi',
    description: 'Loyiha haqida qisqa tavsif.',
    tags: ['React', 'Node.js'],
    link: 'https://github.com/...',
    liveLink: 'https://...',
    featured: true,
    color: '#FFE600',
  },
  // yana qo'shing...
]
```

---

## 8. App.jsx

```jsx
import { ThemeProvider } from 'styled-components'
import { HelmetProvider } from 'react-helmet-async'
import { theme } from './styles/theme'
import { GlobalStyles } from './styles/GlobalStyles'
import Navbar from './components/layout/Navbar'
import ScrollProgress from './components/layout/ScrollProgress'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Experience from './components/sections/Experience'
import Projects from './components/sections/Projects'
import Footer from './components/sections/Footer'

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <a href="#main" className="skip-link">Main contentga o'tish</a>
        <ScrollProgress />
        <Navbar />
        <main id="main">
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Footer />
        </main>
      </ThemeProvider>
    </HelmetProvider>
  )
}
```

---

## 9. Komponentlar — batafsil talablar

### `Navbar.jsx`
- Scroll pastga tushganida `background: rgba(0,0,0,0.3)` + `backdrop-filter: blur(10px)`
- Active section highlight — IntersectionObserver bilan
- Mobile: hamburger menu, full-screen overlay
- Links: `['About', 'Experience', 'Projects', 'Contact']`

### `ScrollProgress.jsx`
- Fixed top, `height: 3px`, `background: ${theme.colors.accent}`
- Width scroll foiziga qarab o'zgaradi

### `SEOHead.jsx` (React Helmet Async)
- Props: `title`, `description`, `image`
- Default: `"Your Name — Frontend Developer"`
- og:title, og:description, og:image, twitter:card
- `<link rel="canonical" />`

### `Hero.jsx`
- **Fon:** CSS perspective grid — `transform: perspective(800px) rotateX(30deg)`
- **FloatingIcon komponenti:** props — `icon` (SVG yoki emoji), `x`, `y`, `delay`
  - CSS `animation: float 4s ease-in-out infinite alternate`
  - `@keyframes float { 0% { transform: translateY(0) } 100% { transform: translateY(-20px) } }`
  - 5 ta icon: `{ }`, `</>`, `🚀`, `⚡`, `🐛`
- **Word swap:** Framer Motion `AnimatePresence` — so'zlar: `["creative", "passionate", "fast", "detail-oriented"]`
  - Har 2 soniyada almashinadi
  - `exit: { y: -40, opacity: 0 }`, `initial: { y: 40, opacity: 0 }`, `animate: { y: 0, opacity: 1 }`
- **Tipografiya:** `clamp(4rem, 10vw, 12rem)`, `font-weight: 900`, `color: ${theme.colors.accent}`
- **CTA button:** "View my work" — smooth scroll + hover lift effekt

### `About.jsx`
- **Fon:** `${theme.colors.cyan}`
- **Layout:** CSS Grid — `grid-template-columns: 1fr 1fr` (mobile: 1fr)
- **Chap:** Rasm yoki SVG illustration — `border-radius: 20px`, slight rotation
- **O'ng:** 2 ta "Notebook" karta
  - `transform: rotate(-2deg)` va `rotate(1.5deg)` — qiyshiq effekt
  - Framer Motion `whileHover: { rotate: 0, scale: 1.02 }`
  - Ichida: sana, ob-havo emoji, qisqa "diary" matn

### `Experience.jsx`
- **Fon:** `${theme.colors.accent}`
- **Layout:** vertikal timeline
  - O'rta chiziq: `position: absolute`, `width: 2px`, `background: ${theme.colors.dark}`
  - Chap: yil
  - O'ng: karta
- **Har bir karta:**
  - `background: white`, `border-radius: 16px`, `box-shadow: 6px 6px 0 ${theme.colors.primary}`
  - Company nomi rangli (har biri har xil rang — `experiences.js` dagi `color` field)
- **GSAP ScrollTrigger:** `useScrollReveal('.experience-card')` hook ishlatish
- Mobile: chiziq chap tomonda, kartalar to'liq keng

### `Projects.jsx`
- **Fon:** `${theme.colors.primary}`
- **Layout:** CSS Grid — `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))`
- **Har bir karta:**
  - `background: ${theme.colors.cream}`, `border-radius: 16px`
  - `transform: rotate(Xdeg)` — har biri biroz qiyshiq (random -2 dan +2 gacha)
  - Framer Motion `whileHover: { rotate: 0, y: -8, boxShadow: "..." }`
  - Ustida: kategoriya tegi (rangli pill)
  - Loyiha nomi (katta), tavsif (kichik), tag list, link ikonkalar
- **Tag filter:** `useState` bilan active tag, filtered projects ko'rsatish
- **GSAP:** cards stagger reveal on scroll

### `Footer.jsx`
- **Fon:** `${theme.colors.navy}`
- **Katta matn:** `"Let's build something bright."` — `color: white`, `clamp(2.5rem, 6vw, 7rem)`
- **GSAP text reveal:** harflar birma-bir paydo bo'ladi (SplitText yoki manual span split)
- **Social links:** aylana ikonkalar — GitHub, LinkedIn, Email
  - `border: 2px solid rgba(255,255,255,0.3)`, hover: `border-color: ${theme.colors.accent}`
- **Copyright:** pastda kichik, `color: rgba(255,255,255,0.4)`

---

## 10. Animatsiya qoidalari (muhim)

| Vaziyat | Kutubxona |
|---------|-----------|
| Komponent mount / unmount | Framer Motion |
| Hover, tap, drag | Framer Motion |
| Scroll-based reveal | GSAP ScrollTrigger |
| Parallax | GSAP ScrollTrigger |
| Text split animatsiya | GSAP |
| Page transition | Framer Motion |

> ⚠️ **Bitta elementga ikkala kutubxonadan animatsiya qo'ymang** — conflict chiqadi.

---

## 11. SEO checklist

- [ ] `react-helmet-async` — har sahifada title + meta description
- [ ] Semantic HTML: `<main>`, `<section>`, `<nav>`, `<article>`, `<h1>` faqat bir marta
- [ ] `sitemap.xml` — `vite-plugin-sitemap` bilan Vercel deploy da auto-generate
- [ ] `public/robots.txt`:
  ```
  User-agent: *
  Allow: /
  Sitemap: https://yourdomain.com/sitemap.xml
  ```
- [ ] `<link rel="canonical" href="https://yourdomain.com" />`
- [ ] Barcha `<img>` da `alt` attribute
- [ ] `loading="lazy"` — hero dan past barcha rasmlar
- [ ] Google Fonts `preconnect`:
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  ```

---

## 12. Accessibility checklist

- [ ] `usePrefersReducedMotion` hook — animatsiyalarni o'chiradi
- [ ] `.skip-link` — "Skip to main content" birinchi tab bosqanida ko'rinadi
- [ ] Barcha interaktiv elementlarda `focus-visible` ring
- [ ] Dekorativ ikonkalar: `aria-hidden="true"`
- [ ] Touch target minimum: `min-width: 44px; min-height: 44px`
- [ ] Color contrast: pink bg ustida dark matn — WCAG AA (4.5:1)
- [ ] Keyboard bilan to'liq navigatsiya testdan o'tish

---

## 13. Performance

- [ ] Lazy import sections: `const About = lazy(() => import('./components/sections/About'))`
- [ ] `Suspense` wrapper App.jsx da
- [ ] Rasm formatlari: WebP, `width` + `height` attribute (layout shift oldini olish)
- [ ] Font subsetting — faqat ishlatiladigan harflar
- [ ] Lighthouse target: Performance 90+, Accessibility 95+, SEO 100

---

## 14. vite.config.js

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://yourdomain.com',
    }),
  ],
})
```

---

## 15. Vercel deploy

```bash
npm run build
# dist/ papkasini Vercel ga ulash
# yoki: npx vercel --prod
```

`vercel.json` (SPA routing uchun):
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

---

## Yakuniy eslatma Claude Code uchun

- Har bir komponentni alohida fayl qilib yoz
- Styled-components — barcha style komponent ichida, global style yo'q (GlobalStyles bundan mustasno)
- `data/` papkasidagi ma'lumotlarni `.map()` bilan render qil — hard-coded matn bo'lmasin
- Framer va GSAP konfliktini oldini olish uchun yuqoridagi jadvalga qat'iy amal qil
- Mobile-first yoz — avval kichik ekran, keyin `${media.tablet}` bilan kengaytir
