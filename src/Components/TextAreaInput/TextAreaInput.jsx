import React, { useState } from "react";
import style from "./TextAreaInput.module.scss";
const TextAreaInput = (props) => {
  const { label, required, setText, maxlength } = props;
  const [textLength, setTextLength] = useState(0);
  const [errorWarning, setErrorWarning] = useState("");

  const handleOnChange = (event) => {
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
    let error = false;
    if (required) {
      if (text === "") {
        setErrorWarning("The paragraph must not leave empty");
      }
    }
    if (!error) {
      setText(text);
    }
  };

  return (
    <div className={style.container}>
      <p className={style.label}>
        {required && <span>Must</span>}
        {label}
      </p>
      <textarea
        className={style.input}
        maxLength={maxlength}
        rows={20}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
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
