import React from "react";

const TextBox = ({ children }) => {
  return (
    <div className="bg-gray-100 w-full rounded flex my-4 items-center px-2">
      <input
        type="text"
        className="w-full rounded md:text-sm bg-gray-100 p-2 outline-none h-10 flex-1"
        placeholder={children}
      />
    </div>
  );
};

export default TextBox;
