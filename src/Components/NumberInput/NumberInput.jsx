import React, { useEffect, useState } from "react";
import Label from "../Label/Label";
import style from "./NumberInput.module.scss";
const NumberInput = ({
  label,
  labelDescription,
  required,
  value,
  setValue,
  maxlength,
  currency,
}) => {
  const [number, setNumber] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    setNumber(value);
  }, [value]);

  const oneDot = (event) => {
    var value = event.target.value;
    value = value.split(".").join("");
    if (value.length > 3) {
      value =
        value.substring(0, value.length - 3) +
        "." +
        value.substring(value.length - 3, value.length);
    }
    event.target.value = value;
  };

  const handleOnBlur = () => {
    console.log(number);
    if (required) {
      if (number === "") {
        setErrorMessage(label + " must not leave empty");
      }
    }
  };

  const handleOnChange = (event) => {
    if (event.target.value.toString().length <= maxlength) {
      setValue(event.target.value);
      setNumber(event.target.value);
    } else {
      setErrorMessage(label + " exceeded limit 10 digits");
    }
  };

  return (
    <div className={style.container}>
      <Label
        label={label}
        labelDescription={labelDescription}
        required={required}
      />
      <div className={style.inputWarper}>
        <input
          type="number"
          value={number}
          onKeyUp={oneDot}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
        />
        <span>{currency}</span>
      </div>
      {errorMessage !== "" && (
        <p className={style.errorMessage}>{errorMessage}</p>
      )}
    </div>
  );
};

export default NumberInput;
