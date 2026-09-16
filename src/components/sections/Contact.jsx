import { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Icon from '../common/Icon'
import { media } from '../../styles/breakpoints'
import SectionTitle from '../common/SectionTitle'
import Button from '../common/Button'

const Section = styled.section`
  background: ${({ theme }) => theme.colors.cyan};
  padding: ${({ theme }) => theme.spacing.section} ${({ theme }) => theme.spacing.container};
`

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;

  ${media.desktop} {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }
`

const InfoCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const Tagline = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.dark};
  line-height: 1.4;
`

const EmailText = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.body};
  color: ${({ theme }) => theme.colors.dark};
`

const SocialRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`

const SocialBtn = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 52px;
  min-height: 52px;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.dark};
  text-decoration: none;
  font-size: 1.25rem;
  font-weight: 700;
  transition: border-color 0.2s, background 0.2s, color 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.dark};
    color: ${({ theme }) => theme.colors.accent};
  }
`

const HoneyPot = styled.input`
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
`

const FormCol = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

const Input = styled.input`
  width: 100%;
  padding: 0.875rem 1rem;
  background: white;
  border: 2px solid ${({ theme }) => theme.colors.dark};
  border-radius: ${({ theme }) => theme.radius.sm};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.875rem 1rem;
  background: white;
  border: 2px solid ${({ theme }) => theme.colors.dark};
  border-radius: ${({ theme }) => theme.radius.sm};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
  resize: vertical;
  box-sizing: border-box;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const StatusMsg = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: 700;
  color: ${({ $error, theme }) => ($error ? theme.colors.primary : theme.colors.dark)};
`

const socials = [
  { key: 'github', href: 'https://github.com/johnkhasan', icon: 'github' },
  { key: 'linkedin', href: 'https://linkedin.com/in/javohirhasanov', icon: 'linkedin' },
  { key: 'telegram', href: 'https://t.me/JavohirHasanov', icon: 'telegram' },
  { key: 'email', href: 'mailto:javohirdevuz@gmail.com', icon: 'email' },
]

export default function Contact() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [website, setWebsite] = useState('') // honeypot — faqat botlar to'ldiradi
  const [status, setStatus] = useState('idle')

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, website }),
      })
      if (res.ok) {
        setStatus('sent')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <Section id="contact">
      <Inner>
        <SectionTitle>{t('contact.title')}</SectionTitle>
        <Grid>
          <InfoCol>
            <Tagline>{t('contact.info')}</Tagline>
            <EmailText>javohirdevuz@gmail.com</EmailText>
            <SocialRow>
              {socials.map((s) => (
                <SocialBtn
                  key={s.key}
                  href={s.href}
                  target={s.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={t(`footer.socials.${s.key}`)}
                >
                  <Icon name={s.icon} size={22} tone="current" />
                </SocialBtn>
              ))}
            </SocialRow>
          </InfoCol>

          <FormCol
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            as="form"
            onSubmit={handleSubmit}
          >
            <Input
              type="text"
              name="name"
              placeholder={t('contact.name')}
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              type="email"
              name="email"
              placeholder={t('contact.email')}
              value={formData.email}
              onChange={handleChange}
              required
            />
            <HoneyPot
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              aria-hidden="true"
            />
            <Textarea
              name="message"
              placeholder={t('contact.message')}
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
            />

            <Button type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? t('contact.sending') : t('contact.send')}
            </Button>

            {status === 'sent' && <StatusMsg>{t('contact.sent')}</StatusMsg>}
            {status === 'error' && <StatusMsg $error>{t('contact.error')}</StatusMsg>}
          </FormCol>
        </Grid>
      </Inner>
    </Section>
  )
}
