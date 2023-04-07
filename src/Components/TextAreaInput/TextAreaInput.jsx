import React, { useState, useEffect } from "react";
import Label from "../Label/Label";
import style from "./TextAreaInput.module.scss";
import ErrorWarning from "../ErrorWarning/ErrorWarning";
const TextAreaInput = (props) => {
  const {
    label,
    labelDescription,
    required,
    value,
    setValue,
    maxlength,
    errorMessage,
  } = props;
  const [textLength, setTextLength] = useState(0);
  const [errorWarning, setErrorWarning] = useState("");

  const handleOnChange = (event) => {
    handleValidate(event.target.value);
  };

  const handleValidate = (text) => {
    if (text.length === 0) {
      setValue(text);
      setErrorWarning(errorMessage);
      setTextLength(text.length);
    } else if (text.length >= maxlength) {
      setErrorWarning(
        "The paragraph exceeded " + maxlength + " characters limit!"
      );
    } else {
      setValue(text);
      setTextLength(text.length);
      setErrorWarning("");
    }
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
      <textarea
        className={style.input}
        maxLength={maxlength}
        rows={20}
        onChange={handleOnChange}
        value={value}
      ></textarea>
      <br />
      <span>
        {textLength}/{maxlength}
      </span>
      <br />
      <ErrorWarning message={errorWarning} />
    </div>
  );
};

TextAreaInput.defaultProps = {
  maxlength: 1000,
};

export default TextAreaInput;
