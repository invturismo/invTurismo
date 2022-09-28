import React from "react";

const ErrorMessage = ({errors}) => {
  return <>{errors && <small className="errorMessage">{errors}</small>}</>;
};

export default ErrorMessage;
