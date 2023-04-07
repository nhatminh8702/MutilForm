import React, { useEffect, useState } from "react";
import Label from "../Label/Label";
import style from "./NumberInput.module.scss";
import ErrorWarning from "../ErrorWarning/ErrorWarning";
const NumberInput = ({
  label,
  labelDescription,
  required,
  value,
  setValue,
  maxlength,
  currency,
  errorMessage,
}) => {
  const [errorWarning, setErrorWarning] = useState("");

  const formatterDecimal = new Intl.NumberFormat("en-US", {
    style: "decimal",
  });

  const handleOnChange = (event) => {
    const number = event.target.value.split(",").join("");
    let reg = /^(\d+)$/;
    if (reg.test(number) || number === "") {
      if (number.toString() === "") {
        setErrorWarning(errorMessage);
      }
      if (number.toString().length <= maxlength) {
        setValue(formatterDecimal.format(number));
        setErrorWarning("");
      } else {
        setErrorWarning(label + " exceeded limit 10 digits");
      }
    }
  };

  useEffect(() => {
    setErrorWarning(errorMessage);
  }, [errorMessage]);

  return (
    <div className={style.container}>
      <Label
        label={label}
        labelDescription={labelDescription}
        required={required}
      />
      <div className={style.inputWarper}>
        <input type="text" value={value} onChange={handleOnChange} />
        <span>{currency}</span>
      </div>
      <ErrorWarning message={errorWarning} />
    </div>
  );
};

export default NumberInput;
