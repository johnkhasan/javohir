import styled from 'styled-components'

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.h2};
  font-weight: 900;
  color: ${({ theme, $color }) => $color || theme.colors.dark};
  line-height: 1.05;
  letter-spacing: -0.02em;
  margin-bottom: 3rem;
`

export default function SectionTitle({ children, color }) {
  return <Title $color={color}>{children}</Title>
}
