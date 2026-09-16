import { useEffect } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: #0D0D1A;
  z-index: 9998;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`

const Logo = styled(motion.span)`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 5rem;
  font-weight: 900;
  color: #FFE600;
  line-height: 1;
`

const ProgressTrack = styled.div`
  width: clamp(160px, 30vw, 280px);
  height: 3px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 100px;
  overflow: hidden;
`

const ProgressBar = styled(motion.div)`
  height: 100%;
  background: #FFE600;
  border-radius: 100px;
`

export default function Preloader({ onComplete }) {
  useEffect(() => {
    const id = setTimeout(onComplete, 1800)
    return () => clearTimeout(id)
  }, [onComplete])

  return (
    <Overlay
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: '-5%' }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
    >
      <Logo
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        JH.
      </Logo>
      <ProgressTrack>
        <ProgressBar
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.3, ease: 'easeInOut' }}
        />
      </ProgressTrack>
    </Overlay>
  )
}
