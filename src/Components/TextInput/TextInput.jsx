import React, { useEffect, useState } from "react";
import Label from "../Label/Label";
import style from "./TextInput.module.scss";
import ErrorWarning from "../ErrorWarning/ErrorWarning";
const TextInput = (props) => {
  const {
    label,
    labelDescription,
    required,
    value,
    setValue,
    maxlength,
    errorMessage,
  } = props;
  TextInput.propTypes = {};
  const [errorWarning, setErrorWarning] = useState("");
  const handleValidate = (text) => {
    if (text.length === 0) {
      setErrorWarning(errorMessage);
      setValue(text);
    } else if (text.length > maxlength) {
      setErrorWarning(
        "Text length must be less than " + maxlength + " characters"
      );
    } else {
      setErrorWarning("");
      setValue(text);
    }
  };

  const handleOnChange = (event) => {
    handleValidate(event.target.value);
  };

  useEffect(() => {
    setErrorWarning(errorMessage);
  }, [errorMessage]);

  return (
    <div className={style.container}>
      <Label
        label={label}
        required={required}
        labelDescription={labelDescription}
      />
      <input
        className={style.input}
        type="text"
        value={value}
        onChange={handleOnChange}
      />
      <br />
      <ErrorWarning message={errorWarning} />
    </div>
  );
};
TextInput.defaultProps = {
  maxlength: 100,
};
export default TextInput;
