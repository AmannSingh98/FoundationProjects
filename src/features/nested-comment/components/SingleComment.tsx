import { useState } from 'react'
import './SingleComment.css'
import type { Comment as CommentType } from '../hooks/useCommentTree'

interface singleCommentProps {
  comment: CommentType
  handleReply: (id: number | null, content: string) => void
}

const Comment = ({ comment, handleReply }: singleCommentProps) => {
  const { id, content, timestamp } = comment
  const [isExpand, setIsExpand] = useState(false)
  const [replyContent, setReplyContent] = useState('')

  const handleExpand = () => {
    setIsExpand(!isExpand)
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyContent(e.target.value)
  }

  const handleCommentReply = () => {
    handleReply(id, replyContent)
    setReplyContent('')
  }

  return (
    <section className="reply-section">
      <p>{content} </p>
      <span>{new Date(timestamp).toLocaleString()}</span>
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
              onClick={() => handleCommentReply}
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
