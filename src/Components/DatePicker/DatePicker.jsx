import React, { useState } from "react";
import style from "./DatePicker.module.scss";
const DatePicker = (props) => {
  const { label, required, setDate } = props;
  const [errorWarning, setErrorWarning] = useState("");
  const handleOnBlur = (event) => {
    handleValidate(event.target.value);
  };

  const handleValidate = (date) => {
    let error = false;
    if (required) {
      if (date === "") {
        error = true;
        setErrorWarning(label + " must not leave empty!");
      }
    }
    let dateOfBirth = new Date(date);
    let currentdate = new Date();
    if (dateOfBirth > currentdate) {
      error = true;
      setErrorWarning("Invalid Date!");
    }
    if (!error) {
      setErrorWarning("");
      setDate(date);
    }
  };
  return (
    <div className={style.container}>
      <p className={style.label}>
        {required && <span className={style.required}>Must</span>}
        {label}
      </p>
      <input type="date" className={style.input} onBlur={handleOnBlur} />
      <br />
      {errorWarning !== "" && (
        <span className={style.warning}>{errorWarning}</span>
      )}
    </div>
  );
};

export default DatePicker;
