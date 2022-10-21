import React from "react";
import {helpCapitalize} from "../../../../../helpers/helpCapitalize";

const validateValue = value => value || "-";

const GetInformation1 = ({name, content, help}) => {
  return (
    <div className="GetInformation1">
      <h5>{name}</h5>
      <p className={content ? "NormalP" : "NoneP"}>
        {help ? validateValue(helpCapitalize(content)) : validateValue(content)}
      </p>
    </div>
  );
};

export default GetInformation1;
