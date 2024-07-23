"use-client";
import React from "react";

const Button = ({ children, type='button' }) => {
  return (
    <button type={type} className="bg-green-500 transition-all duration-300 hover:bg-white hover:text-green-500 hover:border-green-500 text-white py-2 px-6 rounded-full border-2 border-white">
      {children}
    </button>
  );
};

export default Button;
