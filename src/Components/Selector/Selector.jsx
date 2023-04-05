import React, { useState, useEffect, useRef } from "react";
import style from "./Selector.module.scss";
import dropDownIcon from "@/assets/CaretDown.svg";
import Label from "../Label/Label";
import xIcon from "@/assets/X.svg";
const Selector = (props) => {
  const { label, required, placeHolder, value, setValue, selectData } = props;
  const [selectValue, setSelectValue] = useState("Select " + placeHolder);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const selectorRef = useRef(null);

  useEffect(() => {
    if (value !== "") {
      setSelectValue(value);
    }
  }, [value]);

  useEffect(() => {
    document.addEventListener("click", toggleDropDown);
    return () => document.removeEventListener("click", toggleDropDown);
  }, []);

  const toggleDropDown = (event) => {
    if (event.target && selectorRef.current.contains(event.target)) {
      setIsFocus(true);
      setIsDropDownOpen((current) => !current);
    } else {
      setIsDropDownOpen(false);
    }
  };

  const handleOnClickDelete = () => {
    setSelectValue("Select " + placeHolder);
    setValue("");
  };

  const handleSelectItem = (item) => {
    setErrorMessage("");
    setSelectValue(item);
    setValue(item);
  };

  const handleOnBlur = () => {
    console.log("1");
    if (required) {
      if (item === "Select " + placeHolder) {
        setErrorMessage("This selection must not leave blank");
      }
    }
  };

  return (
    <div className={style.container}>
      <Label label={label} required={required} />
      <div
        className={style.selectContainer}
        ref={selectorRef}
        onBlur={handleOnBlur}
      >
        <div className={style.display}>
          <div
            className={
              selectValue !== "Select " + placeHolder
                ? style.selectValue
                : style.defaultValue
            }
          >
            {selectValue}
          </div>
          {selectValue !== "Select " + placeHolder && (
            <img
              className={style.xIcon}
              src={xIcon}
              onClick={handleOnClickDelete}
            />
          )}
          <img src={dropDownIcon} alt="" />
        </div>
        {isDropDownOpen && (
          <div className={style.selectionWarper}>
            {selectData.map((item, index) => (
              <div
                key={index}
                className={style.item}
                onClick={() => handleSelectItem(item)}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
      {errorMessage !== "" && (
        <div className={style.warning}>{errorMessage}</div>
      )}
    </div>
  );
};

export default Selector;
