import { render, screen } from '@testing-library/react'
import ThemeToggle from './ThemeToggle'

vi.mock('hooks/useDarkMode', () => ({
  default: () => ({
    isDarkMode: false,
    handleTheme: vi.fn()
  })
}))

describe('ThemeToggle', () => {
  it('render for the first time', () => {
    render(<ThemeToggle />)

    const toggleTheme = screen.getByRole('checkbox', {
      name: /toggle dark mode/i
    })
    expect(toggleTheme).toBeInTheDocument()

    // Assert it's initially unchecked because of mock
    expect(toggleTheme).not.toBeChecked()
  })
})
