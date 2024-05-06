import React from "react";

const SelectElement = ({
  label,
  name,
  options,
  onChange,
  className,
  value,
}) => {
  return (
    <>
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={`select-${label}`}
      >
        {label}
      </label>
      <select
        id={`select-${label}`}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-5 ${className}`}
        onChange={onChange}
        name={name}
        value={value || ""}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectElement;
