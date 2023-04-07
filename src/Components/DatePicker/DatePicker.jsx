import React, { useState, useEffect } from "react";
import Label from "../Label/Label";
import style from "./DatePicker.module.scss";
import ErrorWarning from "../ErrorWarning/ErrorWarning";
const DatePicker = (props) => {
  const { label, labelDescription, required, value, setValue, errorMessage } =
    props;
  const [errorWarning, setErrorWarning] = useState("");

  useEffect(() => {
    setErrorWarning(errorMessage);
  }, [errorMessage]);

  const handleOnChange = (event) => {
    handleValidate(event.target.value);
  };

  const handleValidate = (date) => {
    let dateOfBirth = new Date(date);
    let currentdate = new Date();
    if (date === "") {
      console.log(errorMessage);
      setErrorWarning(errorMessage);
    } else if (dateOfBirth > currentdate) {
      setErrorWarning("Invalid Date!");
    } else {
      setErrorWarning("");
    }
    setValue(date);
  };
  return (
    <div className={style.container}>
      <Label
        label={label}
        required={required}
        labelDescription={labelDescription}
      />
      <input
        type="date"
        className={style.input}
        value={value}
        onChange={handleOnChange}
      />
      <br />
      <ErrorWarning message={errorWarning} />
    </div>
  );
};

export default DatePicker;
