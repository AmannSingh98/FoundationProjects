import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import useDarkMode from '../../hooks/useDarkMode'
import './ThemeToggle.css'

const ThemeToggle = () => {
  const { handleTheme: handleChange, isDarkMode: isChecked } = useDarkMode()
  return (
    <>
      <label className="toggle-label">
        <input
          type="checkbox"
          className="toggle-input"
          checked={isChecked}
          onChange={handleChange}
          aria-label="Toggle button for dark mode"
        />
        <span className="toggle-button">
          {isChecked ? (
            <FontAwesomeIcon icon={faMoon} className="moon icon" />
          ) : (
            <FontAwesomeIcon icon={faSun} className="sun icon" />
          )}
        </span>
      </label>
      <div className="horizontal-line"></div>
    </>
  )
}

export default ThemeToggle
