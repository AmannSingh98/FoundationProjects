import { useState } from 'react'

const useNestedComment = (commentData: Array<object>) => {
  const [updatedCommentData, setUpdatedCommentData] =
    useState<Array<object>>(commentData)

  const editCommentTree = (
    tree: Array<object>,
    id: number,
    content: string
  ) => {
    return tree.map(comment => {
      console.log('oye', comment.id)
      if (comment.id === id) {
        return {
          ...comment,
          replies: [
            ...comment.replies,
            { id, content, timestamp: new Date().toISOString(), replies: [] }
          ]
        }
      } else if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: editCommentTree(id, content, prev.replies)
        }
      }
      return comment
    })
  }

  const postComment = (commentId: number, content: string) => {
    console.log('post comment function')
    const newContent = {
      id: new Date().getTime(),
      content,
      timestamp: new Date().toISOString(),
      replies: []
    }

    if (commentId) {
      setUpdatedCommentData(prev => editCommentTree(prev, commentId, content))
    } else {
      setUpdatedCommentData(prev => [newContent, ...prev])
    }
  }
  return { postComment, updatedCommentData }
}

export default useNestedComment
