import { createContext, useContext, useEffect, useMemo } from 'react'

const ThemeContext = createContext({ resolved: 'dark', preference: 'dark' })

export function ThemeProvider({ children }) {
  useEffect(() => {
    const root = document.documentElement
    root.classList.add('dark')
    root.dataset.theme = 'dark'
  }, [])

  const value = useMemo(
    () => ({
      preference: 'dark',
      /** Site usa apenas tema escuro; preferência de alternância foi desativada */
      setPreference: () => {},
      resolved: 'dark',
    }),
    []
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}
