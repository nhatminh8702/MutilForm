import React from "react";
import arrowsIconLeft from "@/assets/circle-arrow-left-solid.svg";
import arrowsIconRight from "@/assets/circle-arrow-right-solid.svg";
import style from "./ArrowIconPagination.module.scss";
const itemPerPage = 3;
const ArrowIconPagination = (props) => {
  const {
    numberOfItem,
    disabled,
    itemPerPage,
    currentSlidePosition,
    setCurrentSlidePosition,
  } = props;

  const handleClickArrowRight = () => {
    if (!disabled) {
      if (currentSlidePosition * itemPerPage + itemPerPage < numberOfItem) {
        setCurrentSlidePosition((c) => c + 1);
      }
    }
  };

  const handleClickArrowLeft = () => {
    if (!disabled) {
      if (currentSlidePosition >= 1) {
        setCurrentSlidePosition((c) => c - 1);
      }
    }
  };
  const renderArrowIcon = () => {
    if (currentSlidePosition === 0) {
      return (
        <img
          className={style.arrowIconRight}
          onClick={handleClickArrowRight}
          src={arrowsIconRight}
          alt=""
        />
      );
    } else if (
      currentSlidePosition * itemPerPage >=
      numberOfItem - itemPerPage
    ) {
      return (
        <img
          className={style.arrowIconLeft}
          onClick={handleClickArrowLeft}
          src={arrowsIconLeft}
          alt=""
        />
      );
    } else {
      return (
        <>
          <img
            className={style.arrowIconLeft}
            onClick={handleClickArrowLeft}
            src={arrowsIconLeft}
            alt=""
          />
          <img
            className={style.arrowIconRight}
            onClick={handleClickArrowRight}
            src={arrowsIconRight}
            alt=""
          />
        </>
      );
    }
  };
  return (
    <>
      {numberOfItem > itemPerPage && (
        <div className={style.icon}>{renderArrowIcon()}</div>
      )}
    </>
  );
};

export default ArrowIconPagination;
