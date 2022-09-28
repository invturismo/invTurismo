import React from "react";
import ErrorMessage from "./ErrorMessage";
import FieldSelect from "./FieldSelect";
import NameField from "./NameField";

const LabelSelect = ({
  nameField,
  req,
  errors,
  children,
  id,
  name,
  onBlur,
  onChange,
  value,
  className,
  ...props
}) => {
  return (
    <label htmlFor="ID_FUENTE" className={className || null}>
      <NameField name={nameField} req={req} />
      <FieldSelect
        id={id}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        {...props}
      >
        {children}
      </FieldSelect>
      <ErrorMessage errors={errors} />
    </label>
  );
};

export default LabelSelect;
