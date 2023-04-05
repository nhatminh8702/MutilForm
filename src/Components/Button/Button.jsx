import React from "react";
import style from "./Button.module.scss";
const Button = ({label, onClick}) => {
  return (
    <div className={style.container}>
      <span className={style.button} onClick={onClick} > {label} </span>
    </div>
  );
};

export default Button;
