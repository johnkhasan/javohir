import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { media } from '../../styles/breakpoints'
import SectionTitle from '../common/SectionTitle'
import avatarPhoto from '../../assets/javohir.jpg'

const Section = styled.section`
  background: ${({ theme }) => theme.colors.cyan};
  padding: ${({ theme }) => theme.spacing.section} ${({ theme }) => theme.spacing.container};
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;

  ${media.mobile} {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`

const IllustrationWrap = styled.div`
  display: flex;
  justify-content: center;
`

const Avatar = styled.div`
  width: 320px;
  height: 380px;
  background: ${({ theme }) => theme.colors.navy};
  border-radius: 20px;
  transform: rotate(-3deg);
  box-shadow: 8px 8px 0 ${({ theme }) => theme.colors.dark};
  border: 2px solid ${({ theme }) => theme.colors.dark};
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,46,120,0.18), transparent 60%);
    pointer-events: none;
  }

  ${media.mobile} {
    width: 240px;
    height: 285px;
  }
`

const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 22%;
  display: block;
`

const CardsWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

const Notebook = styled(motion.div)`
  background: #fffde7;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 4px 4px 0 ${({ theme }) => theme.colors.dark};
  transform: rotate(${({ $rot }) => $rot});
  border: 2px solid ${({ theme }) => theme.colors.dark};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 2.5rem;
    top: 0;
    bottom: 0;
    width: 2px;
    background: rgba(255,46,120,0.3);
  }
`

const NoteDate = styled.p`
  font-size: 0.75rem;
  font-weight: 600;
  color: rgba(0,0,0,0.4);
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
`

const NoteText = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.dark};
  padding-left: 1.5rem;
`

export default function About() {
  const { t } = useTranslation()

  return (
    <Section id="about">
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SectionTitle>{t('about.title')}</SectionTitle>
      </div>

      <Grid>
        <IllustrationWrap>
          <Avatar>
            <AvatarImg
              src={avatarPhoto}
              alt={t('about.avatarLabel')}
              width="912"
              height="1172"
              loading="lazy"
              decoding="async"
            />
          </Avatar>
        </IllustrationWrap>

        <CardsWrap>
          <Notebook
            $rot="-2deg"
            whileHover={{ rotate: 0, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <NoteDate>{t('about.note1.date')}</NoteDate>
            <NoteText>{t('about.note1.text')}</NoteText>
          </Notebook>

          <Notebook
            $rot="1.5deg"
            whileHover={{ rotate: 0, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <NoteDate>{t('about.note2.date')}</NoteDate>
            <NoteText>{t('about.note2.text')}</NoteText>
          </Notebook>
        </CardsWrap>
      </Grid>
    </Section>
  )
}
