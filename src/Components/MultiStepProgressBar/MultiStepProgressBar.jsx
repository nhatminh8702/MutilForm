import React from "react";
import style from "./MultiStepProgressBar.module.scss";
const MultiStepProgressBar = (props) => {
  const { navigationTitles, currentPage } = props;
  const handleActive = (index) => {
    if (currentPage === index) {
      return style.isActive;
    }
  };
  return (
    <ul className={style.container}>
      {navigationTitles.map((item, index) => (
        <li className={handleActive(index)} key={index}>
          {item.title}
        </li>
      ))}
    </ul>
  );
};

export default MultiStepProgressBar;
