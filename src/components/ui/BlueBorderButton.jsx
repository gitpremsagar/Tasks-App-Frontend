import React from "react";

export default function BlueBorderButton({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`hover:bg-blue-500 hover:text-white px-3 py-1 rounded-lg border border-blue-500 transition-colors duration-500 ease-in-out ${className}`}
    >
      {children}
    </button>
  );
}
