import { useEffect, useState } from 'react'
import styled from 'styled-components'

const Bar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: ${({ theme }) => theme.colors.accent};
  z-index: 999;
  transition: width 0.1s linear;
  width: ${({ $width }) => $width}%;
`

export default function ScrollProgress() {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setWidth(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return <Bar $width={width} aria-hidden="true" />
}
