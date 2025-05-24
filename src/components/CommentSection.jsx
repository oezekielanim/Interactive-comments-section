import React, { useEffect, useState } from 'react';
import Comment from './Comment';
import data from '../data/data.json';

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null); // holds ID of comment being replied to
  const [replyText, setReplyText] = useState(''); // reply input

  useEffect(() => {
    const savedData = localStorage.getItem('comments-app');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setComments(parsed.comments);
      setCurrentUser(parsed.currentUser);
    } else {
      setComments(data.comments);
      setCurrentUser(data.currentUser);
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('comments-app', JSON.stringify({ comments, currentUser }));
    }
  }, [comments, currentUser]);

  const handleDelete = (id) => {
    const recursiveDelete = (list, targetId) => {
      return list.filter(comment => {
        if (comment.id === targetId) return false;
        if (comment.replies) {
          comment.replies = recursiveDelete(comment.replies, targetId);
        }
        return true;
      });
    };
    setComments(prev => recursiveDelete([...prev], id));
  };

  const handleReply = (commentId) => {
    setReplyingTo(commentId);
    setReplyText('');
  };

  const submitReply = (parentId) => {
    if (!replyText.trim()) return;
    const addReply = (list) => {
      return list.map(comment => {
        if (comment.id === parentId) {
          const replyObj = {
            id: Date.now(),
            content: replyText,
            createdAt: new Date().toISOString(),
            score: 0,
            replyingTo: comment.user.username,
            user: currentUser,
          };
          const replies = comment.replies ? [...comment.replies, replyObj] : [replyObj];
          return { ...comment, replies };
        } else if (comment.replies) {
          return { ...comment, replies: addReply(comment.replies) };
        }
        return comment;
      });
    };
    setComments(prev => addReply(prev));
    setReplyingTo(null);
    setReplyText('');
  };

  const handleEdit = (id, newText) => {
    const editRecursive = (list) =>
      list.map(comment => {
        if (comment.id === id) {
          return { ...comment, content: newText };
        } else if (comment.replies) {
          return { ...comment, replies: editRecursive(comment.replies) };
        }
        return comment;
      });
    setComments(prev => editRecursive(prev));
  };

  const handleVote = (id, delta) => {
    const voteRecursive = (list) =>
      list.map(comment => {
        if (comment.id === id) {
          return { ...comment, score: comment.score + delta };
        } else if (comment.replies) {
          return { ...comment, replies: voteRecursive(comment.replies) };
        }
        return comment;
      });
    setComments(prev => voteRecursive(prev));
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newObj = {
        id: Date.now(),
        content: newComment,
        createdAt: 'just now',
        score: 0,
        user: currentUser,
        replies: []
      };
      setComments([...comments, newObj]);
      setNewComment('');
    }
  };

  const renderComments = (commentList) => {
    return commentList.map(comment => (
      <div key={comment.id} className="mb-4">
        <Comment
          comment={comment}
          onDelete={handleDelete}
          onReply={handleReply}
          onEdit={handleEdit}
          onVote={handleVote}
          currentUser={currentUser}
        />

        {/* Show reply input under the comment being replied to */}
        {replyingTo === comment.id && (
          <div className="ml-12 mt-2 flex items-start gap-4">
            <img src={currentUser?.image?.png.replace('./images/avatars', '/assets/images/avatars')} alt="avatar" className="w-8 h-8 rounded-full" />
            <textarea
              className="flex-1 border rounded p-2"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={`Reply to @${comment.user.username}`}
            />
            <button
              onClick={() => submitReply(comment.id)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
            >
              REPLY
            </button>
          </div>
        )}

        {/* Render nested replies recursively */}
        {comment.replies && (
          <div className="ml-8 mt-4 border-l-2 border-gray-200 pl-4">
            {renderComments(comment.replies)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div>
      {renderComments(comments)}

      <div className="bg-white p-4 mt-6 rounded-xl shadow flex items-start gap-4">
        <img
          src={currentUser?.image?.png.replace('./images/avatars', '/assets/images/avatars')}
          alt={currentUser?.username}
          className="w-10 h-10 rounded-full"
        />
        <textarea
          className="flex-1 border rounded p-2"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button
          onClick={handleAddComment}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
        >
          SEND
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
