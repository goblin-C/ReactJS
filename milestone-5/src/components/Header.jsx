import React from 'react';

const Header = () => {
  return (
    <header className="flex items-center justify-between border-b h-14 px-6 bg-white">
      {/* Search Bar */}
      <div className="flex items-center w-full max-w-sm text-gray-500 pl-2">
        <img src="/images/search.svg" alt="search" className="w-4 h-4 mr-2" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full border-none outline-none placeholder-gray-400 text-sm"
        />
      </div>

      {/* Icons Section */}
      <div className="flex items-center gap-4 text-gray-500 text-sm pr-4">
        <div className="flex items-center gap-1 cursor-pointer hover:text-gray-700">
          <img src="/images/feedback.svg" alt="feedback" className="w-4 h-4" />
          <span>Feedback?</span>
        </div>
        <img src="/images/bell.svg" alt="notifications" className="w-4 h-4 cursor-pointer hover:text-gray-700" />
        <img src="/images/question.svg" alt="help" className="w-4 h-4 cursor-pointer hover:text-gray-700" />
        <img src="/images/user.svg" alt="user" className="w-4 h-4 cursor-pointer hover:text-gray-700" />
      </div>
    </header>
  );
};

export default Header;
