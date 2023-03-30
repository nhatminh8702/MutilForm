import React, { useEffect, useState } from "react";
import style from "./TextInput.module.scss";
const TextInput = (props) => {
  const { label, required, text, setText, maxlength } = props;
  TextInput.propTypes = {};
  const [errorWarning, setErrorWarning] = useState("");
  const [cloneText, setCloneText] = useState("");

  useEffect(() => {
    setCloneText(text);
  }, [text]);

  const handleValidate = (text) => {
    let error = false;
    if (required) {
      if (text === "") {
        error = true;
        setErrorWarning(label + " must not be empty!");
      }
    }
    if (text.length > maxlength) {
      error = true;
      setErrorWarning(
        "Text length must be less than " + maxlength + " characters"
      );
    }
    if (!error) {
      setText(cloneText);
    }
  };

  const handleOnBlur = (event) => {
    handleValidate(event.target.value);
  };

  const handleOnChange = (event) => {
    setCloneText(event.target.value);
  };

  return (
    <div className={style.container}>
      <p className={style.label}>
        {required && <span className={style.required}>Must</span>}
        {label}
      </p>
      <input
        className={style.input}
        type="text"
        onBlur={handleOnBlur}
        value={cloneText}
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
