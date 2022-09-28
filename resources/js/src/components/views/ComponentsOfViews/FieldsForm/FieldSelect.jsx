import React from "react";

const FieldSelect = ({
  children,
  name,
  id,
  value,
  onChange,
  onBlur,
  ...props
}) => {
  return (
    <select
      name={name}
      id={id || name}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      {...props}
    >
      {children}
    </select>
  );
};

export default FieldSelect;
