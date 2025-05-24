import React, { useState } from 'react';
import Modal from './Modal';

const Comment = ({ comment, onDelete, currentUser, onReply, onEdit, onVote }) => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.content);

  const handleDelete = () => setShowModal(true);
  const confirmDelete = () => {
    onDelete(comment.id);
    setShowModal(false);
  };

  const isCurrentUser = comment.user.username === currentUser.username;


  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-4">
      <div className="flex items-start gap-4">
        <div className="flex flex-col items-center bg-gray-100 rounded-lg px-2 py-1 text-indigo-600 font-bold">
          <button onClick={() => onVote(comment.id, 1)}>+</button>
          <span>{comment.score}</span>
          <button onClick={() => onVote(comment.id, -1)}>-</button>
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img
                src={comment.user.image.png.replace('./images/avatars', '/assets/images/avatars')} alt={comment.user.username}
                className="w-8 h-8 rounded-full"
              />
              <span className="font-bold text-sm">{comment.user.username}</span>
              {isCurrentUser && (
                <span className="text-white bg-indigo-500 text-xs px-2 py-0.5 rounded">you</span>
              )}
              <span className="text-gray-500 text-sm">{comment.createdAt}</span>
            </div>

            <div className="flex gap-4 text-sm font-bold">
              {isCurrentUser ? (
                <>
                  <button onClick={handleDelete} className="text-red-500 hover:underline flex space-x-1">
                    <img className='' src="/assets/images/icon-delete.svg" alt="" />
                    <i className="fa fa-trash" /> Delete
                  </button>
                  <button onClick={() => setIsEditing(true)} className="text-indigo-500 hover:underline flex space-x-1">
                    <img src="/assets/images/icon-edit.svg" alt="" />
                    <i className="fa fa-edit" /> Edit
                  </button>
                </>
              ) : (
                <button onClick={() => onReply(comment.id)} className="text-indigo-500 hover:underline flex space-x-1">
                    <img src="/assets/images/icon-reply.svg" alt="" />
                  <i className="fa fa-reply" /> Reply
                </button>
              )}
            </div>
          </div>

          {isEditing ? (
            <div className="mt-4">
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full border rounded p-2"
              />
              <button
                onClick={() => {
                  onEdit(comment.id, editText);
                  setIsEditing(false);
                }}
                className="bg-indigo-500 text-white px-4 py-1 mt-2 rounded hover:bg-indigo-600"
              >
                Update
              </button>
            </div>
          ) : (
            <p className="text-gray-700 mt-4">{comment.content}</p>
          )}
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default Comment;
