import React from 'react';

const Modal = ({ visible, productTitle, onCancel, onConfirm }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-70 backdrop-blur-sm z-50">
      <div className="bg-white rounded-lg px-6 py-6 w-[400px] text-center shadow-xl">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 rounded-full p-3">
            <svg
              className="w-6 h-6 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 mb-1">Delete Product</h2>

        {/* Message */}
        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to delete the Product{' '}
          <strong className="text-gray-800">‘{productTitle}’</strong>?
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
