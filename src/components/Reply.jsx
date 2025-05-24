import React, { useState } from "react";
import CommentForm from "./CommentForm";

const Reply = ({ reply, commentId, comments, setComments }) => {
  const [editing, setEditing] = useState(false);

  const updateReply = (updatedText) => {
    const updated = comments.map((comment) => {
      if (comment.id === commentId) {
        const replies = comment.replies.map((r) =>
          r.id === reply.id ? { ...r, content: updatedText } : r
        );
        return { ...comment, replies };
      }
      return comment;
    });
    setComments(updated);
    setEditing(false);
  };

  const deleteReply = () => {
    const updated = comments.map((comment) => {
      if (comment.id === commentId) {
        const replies = comment.replies.filter((r) => r.id !== reply.id);
        return { ...comment, replies };
      }
      return comment;
    });
    setComments(updated);
  };

  return (
    <div className="bg-gray-100 rounded-lg p-3 mb-2">
      <div className="flex justify-between">
        <p className="font-bold">{reply.user.username}</p>
        <div className="text-sm space-x-2">
          <button onClick={() => setEditing(!editing)}>Edit</button>
          <button onClick={deleteReply} className="text-red-500">
            Delete
          </button>
        </div>
      </div>
      {!editing ? (
        <p className="text-gray-700 mt-1">{reply.content}</p>
      ) : (
        <CommentForm
          initial={reply.content}
          onSubmit={updateReply}
          isEditing
        />
      )}
    </div>
  );
};

export default Reply;