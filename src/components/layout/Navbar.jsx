import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { media } from '../../styles/breakpoints'

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.navbar};
  padding: 1.25rem ${({ theme }) => theme.spacing.container};
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background 0.3s, backdrop-filter 0.3s;
  background: ${({ $scrolled }) =>
    $scrolled ? 'rgba(0,0,0,0.3)' : 'transparent'};
  backdrop-filter: ${({ $scrolled }) => ($scrolled ? 'blur(10px)' : 'none')};
`

const Logo = styled.a`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.5rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.accent};
  text-decoration: none;
  letter-spacing: -0.02em;
`

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`

const Links = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  ${media.mobile} {
    display: none;
  }
`

const NavLink = styled.a`
  font-weight: 600;
  color: ${({ $active, theme }) => ($active ? theme.colors.accent : theme.colors.white)};
  text-decoration: none;
  font-size: 0.95rem;
  letter-spacing: 0.02em;
  transition: color 0.2s;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.accent};
    transform: scaleX(${({ $active }) => ($active ? 1 : 0)});
    transition: transform 0.2s;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    &::after { transform: scaleX(1); }
  }
`

const LangToggle = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: rgba(255,255,255,0.12);
  border: 1.5px solid rgba(255,255,255,0.25);
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.3rem 0.75rem;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.colors.white};
  transition: background 0.2s, border-color 0.2s, color 0.2s;
  min-height: 36px;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.dark};
  }
`

const Hamburger = styled.button`
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  min-width: 44px;
  min-height: 44px;
  align-items: center;
  justify-content: center;

  ${media.mobile} {
    display: flex;
  }

  span {
    display: block;
    width: 24px;
    height: 2px;
    background: ${({ theme }) => theme.colors.white};
    transition: transform 0.3s, opacity 0.3s;
  }

  ${({ $open }) =>
    $open &&
    `
    span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    span:nth-child(2) { opacity: 0; }
    span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
  `}
`

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.navy};
  z-index: ${({ theme }) => theme.zIndex.navbar - 1};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
`

const OverlayLink = styled(motion.a)`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2rem, 8vw, 3.5rem);
  font-weight: 900;
  color: ${({ theme }) => theme.colors.white};
  text-decoration: none;
  letter-spacing: -0.02em;
  transition: color 0.2s;

  &:hover { color: ${({ theme }) => theme.colors.accent}; }
`

const OverlayLang = styled(motion.button)`
  background: rgba(255,255,255,0.1);
  border: 2px solid rgba(255,255,255,0.3);
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.5rem 1.5rem;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  letter-spacing: 0.05em;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.dark};
    border-color: ${({ theme }) => theme.colors.accent};
  }
`

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  const navKeys = ['about', 'experience', 'projects', 'contact']

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = navKeys.map((key) => document.getElementById(key))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.4 }
    )
    sections.forEach((s) => s && observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const handleNavClick = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'uz' : 'en')
  }

  const langLabel = i18n.language === 'en' ? "O'Z" : 'EN'

  return (
    <>
      <Nav $scrolled={scrolled} role="navigation" aria-label="Main navigation">
        <Logo href="/" aria-label="Home">JS.</Logo>

        <Right>
          <Links>
            {navKeys.map((key) => (
              <NavLink
                key={key}
                href={`#${key}`}
                $active={activeSection === key}
                onClick={(e) => { e.preventDefault(); handleNavClick(key) }}
              >
                {t(`nav.${key}`)}
              </NavLink>
            ))}
          </Links>

          <LangToggle onClick={toggleLang} aria-label="Toggle language">
            {langLabel}
          </LangToggle>

          <Hamburger
            $open={open}
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </Hamburger>
        </Right>
      </Nav>

      <AnimatePresence>
        {open && (
          <Overlay
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {navKeys.map((key, i) => (
              <OverlayLink
                key={key}
                href={`#${key}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={(e) => { e.preventDefault(); handleNavClick(key) }}
              >
                {t(`nav.${key}`)}
              </OverlayLink>
            ))}
            <OverlayLang
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navKeys.length * 0.08 }}
              onClick={toggleLang}
            >
              {langLabel}
            </OverlayLang>
          </Overlay>
        )}
      </AnimatePresence>
    </>
  )
}
