import ProfileMain from '../../assets/images/ProfileMain.svg'
import './Resume.css'
const Resume = () => {
  return (
    <div className="secondary-container">
      <article className="profile-icon">
        <img src={ProfileMain} alt="profile" />
      </article>
      <article className="profile-into">
        <h1>Hi, I am Aman Singh</h1>
        <p>Frontend Developer</p>
      </article>
    </div>
  )
}

export default Resume
