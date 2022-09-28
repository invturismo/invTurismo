import React from "react";

const NameField = ({name, req}) => {
  return (
    <span className="NameField">
      <span>{name}</span>
      {req && <small>(*)</small>}
    </span>
  );
};

export default NameField;
