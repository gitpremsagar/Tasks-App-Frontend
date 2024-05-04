import React from "react";

export default function ValidationErrorMsg({ message }) {
  return (
    <div className="bg-red-400 text-white text-xs px-2 py-1 rounded-md">
      &#8595; {message}
    </div>
  );
}
