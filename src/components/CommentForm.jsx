import React, { useState } from "react";

const CommentForm = ({ onSubmit, initial = "", isReply = false, isEditing = false }) => {
  const [text, setText] = useState(initial);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newEntry = {
      id: Date.now(),
      content: text,
      createdAt: "just now",
      score: 0,
      user: {
        username: "currentUser", // Replace with actual user in real app
      },
      replies: [],
    };

    onSubmit(isEditing ? text : newEntry);
    if (!isEditing) setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2">
      <textarea
        className="w-full border rounded p-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
      ></textarea>
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
      >
        {isEditing ? "Update" : isReply ? "Reply" : "Send"}
      </button>
    </form>
  );
};

export default CommentForm;
