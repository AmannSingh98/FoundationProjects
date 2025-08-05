import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Resume from './Resume'

describe('Resume Component', () => {
  beforeEach(() => {
    render(<Resume />)
  })

  it('render profile image with correct src', () => {
    const img = screen.getByTestId('profile-image')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', expect.stringContaining('ProfileMain'))
    expect(img).toHaveAttribute('alt', '')
  })

  it('render heading and job title', () => {
    const heading = screen.getByRole('heading', {
      name: /Hi, I am Aman singh/i
    })
    expect(heading).toBeInTheDocument()
    expect(screen.getByText(/frontend developer/i)).toBeInTheDocument()
  })

  it('renders test me button', () => {
    const button = screen.getByRole('button', { name: /test me/i })
    expect(button).toBeInTheDocument()
  })

  it('does not render quiz modal initially', () => {
    expect(screen.queryByText(/welcome to the quiz/i)).not.toBeInTheDocument()
  })

  it('open modal on test me button click', async () => {
    const user = userEvent.setup()
    const button = screen.getByRole('button', { name: /test me/i })
    await user.click(button)
    expect(screen.getByText(/welcome to the quiz/i)).toBeInTheDocument()
  })
})
