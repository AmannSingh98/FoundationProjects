import ThemeToggle from 'components/ThemeToggle/ThemeToggle'
import NestedComment from 'features/nested-comment/components/NestedComment'
import Resume from 'features/resume/components/Resume'
import './Home.css'
import ToastReview from 'features/toast-review/components/ToastReview'

const Home = () => {
  return (
    <div className="home-container">
      <ThemeToggle />
      <Resume />
      <div className="spacer" />
      <NestedComment />
      <ToastReview />
    </div>
  )
}

export default Home
