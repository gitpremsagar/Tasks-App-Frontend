import React from "react";

export default function GreenBorderButton({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`hover:bg-green-500 hover:text-white px-3 py-1 rounded-lg border border-green-500 transition-colors duration-500 ease-in-out ${className}`}
    >
      {children}
    </button>
  );
}
