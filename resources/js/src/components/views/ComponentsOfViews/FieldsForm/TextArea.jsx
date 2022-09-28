import React from "react";

const TextArea = ({name, id, onChange, onBlur, value, rows, ...props}) => {
  return (
    <textarea
      name={name}
      id={id || name}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      rows={rows}
      {...props}
    />
  );
};

export default TextArea;
