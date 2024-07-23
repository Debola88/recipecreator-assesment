import React from "react";

const StyledSelect = ({ name, value, onChange, options, placeholder }) => (
  <select
    name={name}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="bg-gray-100  rounded p-2 w-full h-10 outline-none focus:outline-none"
    Required
  >
    <option value="" disabled>
      {placeholder}
    </option>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export default StyledSelect;
