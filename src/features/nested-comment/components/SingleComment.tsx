import React, { useMemo, useState } from 'react'
import './SingleComment.css'
import type { Comment as CommentType } from '../hooks/useCommentTree'

interface singleCommentProps {
  comment: CommentType
  handleReply: (id: number | null, content: string) => void
  handleEdit: (id: number, content: string) => void
  handleDelete: (id: number) => void
}

const SingleComment = React.memo(
  ({ comment, handleReply, handleEdit, handleDelete }: singleCommentProps) => {
    const { id, content, timestamp } = comment
    const [isExpand, setIsExpand] = useState(false)
    const [replyContent, setReplyContent] = useState('')
    const [isEdit, setIsEdit] = useState(false)
    const [editContent, setEditContent] = useState(content)

    const memoisedSingleComment = useMemo(() => {
      return comment.replies.map((comment, idx) => {
        return (
          <SingleComment
            comment={comment}
            handleReply={handleReply}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            key={idx}
          />
        )
      })
    }, [comment])

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

    const handleEditContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setEditContent(e.target.value)
    }

    const handleEditScreen = () => {
      setIsEdit(true)
    }

    const handleSave = () => {
      handleEdit(id, editContent)
      handleCancel()
    }

    const handleCancel = () => {
      setIsEdit(false)
    }

    const handleCommentDelete = () => {
      handleDelete(id)
    }

    return (
      <section className="reply-section">
        {isEdit ? (
          <div className="post-comment-section">
            <textarea
              cols={70}
              rows={2}
              placeholder="Add a new comment..."
              value={editContent}
              onChange={handleEditContent}
              className="comment-textarea"
            ></textarea>
            <button className="post-button" type="button" onClick={handleSave}>
              Save
            </button>
            <button
              className="post-button"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            <p>{content} </p>
            <span>{new Date(timestamp).toLocaleString()}</span>
            <div className="comment-button-container">
              <button onClick={handleExpand}>
                {isExpand ? 'Hide' : 'Reply'}
              </button>
              <button onClick={handleEditScreen}>Edit</button>
              <button onClick={handleCommentDelete}>Delete</button>
            </div>
          </>
        )}
        {isExpand && (
          <div>
            <div className="post-comment-section">
              <textarea
                cols={70}
                rows={2}
                placeholder="Add your reply..."
                value={replyContent}
                onChange={handleChange}
                className="comment-textarea"
              ></textarea>
              <button
                className="post-button"
                type="button"
                onClick={handleCommentReply}
              >
                Add Comment
              </button>
            </div>
            {memoisedSingleComment}
            {/* {comment.replies.map((comment, idx) => {
              console.log('map rendering', comment)
              return (
                <SingleComment
                  comment={comment}
                  handleReply={handleReply}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  key={idx}
                />
              )
            })} */}
          </div>
        )}
      </section>
    )
  }
)

export default SingleComment
