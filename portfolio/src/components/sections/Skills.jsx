import { useState, useMemo } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { media } from '../../styles/breakpoints'
import SectionTitle from '../common/SectionTitle'
import { skills } from '../../data/skills'
import { useScrollReveal } from '../../hooks/useScrollAnimation'

const Section = styled.section`
  background: ${({ theme }) => theme.colors.cream};
  padding: ${({ theme }) => theme.spacing.section} ${({ theme }) => theme.spacing.container};
`

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const FilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2.5rem;
`

const FilterBtn = styled.button`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: 700;
  padding: 0.625rem 1.25rem;
  min-height: 44px;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 2px solid ${({ theme }) => theme.colors.dark};
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  background: ${({ $active, theme }) => ($active ? theme.colors.dark : 'transparent')};
  color: ${({ $active, theme }) => ($active ? theme.colors.accent : theme.colors.dark)};

  &:hover {
    background: ${({ theme }) => theme.colors.dark};
    color: ${({ theme }) => theme.colors.accent};
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
`

const Card = styled(motion.article)`
  background: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.dark};
  border-radius: ${({ theme }) => theme.radius.card};
  padding: 1.5rem;
  box-shadow: 4px 4px 0 ${({ theme }) => theme.colors.dark};
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const CardIcon = styled.span`
  font-size: 2.5rem;
  line-height: 1;
`

const CardName = styled.p`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.dark};
  margin: 0;
`

const CategoryPill = styled.span`
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.625rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: rgba(255, 45, 120, 0.1);
  color: ${({ theme }) => theme.colors.primary};
  align-self: flex-start;
`

const ProgressTrack = styled.div`
  height: 6px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: rgba(26, 10, 18, 0.1);
  overflow: hidden;
`

const ProgressFill = styled(motion.div)`
  height: 100%;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.primary};
`

export default function Skills() {
  const { t } = useTranslation()
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = useMemo(() => {
    const unique = [...new Set(skills.map((s) => s.category))]
    return ['All', ...unique]
  }, [])

  const filtered = useMemo(() => {
    return activeCategory === 'All'
      ? skills
      : skills.filter((s) => s.category === activeCategory)
  }, [activeCategory])

  const gridRef = useScrollReveal('.skill-card')

  return (
    <Section id="skills">
      <Inner>
        <SectionTitle>{t('skills.title')}</SectionTitle>

        <FilterBar>
          {categories.map((cat) => (
            <FilterBtn
              key={cat}
              $active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === 'All' ? t('skills.filterAll') : cat}
            </FilterBtn>
          ))}
        </FilterBar>

        <Grid ref={gridRef}>
          {filtered.map((skill, i) => (
            <Card
              key={skill.id}
              className="skill-card"
              whileHover={{ y: -4, boxShadow: '6px 6px 0 #1A0A12' }}
            >
              <CardIcon aria-hidden="true">{skill.icon}</CardIcon>
              <CardName>{skill.name}</CardName>
              <CategoryPill>{skill.category}</CategoryPill>
              <ProgressTrack>
                <ProgressFill
                  initial={{ width: 0 }}
                  animate={{ width: skill.level + '%' }}
                  transition={{ delay: 0.2 + i * 0.05, duration: 0.8 }}
                />
              </ProgressTrack>
            </Card>
          ))}
        </Grid>
      </Inner>
    </Section>
  )
}
