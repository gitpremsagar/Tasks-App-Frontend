import React from "react";

const InputField = ({ label, placeholder, onChange, type, name, inputRef }) => {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={label}
      >
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={label}
        type={type || "text"}
        placeholder={placeholder}
        onChange={onChange}
        name={name || ""}
        ref={inputRef}
      />
    </div>
  );
};

export default InputField;
