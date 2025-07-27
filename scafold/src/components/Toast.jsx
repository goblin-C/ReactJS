import React from 'react';

const Toast = ({ message, type = 'success', onClose }) => {
  const bgColor = type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';

  return (
    <div className={`fixed top-5 right-5 px-4 py-3 rounded shadow-lg z-50 ${bgColor}`}>
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 font-bold">✕</button>
      </div>
    </div>
  );
};

export default Toast;
