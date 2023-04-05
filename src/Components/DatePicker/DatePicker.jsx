import React, { useState, useEffect } from "react";
import Label from "../Label/Label";
import style from "./DatePicker.module.scss";
const DatePicker = (props) => {
  const { label, labelDescription, required, value, setValue } = props;
  const [errorWarning, setErrorWarning] = useState("");
  const [cloneDate, setCloneDate] = useState("");

  useEffect(() => {
    setCloneDate(value);
  }, [value]);

  const handleOnBlur = (event) => {
    handleValidate(event.target.value);
  };

  const handleOnChange = (event) => {
    setCloneDate(event.target.value);
  };

  const handleValidate = (date) => {
    if (required) {
      if (date === "") {
        setErrorWarning(label + " must not leave empty!");
      }
    }
    let dateOfBirth = new Date(date);
    let currentdate = new Date();
    if (dateOfBirth > currentdate) {
      setErrorWarning("Invalid Date!");
    }
    setErrorWarning("");
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
        onBlur={handleOnBlur}
        value={cloneDate}
        onChange={handleOnChange}
      />
      <br />
      {errorWarning !== "" && (
        <span className={style.warning}>{errorWarning}</span>
      )}
    </div>
  );
};

export default DatePicker;
