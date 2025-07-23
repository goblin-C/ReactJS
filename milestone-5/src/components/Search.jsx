import { useState } from "react";

export function Search() {
  const [value, setValue] = useState("");

  return (
    <div
      className={`flex items-center rounded-md px-3 py-2 w-72 transition 
        ${value ? "border border-gray-400" : "border border-transparent hover:border-gray-400"}`}
    >
      {/* Search Icon */}
      <img src="/images/search.svg" alt="Search" className="w-4 h-4 mr-2" />

      {/* Input Field */}
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="font-inter font-normal text-sm w-full border-none focus:outline-none focus:ring-0"
      />
    </div>
  );
}
