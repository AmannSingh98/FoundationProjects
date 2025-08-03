import { useState } from 'react'

export interface Comment {
  id: number
  content: string
  timestamp: string
  replies: Comment[]
}

const useNestedComment = (commentData: Comment[]) => {
  const [updatedCommentData, setUpdatedCommentData] = useState(commentData)

  const editCommentTree = (
    tree: Comment[],
    id: number,
    content: string
  ): Comment[] => {
    return tree.map(comment => {
      if (comment.id === id) {
        return { ...comment, content, timestamp: new Date().toISOString() }
      } else if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: editCommentTree(comment.replies, id, content)
        }
      }
      return comment
    })
  }

  const editComment = (id: number, content: string) => {
    console.log(id, content)

    setUpdatedCommentData(prev => editCommentTree(prev, id, content))
    console.log('edit Comment')
  }

  const postCommentTree = (
    tree: Comment[],
    id: number,
    newContent: Comment
  ): Comment[] => {
    return tree.map(comment => {
      if (comment.id === id) {
        return {
          ...comment,
          replies: [...comment.replies, newContent]
        }
      } else if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: postCommentTree(comment.replies, id, newContent)
        }
      }
      return comment
    })
  }

  const postComment = (commentId: number | null, content: string) => {
    const newContent = {
      id: Date.now(),
      content,
      timestamp: new Date().toISOString(),
      replies: []
    }
    if (commentId) {
      setUpdatedCommentData(prev =>
        postCommentTree(prev, commentId, newContent)
      )
    } else {
      setUpdatedCommentData(prev => [newContent, ...prev])
    }
  }
  return { postComment, editComment, updatedCommentData }
}

export default useNestedComment
