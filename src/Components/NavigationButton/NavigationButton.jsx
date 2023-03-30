import React, { useState } from "react";
import style from "./NavigationButton.module.scss";
const NavigationButton = (props) => {
  const { currentPage, PageLength, setCurrentPage, isFormCompleted, Message } =
    props;
  const [errorMessage, setErrorMessage] = useState("");
  const handleClickIncrement = () => {
    if (isFormCompleted) {
      setErrorMessage("");
      if (currentPage < PageLength) {
        setCurrentPage((c) => c + 1);
      }
    } else {
      setErrorMessage(Message);
    }
  };

  const handleClickDecrement = () => {
    if (currentPage > 0) {
      setCurrentPage((c) => c - 1);
    }
  };

  return (
    <div className={style.container}>
      {errorMessage !== "" && (
        <p className={style.errorMessage}>{errorMessage}</p>
      )}
      <div className={style.buttonContainer}>
        {currentPage < PageLength - 1 && (
          <div className={style.warper}>
            <div onClick={handleClickIncrement} className={style.button1}>
              Continue
            </div>
          </div>
        )}
        {currentPage > 0 && (
          <div className={style.warper}>
            <div onClick={handleClickDecrement} className={style.button2}>
              Turn Back
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavigationButton;
