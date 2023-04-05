import React, { useState } from "react";
import style from "./StepNavigationButton.module.scss";
const StepNavigationButton = (props) => {
  const {
    onContinueRenderCondition,
    onTurnBackRenderCondition,
    onSubmitRenderCondition,
    onClickContinue,
    onClickTurnBack,
    oncClickComplete,
  } = props;

  return (
    <div className={style.container}>
      <div className={style.buttonContainer}>
        {onContinueRenderCondition && (
          <div className={style.warper}>
            <div onClick={onClickContinue} className={style.button1}>
              Continue
            </div>
          </div>
        )}
        {onSubmitRenderCondition && (
          <div className={style.warper}>
            <div onClick={oncClickComplete} className={style.button1}>
              Submit
            </div>
          </div>
        )}
        {onTurnBackRenderCondition && (
          <div className={style.warper}>
            <div onClick={onClickTurnBack} className={style.button2}>
              Turn Back
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StepNavigationButton;
