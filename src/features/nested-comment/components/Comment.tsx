import { useState } from 'react'
import './Comment.css'
const Comment = ({ comment, handleReply }) => {
  const { id, content, timestamp } = comment
  const [isExpand, setIsExpand] = useState(false)
  const [replyContent, setReplyContent] = useState('')

  const handleExpand = () => {
    setIsExpand(!isExpand)
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyContent(e.target.value)
  }

  const handleCommentReply = id => {
    handleReply(id, replyContent)
    setReplyContent('')
  }

  return (
    <section className="reply-section">
      <p>{content} </p>
      <span>{timestamp}</span>
      <div className="comment-button-container">
        <button onClick={handleExpand}>{isExpand ? 'Hide' : 'Reply'}</button>
        <button>Edit</button>
        <button>Delete</button>
      </div>
      {isExpand && (
        <div>
          <div className="post-comment-section">
            <textarea
              cols={70}
              rows={2}
              placeholder="Add a new comment..."
              value={replyContent}
              onChange={handleChange}
              className="comment-textarea"
            ></textarea>
            <button
              className="post-button"
              type="button"
              onClick={() => handleCommentReply(id)}
            >
              Add Comment
            </button>
          </div>
          {comment.replies.map(comment => {
            return <Comment comment={comment} handleReply={handleReply} />
          })}
        </div>
      )}
    </section>
  )
}

export default Comment
