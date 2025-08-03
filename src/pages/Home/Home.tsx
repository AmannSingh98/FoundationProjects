import ThemeToggle from 'components/ThemeToggle/ThemeToggle'
import NestedComment from 'features/nested-comment/components/NestedComment'
import Resume from 'features/resume/components/Resume'

const Home = () => {
  return (
    <>
      <ThemeToggle />
      <Resume />
      <NestedComment />
    </>
  )
}

export default Home
