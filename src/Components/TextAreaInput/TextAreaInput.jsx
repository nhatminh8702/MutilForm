import React, { useState, useEffect } from "react";
import Label from "../Label/Label";
import style from "./TextAreaInput.module.scss";
const TextAreaInput = (props) => {
  const { label, labelDescription, required, value, setValue, maxlength } =
    props;
  const [textLength, setTextLength] = useState(0);
  const [errorWarning, setErrorWarning] = useState("");
  const [componentValue, setComponentValue] = useState("");
  useEffect(() => {
    setComponentValue(value);
  }, [value]);

  const handleOnChange = (event) => {
    setComponentValue(event.target.value);
    handleTextLength(event.target.value.length);
  };

  const handleOnBlur = (event) => {
    handleValidate(event.target.value);
  };

  const handleTextLength = (textLength) => {
    setTextLength(textLength);
    if (textLength >= maxlength)
      setErrorWarning(
        "The paragraph exceeded " + maxlength + " characters limit!"
      );
  };

  const handleValidate = (text) => {
    if (required) {
      if (text === "") {
        setErrorWarning("The paragraph must not leave empty");
      }
    }
    setValue(text);
  };

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
        onBlur={handleOnBlur}
        value={componentValue}
      ></textarea>
      <br />
      <span>
        {textLength}/{maxlength}
      </span>
      <br />
      {errorWarning !== "" && (
        <span className={style.warning}>{errorWarning}</span>
      )}
    </div>
  );
};

TextAreaInput.defaultProps = {
  maxlength: 1000,
};

export default TextAreaInput;
