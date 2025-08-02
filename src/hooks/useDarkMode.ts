import { useEffect, useState } from 'react'

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    localStorage.getItem('data-theme') === 'Dark-Mode'
  )

  const handleTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDarkMode(e.target.checked)
  }

  const setDarkMode = () => {
    localStorage.setItem('data-theme', 'Dark-Mode')
    document.documentElement.setAttribute('data-theme', 'dark')
  }

  const setLightMode = () => {
    localStorage.setItem('data-theme', 'Light-Mode')
    document.documentElement.setAttribute('data-theme', 'light')
  }

  useEffect(() => {
    if (isDarkMode) {
      setDarkMode()
    } else {
      setLightMode()
    }
  }, [isDarkMode])

  return { handleTheme, isDarkMode }
}

export default useDarkMode
