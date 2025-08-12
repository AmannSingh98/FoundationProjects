import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons'
import useDarkMode from 'hooks/useDarkMode'
import './ThemeToggle.css'

const ThemeToggle = () => {
  const { handleTheme: handleChange, isDarkMode: isChecked } = useDarkMode()
  console.log('rendering theme toggle-', isChecked)
  return (
    <section>
      <fieldset>
        <legend className="sr-only">Theme Selection</legend>
        <label className="toggle-label">
          <input
            type="checkbox"
            className="toggle-input"
            checked={isChecked}
            onChange={handleChange}
            aria-label="Toggle between dark and light mode"
          />
          <span className="toggle-button" aria-hidden={true}>
            {isChecked ? (
              <FontAwesomeIcon icon={faMoon} className="moon icon" />
            ) : (
              <FontAwesomeIcon icon={faSun} className="sun icon" />
            )}
          </span>
        </label>
      </fieldset>
      <hr className="horizontal-line" />
    </section>
  )
}

export default ThemeToggle
