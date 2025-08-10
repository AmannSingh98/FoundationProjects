import { render, screen } from '@testing-library/react'
import ToastReview from './ToastReview'
import useToast from '../hooks/useToast'
import userEvent from '@testing-library/user-event'

vi.mock('../hooks/useToast', () => ({ default: vi.fn() }))

const useToastMode = vi.mocked(useToast)

describe('toast component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useToastMode.mockReturnValue({
      notification: [],
      handleNo: vi.fn(),
      handleYes: vi.fn(),
      handleClose: vi.fn()
    })
  })

  it('render toast component before the click', () => {
    render(<ToastReview />)
    expect(screen.getByText(/do you like the website /i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /yes/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /no/i })).toBeInTheDocument()
  })

  it('render toast component after the click', async () => {
    const handleYesMock = vi.fn()
    // can call the test value after the click....
    // useToastMode.mockReturnValue({
    //   notification: [{ id: 1, message: 'Thanks for the feedback' }],
    //   handleNo: vi.fn(),
    //   handleYes: handleYesMock,
    //   handleClose: vi.fn()
    // })

    useToastMode.mockReturnValueOnce({
      notification: [],
      handleNo: vi.fn(),
      handleYes: handleYesMock,
      handleClose: vi.fn()
    })

    render(<ToastReview />)
    const user = userEvent.setup()
    const yesButton = screen.getByRole('button', { name: /yes!/i })
    await user.click(yesButton)
    // expect(screen.getByText(/Thanks for the feedback/i)).toBeInTheDocument()
    expect(
      screen.queryByText(/sorry, will work on it/i)
    ).not.toBeInTheDocument()
    expect(handleYesMock).toHaveBeenCalled()
  })
})
