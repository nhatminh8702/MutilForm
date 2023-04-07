import React, { useEffect, useState } from "react";
import style from "./FormTitleSelector.module.scss";
import Selector from "../Selector/Selector";
import trashIcon from "@/assets/Trash.svg";
import ErrorWarning from "../ErrorWarning/ErrorWarning";
const FormTitle = ({
  value,
  setValue,
  placeHolder,
  selectData,
  handleClickDelete,
  errorMessage,
}) => {
  const [errorWarning, setErrorWarning] = useState();

  const handleClickDeleteForm = () => {
    handleClickDelete();
  };

  const handleOnSelectItem = (data) => {
    if (data === "") {
      setErrorWarning(errorMessage);
    } else {
      setErrorWarning("");
    }
    setValue(data);
  };

  useEffect(() => {
    setErrorWarning(errorMessage);
  }, [errorMessage]);

  return (
    <div className={style.container}>
      <div className={style.warper}>
        <div className={style.selector}>
          <Selector
            value={value}
            setValue={(data) => handleOnSelectItem(data)}
            placeHolder={placeHolder}
            selectData={selectData}
            errorMessage=""
          />
        </div>
        <img src={trashIcon} alt="" onClick={handleClickDeleteForm} />
      </div>
      <ErrorWarning message={errorWarning} />
    </div>
  );
};

export default FormTitle;
