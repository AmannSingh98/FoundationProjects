import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ThemeToggle from './ThemeToggle'
import useDarkMode from 'hooks/useDarkMode'

vi.mock('hooks/useDarkMode', () => ({
  default: vi.fn()
}))

// vi.mock('hooks/useDarkMode', () => ({
//   default: () => ({ isDarkMode: false, handleTheme: vi.fn() })
// }))

const mockUseDarkMode = vi.mocked(useDarkMode)

describe('Theme Toggle', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUseDarkMode.mockReturnValue({
      isDarkMode: false,
      handleTheme: vi.fn()
    })
  })

  it('render as light mode', () => {
    render(<ThemeToggle />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeInTheDocument()
    expect(checkbox).not.toBeChecked()
    expect(screen.getByRole('img', { hidden: true })).toHaveClass('sun')
  })

  it('render moon icon when the dark mode is active', () => {
    mockUseDarkMode.mockReturnValue({
      isDarkMode: true,
      handleTheme: vi.fn()
    })
    render(<ThemeToggle />)

    expect(screen.getByRole('checkbox')).toBeChecked()
    expect(screen.getByRole('img', { hidden: true })).toHaveClass('moon')
  })

  it('calls handle theme when toggled', async () => {
    const handleThemeMock = vi.fn()
    mockUseDarkMode.mockReturnValue({
      isDarkMode: false,
      handleTheme: handleThemeMock
    })
    render(<ThemeToggle />)
    const user = userEvent.setup()
    const button = screen.getByRole('checkbox', { name: /toggle dark mode/i })
    await user.click(button)
    expect(handleThemeMock).toHaveBeenCalled()
  })
})
