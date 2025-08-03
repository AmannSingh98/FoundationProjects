import { useState } from 'react'
import commentData from '../data/commentData.json'
import './NestedComment.css'
import useNestedComment from '../hooks/useCommentTree'
import SingleComment from './SingleComment'

// interface nestedCommentProps {}

const NestedComment = () => {
  const [content, setContent] = useState('')
  const { postComment, editComment, updatedCommentData } =
    useNestedComment(commentData)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  const handleClick = () => {
    postComment(0, content)
    setContent('')
  }

  return (
    <div className="comment-section-container">
      <div className="post-comment-section">
        <textarea
          cols={70}
          rows={2}
          placeholder="Add a new comment..."
          value={content}
          onChange={handleChange}
          className="comment-textarea"
        ></textarea>
        <button className="post-button" type="button" onClick={handleClick}>
          Add Comment
        </button>
      </div>
      <div className="reply-comment-section-container">
        {updatedCommentData.map(comment => {
          return (
            <SingleComment
              comment={comment}
              handleReply={postComment}
              handleEdit={editComment}
              key={comment.id}
            />
          )
        })}
      </div>
    </div>
  )
}

export default NestedComment
