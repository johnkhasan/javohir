import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'
import { media } from '../../styles/breakpoints'

gsap.registerPlugin(ScrollTrigger)

const FooterEl = styled.footer`
  background: ${({ theme }) => theme.colors.navy};
  padding: ${({ theme }) => theme.spacing.section} ${({ theme }) => theme.spacing.container};
  padding-bottom: 3rem;
`

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const BigText = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2.5rem, 6vw, 7rem);
  font-weight: 900;
  color: ${({ theme }) => theme.colors.white};
  line-height: 1.05;
  letter-spacing: -0.02em;
  margin-bottom: 3rem;
  overflow: hidden;

  .char {
    display: inline-block;
    opacity: 0;
    transform: translateY(40px);
  }

  .space {
    display: inline-block;
    width: 0.3em;
  }
`

const SocialRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 4rem;
  flex-wrap: wrap;
`

const SocialBtn = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.3);
  color: ${({ theme }) => theme.colors.white};
  text-decoration: none;
  font-size: 1.25rem;
  transition: border-color 0.2s, background 0.2s, color 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.dark};
  }
`

const Copyright = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: rgba(255,255,255,0.4);
`

const socials = [
  { key: 'github', href: 'https://github.com/johnkhasan', icon: 'GH' },
  { key: 'linkedin', href: 'https://linkedin.com/in/javohirhasanov', icon: 'LI' },
  { key: 'email', href: 'mailto:javohirdevuz@gmail.com', icon: '✉' },
]

export default function Footer() {
  const { t } = useTranslation()
  const textRef = useRef(null)
  const tagline = t('footer.tagline')

  useEffect(() => {
    if (!textRef.current) return
    const chars = textRef.current.querySelectorAll('.char')
    const ctx = gsap.context(() => {
      gsap.to(chars, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.03,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    })
    return () => ctx.revert()
  }, [tagline])

  const renderChars = () =>
    tagline.split('').map((char, i) => {
      if (char === ' ') return <span key={i} className="space" aria-hidden="true" />
      return (
        <span key={i} className="char" aria-hidden="true">
          {char}
        </span>
      )
    })

  return (
    <FooterEl id="contact">
      <Inner>
        <BigText ref={textRef} aria-label={tagline}>
          {renderChars()}
        </BigText>

        <SocialRow>
          {socials.map((s) => (
            <SocialBtn
              key={s.key}
              href={s.href}
              target={s.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={t(`footer.socials.${s.key}`)}
            >
              {s.icon}
            </SocialBtn>
          ))}
        </SocialRow>

        <Copyright>
          © {new Date().getFullYear()} Javohir. {t('footer.copyright')}
        </Copyright>
      </Inner>
    </FooterEl>
  )
}
