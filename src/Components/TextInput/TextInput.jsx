import React, { useEffect, useState } from "react";
import Label from "../Label/Label";
import style from "./TextInput.module.scss";
const TextInput = (props) => {
  const { label, labelDescription, required, value, setValue, maxlength } =
    props;
  TextInput.propTypes = {};
  const [errorWarning, setErrorWarning] = useState("");
  const [componentValue, setComponentValue] = useState("");

  useEffect(() => {
    setComponentValue(value);
  }, [value]);

  const handleValidate = (text) => {
    if (required) {
      if (text === "") {
        setErrorWarning(label + " must not be empty!");
      } else {
        setErrorWarning("");
      }
    }
    if (text.length > maxlength) {
      error = true;
      setErrorWarning(
        "Text length must be less than " + maxlength + " characters"
      );
    }
    setValue(componentValue);
  };

  const handleOnBlur = (event) => {
    handleValidate(event.target.value);
  };

  const handleOnChange = (event) => {
    setComponentValue(event.target.value);
  };

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
        onBlur={handleOnBlur}
        value={componentValue}
        onChange={handleOnChange}
      />
      <br />
      {errorWarning !== "" && (
        <span className={style.warning}>{errorWarning}</span>
      )}
    </div>
  );
};
TextInput.defaultProps = {
  maxlength: 100,
};
export default TextInput;
