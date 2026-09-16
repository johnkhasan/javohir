import { lazy, Suspense, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { HelmetProvider } from 'react-helmet-async'
import { AnimatePresence } from 'framer-motion'
import { ThemeContextProvider, useTheme } from './context/ThemeContext'
import { theme, darkTheme } from './styles/theme'
import { GlobalStyles } from './styles/GlobalStyles'
import Navbar from './components/layout/Navbar'
import ScrollProgress from './components/layout/ScrollProgress'
import SEOHead from './components/layout/SEOHead'
import Hero from './components/sections/Hero'
import CustomCursor from './components/common/CustomCursor'
import Preloader from './components/common/Preloader'

const About = lazy(() => import('./components/sections/About'))
const Skills = lazy(() => import('./components/sections/Skills'))
const Experience = lazy(() => import('./components/sections/Experience'))
const Projects = lazy(() => import('./components/sections/Projects'))
const Testimonials = lazy(() => import('./components/sections/Testimonials'))
const Contact = lazy(() => import('./components/sections/Contact'))
const Footer = lazy(() => import('./components/sections/Footer'))

function AppInner() {
  const { isDark } = useTheme()
  const [loaded, setLoaded] = useState(false)

  return (
    <ThemeProvider theme={isDark ? darkTheme : theme}>
      <GlobalStyles />
      <SEOHead />
      <CustomCursor />
      <AnimatePresence>
        {!loaded && <Preloader onComplete={() => setLoaded(true)} key="preloader" />}
      </AnimatePresence>
      <a href="#main" className="skip-link">Skip to main content</a>
      <ScrollProgress />
      <Navbar />
      <main id="main">
        <Hero />
        <Suspense fallback={null}>
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Testimonials />
          <Contact />
          <Footer />
        </Suspense>
      </main>
    </ThemeProvider>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <ThemeContextProvider>
        <AppInner />
      </ThemeContextProvider>
    </HelmetProvider>
  )
}
