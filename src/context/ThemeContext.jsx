import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext(null)

export function ThemeContextProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('portfolio-theme') === 'dark'
  })

  useEffect(() => {
    localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const toggleTheme = () => setIsDark(v => !v)

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
