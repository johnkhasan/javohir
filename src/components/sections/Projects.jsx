import { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import SectionTitle from '../common/SectionTitle'
import Tag from '../common/Tag'
import { useScrollReveal } from '../../hooks/useScrollAnimation'
import { projects } from '../../data/projects'
import { media } from '../../styles/breakpoints'

const Section = styled.section`
  background: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.section} ${({ theme }) => theme.spacing.container};
`

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 3rem;
`

const FilterBtn = styled.button`
  padding: 0.4rem 1.2rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 2px solid ${({ theme, $active }) => ($active ? theme.colors.dark : 'rgba(255,255,255,0.4)')};
  background: ${({ theme, $active }) => ($active ? theme.colors.accent : 'transparent')};
  color: ${({ theme, $active }) => ($active ? theme.colors.dark : theme.colors.white)};
  font-weight: 700;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  font-family: ${({ theme }) => theme.fonts.body};
  min-height: 44px;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accent};
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`

const Card = styled(motion.article)`
  background: ${({ theme }) => theme.colors.cream};
  border-radius: ${({ theme }) => theme.radius.card};
  padding: 1.75rem;
  transform: rotate(${({ $rot }) => $rot}deg);
  border: 2px solid ${({ theme }) => theme.colors.dark};
  box-shadow: 5px 5px 0 ${({ theme }) => theme.colors.dark};
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const CategoryTag = styled.div`
  display: inline-block;
  padding: 0.3rem 0.9rem;
  background: ${({ $color }) => $color};
  color: ${({ theme }) => theme.colors.dark};
  border-radius: ${({ theme }) => theme.radius.pill};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  width: fit-content;
`

const ProjectTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.h3};
  font-weight: 900;
  color: ${({ theme }) => theme.colors.dark};
  letter-spacing: -0.02em;
  line-height: 1.1;
`

const ProjectDesc = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: rgba(26,10,18,0.65);
  line-height: 1.6;
  flex: 1;
`

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`

const Links = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
`

const IconLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.dark};
  text-decoration: none;
  padding: 0.4rem 0;
  border-bottom: 2px solid transparent;
  transition: border-color 0.2s;

  &:hover { border-color: ${({ theme }) => theme.colors.primary}; }
`

const allTags = ['All', ...new Set(projects.flatMap((p) => p.tags))]

export default function Projects() {
  const { t, i18n } = useTranslation()
  const [activeTag, setActiveTag] = useState('All')
  const lang = i18n.language

  const filterAllLabel = t('projects.filterAll')
  const tags = [filterAllLabel, ...new Set(projects.flatMap((p) => p.tags))]

  const filtered = activeTag === filterAllLabel || activeTag === 'All'
    ? projects
    : projects.filter((p) => p.tags.includes(activeTag))

  const containerRef = useScrollReveal('.project-card')

  return (
    <Section id="projects">
      <Inner>
        <SectionTitle color="#FFE600">{t('projects.title')}</SectionTitle>

        <FilterRow role="group" aria-label="Filter by technology">
          {tags.map((tag) => (
            <FilterBtn
              key={tag}
              $active={activeTag === tag || (tag === filterAllLabel && activeTag === 'All')}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </FilterBtn>
          ))}
        </FilterRow>

        <Grid ref={containerRef}>
          {filtered.map((project) => (
            <Card
              key={project.id}
              $rot={project.rotation}
              className="project-card"
              whileHover={{
                rotate: 0,
                y: -8,
                boxShadow: '8px 8px 0 #1A0A12',
                transition: { duration: 0.2 },
              }}
            >
              <CategoryTag $color={project.color}>
                {project.tags[0]}
              </CategoryTag>
              <ProjectTitle>
                {lang === 'uz' && project.titleUz ? project.titleUz : project.title}
              </ProjectTitle>
              <ProjectDesc>
                {lang === 'uz' && project.descriptionUz ? project.descriptionUz : project.description}
              </ProjectDesc>
              <TagList>
                {project.tags.map((tag) => (
                  <Tag key={tag} bg="rgba(26,10,18,0.08)" color="#1A0A12">
                    {tag}
                  </Tag>
                ))}
              </TagList>
              <Links>
                <IconLink href={project.link} target="_blank" rel="noopener noreferrer">
                  {t('projects.github')}
                </IconLink>
                {project.liveLink && (
                  <IconLink href={project.liveLink} target="_blank" rel="noopener noreferrer">
                    {t('projects.live')}
                  </IconLink>
                )}
              </Links>
            </Card>
          ))}
        </Grid>
      </Inner>
    </Section>
  )
}
