import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import SectionTitle from '../common/SectionTitle'
import Tag from '../common/Tag'
import { useScrollReveal } from '../../hooks/useScrollAnimation'
import { experiences } from '../../data/experience'
import { media } from '../../styles/breakpoints'

const Section = styled.section`
  background: ${({ theme }) => theme.colors.accent};
  padding: ${({ theme }) => theme.spacing.section} ${({ theme }) => theme.spacing.container};
`

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const Timeline = styled.div`
  position: relative;
  padding-left: 3rem;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: ${({ theme }) => theme.colors.dark};
  }

  ${media.mobile} {
    padding-left: 2rem;
  }
`

const TimelineItem = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 2rem;
  margin-bottom: 3rem;

  &::before {
    content: '';
    position: absolute;
    left: -3.35rem;
    top: 1.5rem;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.dark};
    border: 3px solid ${({ theme }) => theme.colors.accent};
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
    gap: 0.5rem;
    padding-left: 1rem;
  }
`

const Year = styled.div`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.1rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.dark};
  padding-top: 1.4rem;

  ${media.mobile} {
    padding-top: 0;
  }
`

const Card = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.radius.card};
  padding: 1.75rem;
  box-shadow: 6px 6px 0 ${({ theme }) => theme.colors.primary};
  border: 2px solid ${({ theme }) => theme.colors.dark};
`

const Company = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.h3};
  font-weight: 900;
  color: ${({ $color }) => $color};
  margin-bottom: 0.25rem;
`

const Role = styled.p`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
  letter-spacing: 0.02em;
`

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.body};
  color: rgba(26,10,18,0.7);
  line-height: 1.6;
  margin-bottom: 1rem;
`

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

export default function Experience() {
  const { t, i18n } = useTranslation()
  const containerRef = useScrollReveal('.experience-card')
  const lang = i18n.language

  return (
    <Section id="experience">
      <Inner>
        <SectionTitle>{t('experience.title')}</SectionTitle>
        <Timeline ref={containerRef}>
          {experiences.map((exp) => (
            <TimelineItem key={exp.id} className="experience-card">
              <Year>{exp.year}</Year>
              <Card>
                <Company $color={exp.color}>{exp.company}</Company>
                <Role>{exp.role}</Role>
                <Description>{lang === 'uz' ? exp.descriptionUz : exp.description}</Description>
                <Tags>
                  {exp.tags.map((tag) => (
                    <Tag key={tag} bg={exp.color} color="#fff">
                      {tag}
                    </Tag>
                  ))}
                </Tags>
              </Card>
            </TimelineItem>
          ))}
        </Timeline>
      </Inner>
    </Section>
  )
}
