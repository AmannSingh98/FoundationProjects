import ThemeToggle from 'components/ThemeToggle/ThemeToggle'
import NestedComment from 'features/nested-comment/components/NestedComment'
import Resume from 'features/resume/components/Resume'

const Home = () => {
  return (
    <>
      <ThemeToggle />
      <Resume />
      <div style={{ display: 'flex', flexGrow: '1' }} />
      <NestedComment />
    </>
  )
}

export default Home
