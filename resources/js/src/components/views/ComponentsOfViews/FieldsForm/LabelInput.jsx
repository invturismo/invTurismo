import React from "react";
import ErrorMessage from "./ErrorMessage";
import FieldInput from "./FieldInput";
import NameField from "./NameField";

const LabelInput = ({
  name,
  id,
  value,
  onChange,
  onBlur,
  type,
  errors,
  nameField,
  req,
  autOff,
  className,
  ...props
}) => {
  return (
    <label htmlFor={id || name} className={className || null}>
      <NameField name={nameField} req={req} />
      <FieldInput
        autOff={autOff}
        id={id}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        type={type}
        value={value}
        {...props}
      />
      <ErrorMessage errors={errors} />
    </label>
  );
};

export default LabelInput;
