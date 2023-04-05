import React, { useEffect, useState } from "react";
import style from "./FormToDatePicker.module.scss";
import DatePicker from "../DatePicker/DatePicker";
import Label from "../Label/Label";
const FromToDatePicker = ({
  label,
  labelDescription,
  required,
  value,
  setValue,
  compareFormToDate,
}) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
        setErrorMessage("date invalid!");
        error = true;
      }
      if (date1 > currentDate) {
        setErrorMessage("date invalid!");
        error = true;
      }
      console.log(compareFormToDate(fromDate, toDate));
      if (compareFormToDate(fromDate, toDate)) {
        console.log(2);
        setErrorMessage("date invalid!");
        error = true;
      }
      if (!error) {
        setErrorMessage("");
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
      {errorMessage !== "" && <span className={style.errorMessage}>{errorMessage}</span>}
    </div>
  );
};

export default FromToDatePicker;
