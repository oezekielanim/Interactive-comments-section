import React from 'react';

const Modal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl max-w-sm w-full shadow-lg ">
        <h2 className="text-xl font-bold mb-4 al">Delete comment</h2>
        <p className="text-gray-500 mb-6">
          Are you sure you want to delete this comment? This will remove the comment and can’t be undone.
        </p>
        <div className="flex justify-between gap-4">
          <button
            onClick={onCancel}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg w-full"
          >
            NO, CANCEL
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg w-full"
          >
            YES, DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
