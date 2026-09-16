import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
    color-scheme: light;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.body};
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.dark};
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  .skip-link {
    position: absolute;
    top: -100%;
    left: 1rem;
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.dark};
    padding: 0.5rem 1rem;
    border-radius: 0 0 8px 8px;
    font-weight: 500;
    z-index: 999;
    transition: top 0.2s;
    text-decoration: none;
  }

  .skip-link:focus {
    top: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }

  :focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 3px;
  }

  img {
    max-width: 100%;
    display: block;
  }

  @media (hover: hover) {
    body { cursor: none; }
  }

  body::after {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 9000;
    opacity: 0.04;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 200px 200px;
    background-repeat: repeat;
  }
`
