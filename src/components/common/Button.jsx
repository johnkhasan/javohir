import styled from 'styled-components'
import { motion } from 'framer-motion'

const StyledButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 2rem;
  background: ${({ theme, $variant }) =>
    $variant === 'outline' ? 'transparent' : theme.colors.dark};
  color: ${({ theme, $variant }) =>
    $variant === 'outline' ? theme.colors.dark : theme.colors.accent};
  border: 2px solid ${({ theme }) => theme.colors.dark};
  border-radius: ${({ theme }) => theme.radius.pill};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  text-decoration: none;
  letter-spacing: 0.02em;
  transition: background 0.2s, color 0.2s;

  &:hover {
    background: ${({ theme, $variant }) =>
      $variant === 'outline' ? theme.colors.dark : theme.colors.accent};
    color: ${({ theme, $variant }) =>
      $variant === 'outline' ? theme.colors.accent : theme.colors.dark};
  }
`

export default function Button({ children, variant, onClick, as, href, ...props }) {
  return (
    <StyledButton
      as={as}
      href={href}
      $variant={variant}
      onClick={onClick}
      whileHover={{ y: -3, boxShadow: '4px 4px 0 rgba(0,0,0,0.3)' }}
      whileTap={{ y: 0, boxShadow: 'none' }}
      {...props}
    >
      {children}
    </StyledButton>
  )
}
