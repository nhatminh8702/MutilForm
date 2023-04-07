import React, { useEffect, useState } from "react";
import style from "./FormToDatePicker.module.scss";
import DatePicker from "../DatePicker/DatePicker";
import Label from "../Label/Label";
import ErrorWarning from "../ErrorWarning/ErrorWarning";
const FromToDatePicker = ({
  label,
  labelDescription,
  required,
  value,
  setValue,
  compareDate,
  errorMessage,
}) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [errorWarning, setErrorWarning] = useState("");

  useEffect(() => {
    const dateArray = value.split(" ");
    if (dateArray[0] && dateArray[1]) {
      setFromDate(dateArray[0]);
      setToDate(dateArray[1]);
    }
  }, [value]);

  useEffect(() => {
    if (fromDate !== "" && toDate !== "") {
      let error = false;
      const date1 = new Date(fromDate);
      const date2 = new Date(toDate);
      const currentDate = new Date();
      if (date1 >= date2) {
        setErrorWarning("date invalid!");
        error = true;
      }
      if (date1 > currentDate) {
        setErrorWarning("date invalid!");
        error = true;
      }
      if (compareDate(fromDate, toDate)) {
        setErrorWarning("date invalid!");
        error = true;
      }
      if (fromDate + " " + toDate === "") {
        error = true;
        setErrorWarning(errorMessage);
      }
      if (!error) {
        setErrorWarning("");
        setValue(fromDate + " " + toDate);
      }
    }
  }, [fromDate, toDate]);
  return (
    <div className={style.container}>
      <Label
        label={label}
        required={required}
        labelDescription={labelDescription}
      />
      <div className={style.warper}>
        <DatePicker value={fromDate} setValue={setFromDate} />
        <hr />
        <DatePicker value={toDate} setValue={setToDate} />
      </div>
      <ErrorWarning message={errorWarning} />
    </div>
  );
};

export default FromToDatePicker;
