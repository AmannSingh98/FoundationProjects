import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Resume from './Resume'

describe('Resume Component', () => {
  beforeEach(() => {
    render(<Resume />)
  })

  it('render resume page elements', () => {
    // test case for image
    const img = screen.getByTestId('profile-image')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', expect.stringContaining('ProfileMain'))
    expect(img).toHaveAttribute('alt', '')

    // test case for heading
    expect(
      screen.getByRole('heading', {
        name: /Hi, I am Aman singh/i
      })
    ).toBeInTheDocument()
    expect(screen.getByText(/frontend developer/i)).toBeInTheDocument()

    // test case for button
    expect(screen.getByRole('button', { name: /test me/i })).toBeInTheDocument()
  })

  it('does not render modal initially', () => {
    expect(screen.queryByText(/welcome to the quiz/i)).not.toBeInTheDocument()
  })

  it('open modal on test me button click', async () => {
    const user = userEvent.setup()
    const button = screen.getByRole('button', { name: /test me/i })
    await user.click(button)
    expect(screen.getByText(/welcome to the quiz/i)).toBeInTheDocument()
  })
})
