import styled from 'styled-components'

const StyledTag = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: ${({ theme, $bg }) => $bg || theme.colors.dark};
  color: ${({ theme, $color }) => $color || theme.colors.accent};
  border-radius: ${({ theme }) => theme.radius.pill};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: 600;
  letter-spacing: 0.03em;
`

export default function Tag({ children, bg, color }) {
  return (
    <StyledTag $bg={bg} $color={color}>
      {children}
    </StyledTag>
  )
}
