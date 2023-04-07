import React from "react";
import style from "./ErrorWarning.module.scss";
const ErrorWarning = ({ message }) => {
  return (
    <>{message !== "" && <div className={style.errorMessage}>{message}</div>}</>
  );
};

export default ErrorWarning;
