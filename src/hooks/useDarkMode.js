import { useState, useEffect } from 'react'

const STORAGE_KEY = 'aac-dark-mode'

export function useDarkMode() {
  const [dark, setDark] = useState(() => localStorage.getItem(STORAGE_KEY) === 'true')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem(STORAGE_KEY, dark)
  }, [dark])

  return { dark, toggleDark: () => setDark((d) => !d) }
}
