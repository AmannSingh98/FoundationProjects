import { useEffect, useState } from 'react'

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const handleTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDarkMode(e.target.checked)
  }

  const setDarkMode = () => {
    document.documentElement.setAttribute('data-theme', 'dark')
  }

  const setLightMode = () => {
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
