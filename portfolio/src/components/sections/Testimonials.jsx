import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import SectionTitle from '../common/SectionTitle'
import { testimonials } from '../../data/testimonials'
import { media } from '../../styles/breakpoints'

const Section = styled.section`
  background: ${({ theme }) => theme.colors.navy};
  padding: ${({ theme }) => theme.spacing.section} ${({ theme }) => theme.spacing.container};
`

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const CarouselWrapper = styled.div`
  position: relative;
  overflow: hidden;
  margin-bottom: 2rem;
`

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 24px;
  padding: 2.5rem;

  ${media.mobile} {
    padding: 1.75rem 1.25rem;
  }
`

const AvatarRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.25rem;
`

const AvatarEmoji = styled.span`
  font-size: 3rem;
  line-height: 1;
`

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`

const AuthorName = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  line-height: 1.2;
`

const AuthorRole = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 600;
`

const QuoteText = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.05rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.8;
  margin: 1.25rem 0;
`

const Stars = styled.div`
  display: flex;
  gap: 0.25rem;
`

const Star = styled.span`
  color: ${({ theme }) => theme.colors.accent};
  font-size: 1.1rem;
`

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1.5rem;
`

const ArrowBtn = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background: transparent;
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s, background 0.2s, color 0.2s;
  font-family: ${({ theme }) => theme.fonts.body};

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.dark};
  }
`

const Dots = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const Dot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  padding: 0;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.accent : 'rgba(255, 255, 255, 0.3)'};
  transition: background 0.2s;
  min-width: 10px;
`

export default function Testimonials() {
  const { t, i18n } = useTranslation()
  const [currentIndex, setCurrentIndex] = useState(0)
  const lang = i18n.language

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const goTo = (index) => {
    setCurrentIndex((index + testimonials.length) % testimonials.length)
  }

  const testimonial = testimonials[currentIndex]
  const displayText = lang === 'uz' ? testimonial.textUz : testimonial.text
  const displayRole = lang === 'uz' ? testimonial.roleUz : testimonial.role

  return (
    <Section id="testimonials">
      <Inner>
        <SectionTitle color="#FFFFFF">{t('testimonials.title')}</SectionTitle>

        <CarouselWrapper>
          <AnimatePresence mode="wait">
            <Card
              key={currentIndex}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              <AvatarRow>
                <AvatarEmoji>{testimonial.avatar}</AvatarEmoji>
                <AuthorInfo>
                  <AuthorName>{testimonial.name}</AuthorName>
                  <AuthorRole>{displayRole}</AuthorRole>
                </AuthorInfo>
              </AvatarRow>

              <QuoteText>{displayText}</QuoteText>

              <Stars>
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i}>&#9733;</Star>
                ))}
              </Stars>
            </Card>
          </AnimatePresence>
        </CarouselWrapper>

        <Controls>
          <ArrowBtn onClick={() => goTo(currentIndex - 1)} aria-label="Previous testimonial">
            &#8592;
          </ArrowBtn>

          <Dots>
            {testimonials.map((_, i) => (
              <Dot
                key={i}
                $active={i === currentIndex}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </Dots>

          <ArrowBtn onClick={() => goTo(currentIndex + 1)} aria-label="Next testimonial">
            &#8594;
          </ArrowBtn>
        </Controls>
      </Inner>
    </Section>
  )
}
