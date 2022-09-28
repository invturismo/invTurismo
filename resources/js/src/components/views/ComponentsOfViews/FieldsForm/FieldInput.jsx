import React from "react";

const propsOptional = condition => (condition ? {autoComplete: "off"} : {});

const FieldInput = ({
  name,
  type,
  onChange,
  onBlur,
  value,
  id,
  autOff,
  ...props
}) => {
  return (
    <input
      type={type || "text"}
      name={name}
      id={id || name}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      {...propsOptional(autOff)}
      {...props}
    />
  );
};

export default FieldInput;
