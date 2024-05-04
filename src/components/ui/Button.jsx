import React from "react";

const Button = ({ children, onClick, type, disabled }) => {
  return (
    <button
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={onClick}
      type={type || "button"}
      disabled={disabled}
    >
      {disabled ? "processing..." : children}
    </button>
  );
};

export default Button;
