import React from "react";
import ErrorMessage from "./ErrorMessage";
import NameField from "./NameField";
import TextArea from "./TextArea";

const LabelTextarea = ({
  nameField,
  name,
  id,
  onChange,
  onBlur,
  value,
  rows,
  errors,
  req,
  className,
  ...props
}) => {
  return (
    <label htmlFor={id || name} className={className || null}>
      <NameField name={nameField} req={req} />
      <TextArea
        id={id}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        rows={rows}
        value={value}
        {...props}
      />
      <ErrorMessage errors={errors} />
    </label>
  );
};

export default LabelTextarea;
