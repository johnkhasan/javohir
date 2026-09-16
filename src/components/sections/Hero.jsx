import { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { media } from '../../styles/breakpoints'
import Button from '../common/Button'

const float = keyframes`
  0% { transform: translateY(0) rotate(var(--rot, 0deg)); }
  100% { transform: translateY(-20px) rotate(var(--rot, 0deg)); }
`

const Section = styled.section`
  position: relative;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing.section} ${({ theme }) => theme.spacing.container};
`

const Grid = styled.div`
  position: absolute;
  inset: 0;
  transform: perspective(800px) rotateX(30deg) scale(1.2);
  transform-origin: center bottom;
  background-image:
    linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
`

const Content = styled.div`
  position: relative;
  z-index: 2;
  max-width: 900px;
`

const Eyebrow = styled.p`
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.7);
  margin-bottom: 1rem;
`

const Headline = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.hero};
  font-weight: 900;
  color: ${({ theme }) => theme.colors.accent};
  line-height: 0.95;
  letter-spacing: -0.03em;
  margin-bottom: 1.5rem;
`

const WordRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`

const StaticWord = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.hero};
  font-weight: 900;
  color: ${({ theme }) => theme.colors.white};
  line-height: 0.95;
  letter-spacing: -0.03em;
`

const SwapWrapper = styled.div`
  position: relative;
  overflow: hidden;
  height: 1em;
  display: inline-flex;
  align-items: center;
`

const Sub = styled.p`
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: rgba(255,255,255,0.8);
  max-width: 500px;
  line-height: 1.6;
  margin-bottom: 2.5rem;
  margin-top: 1.5rem;
`

const FloatingIcon = styled.div`
  position: absolute;
  font-size: ${({ $size }) => $size || '2rem'};
  left: ${({ $x }) => $x};
  top: ${({ $y }) => $y};
  animation: ${float} 4s ease-in-out infinite alternate;
  animation-delay: ${({ $delay }) => $delay || '0s'};
  --rot: ${({ $rot }) => $rot || '0deg'};
  pointer-events: none;
  user-select: none;
  opacity: 0.85;
  z-index: 1;

  ${media.mobile} {
    display: none;
  }
`

const icons = [
  { icon: '{ }', x: '72%', y: '20%', delay: '0s', rot: '-10deg', size: '1.8rem' },
  { icon: '</>', x: '80%', y: '55%', delay: '0.8s', rot: '8deg', size: '1.6rem' },
  { icon: '🚀', x: '65%', y: '70%', delay: '0.4s', rot: '0deg', size: '2.2rem' },
  { icon: '⚡', x: '88%', y: '35%', delay: '1.2s', rot: '15deg', size: '2rem' },
  { icon: '🐛', x: '60%', y: '40%', delay: '0.6s', rot: '-5deg', size: '1.8rem' },
]

export default function Hero() {
  const { t } = useTranslation()
  const words = t('hero.words', { returnObjects: true })
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setIndex(0)
  }, [words.length])

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length)
    }, 2000)
    return () => clearInterval(id)
  }, [words.length])

  const longestWord = [...words].sort((a, b) => b.length - a.length)[0]

  return (
    <Section id="hero">
      <Grid aria-hidden="true" />

      {icons.map((ic, i) => (
        <FloatingIcon
          key={i}
          $x={ic.x}
          $y={ic.y}
          $delay={ic.delay}
          $rot={ic.rot}
          $size={ic.size}
          aria-hidden="true"
        >
          {ic.icon}
        </FloatingIcon>
      ))}

      <Content>
        <Eyebrow>{t('hero.role')}</Eyebrow>
        <Headline>Javohir.</Headline>

        <WordRow>
          <StaticWord>{t('hero.iam')}</StaticWord>
          <SwapWrapper>
            <AnimatePresence mode="wait">
              <motion.span
                key={words[index]}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                style={{
                  fontFamily: 'inherit',
                  fontSize: 'inherit',
                  fontWeight: 900,
                  color: '#FF2D78',
                  letterSpacing: '-0.03em',
                  lineHeight: 0.95,
                  display: 'block',
                  whiteSpace: 'nowrap',
                  position: 'absolute',
                }}
              >
                {words[index]}
              </motion.span>
            </AnimatePresence>
            <span style={{ visibility: 'hidden', fontWeight: 900, letterSpacing: '-0.03em', whiteSpace: 'nowrap' }}>
              {longestWord}
            </span>
          </SwapWrapper>
        </WordRow>

        <Sub>{t('hero.sub')}</Sub>

        <Button
          as="a"
          href="#projects"
          onClick={(e) => {
            e.preventDefault()
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          {t('hero.cta')}
        </Button>
      </Content>
    </Section>
  )
}
