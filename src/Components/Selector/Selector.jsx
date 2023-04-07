import React, { useState, useEffect, useRef } from "react";
import style from "./Selector.module.scss";
import dropDownIcon from "@/assets/CaretDown.svg";
import Label from "../Label/Label";
import xIcon from "@/assets/X.svg";
import ErrorWarning from "../ErrorWarning/ErrorWarning";
const Selector = (props) => {
  const {
    label,
    required,
    placeHolder,
    value,
    setValue,
    selectData,
    errorMessage,
  } = props;
  const [selectValue, setSelectValue] = useState("Select " + placeHolder);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [errorWarning, setErrorWarning] = useState("");
  const selectorRef = useRef(null);

  const toggleDropDown = (event) => {
    if (event.target && selectorRef.current.contains(event.target)) {
      setIsDropDownOpen((current) => !current);
    } else {
      setIsDropDownOpen(false);
    }
  };

  const handleOnClickDelete = () => {
    setSelectValue("Select " + placeHolder);
    setValue("");
    if (errorMessage !== "") setErrorWarning(errorMessage);
  };

  const handleSelectItem = (item) => {
    setErrorWarning("");
    setSelectValue(item);
    setValue(item);
  };

  useEffect(() => {
    if (value !== "") {
      setSelectValue(value);
    }
  }, [value]);

  useEffect(() => {
    document.addEventListener("click", toggleDropDown);
    return () => document.removeEventListener("click", toggleDropDown);
  }, []);

  useEffect(() => {
    setErrorWarning(errorMessage);
  }, [errorMessage]);

  return (
    <div className={style.container}>
      <Label label={label} required={required} />
      <div className={style.selectContainer} ref={selectorRef}>
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
      <ErrorWarning message={errorWarning}/>
    </div>
  );
};

export default Selector;
