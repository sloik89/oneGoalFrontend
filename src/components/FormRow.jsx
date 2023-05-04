import React from "react";

const FormRow = ({ type, name, value, handleChange }) => {
  console.log(type, name, value);
  return (
    <div className="form__row">
      <label htmlFor={name} className="form__label">
        {name}
      </label>
      <input
        type={type}
        name={name}
        className="form__input"
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};

export default FormRow;
