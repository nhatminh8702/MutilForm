import React from "react";
import style from "./MultiStepProgressBar.module.scss";
const MultiStepProgressBar = (props) => {
  const { navigationTitles, currentStep } = props;
  const handleActive = (item) => {
    let className = "";
    if (item.completed) {
      className += style.completed;
    }
    if (currentStep == item.id) {
      className += " " + style.isActive;
    }
    return className;
  };
  return (
    <ul className={style.container}>
      {navigationTitles.map((item, index) => (
        <li className={handleActive(item)} key={index}>
          {item.title}
        </li>
      ))}
    </ul>
  );
};

export default MultiStepProgressBar;
