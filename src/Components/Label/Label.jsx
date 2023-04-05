import React from "react";
import style from "./Label.module.scss";
const Label = ({ label, required, description }) => {
  return (
    <>
      {(required || (label && label !== "")) && (
        <div className={style.label} >
          {required && <span className={style.required}>Must</span>}
          {label && label !== "" && (
            <span className={style.label}>{label}</span>
          )}
        </div>
      )}
      {description && description !== "" && <p className={style.description}>{description}</p>}
    </>
  );
};
export default Label;
