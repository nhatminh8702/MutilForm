import React, { useEffect } from "react";
import style from "./FormTitleSelector.module.scss";
import Selector from "../Selector/Selector";
import trashIcon from "@/assets/Trash.svg";
const FormTitle = ({
  value,
  setValue,
  placeHolder,
  selectData,
  handleClickDelete,
}) => {
  const handleClickDeleteForm = () => {
    handleClickDelete();
  };
  return (
    <div className={style.container}>
      <div className={style.warper}>
        <div className={style.selector}>
          <Selector
            value={value}
            setValue={(data) => setValue(data)}
            placeHolder={placeHolder}
            selectData={selectData}
          />
        </div>
        <img src={trashIcon} alt="" onClick={handleClickDeleteForm} />
      </div>
    </div>
  );
};

export default FormTitle;
