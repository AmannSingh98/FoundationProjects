import { useState } from 'react'

export interface Comment {
  id: number
  content: string
  timestamp: string
  replies: Comment[]
}

const useNestedComment = (commentData: Comment[]) => {
  const [updatedCommentData, setUpdatedCommentData] = useState(commentData)

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

  const deleteCommentTree = (tree: Comment[], id: number): Comment[] => {
    console.log('tree')
    return tree
      .filter(comment => comment.id !== id)
      .map(comment => ({
        ...comment,
        replies: comment.replies ? deleteCommentTree(comment.replies, id) : []
      }))
  }

  const deleteComment = (id: number) => {
    setUpdatedCommentData(prev => deleteCommentTree(prev, id))
    console.log('delete Comment')
  }

  return { postComment, editComment, deleteComment, updatedCommentData }
}

export default useNestedComment
