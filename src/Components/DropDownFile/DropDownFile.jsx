import React, { useEffect, useState } from "react";
import Label from "../Label/Label";
import DragDropZone from "./DragDropZone/DragDropZone";
import style from "./DropDownFile.module.scss";
import ListFiles from "./ListFiles/ListFiles";
const DropDownFile = ({
  label,
  labelDescription,
  required,
  value,
  setValue,
  maxSize,
  errorMessage,
}) => {
  const [fileList, setFileList] = useState([]);
  const [errorWarning, serErrorWarning] = useState("");

  const onChange = (file) => {
    const clone = [...fileList, ...file];
    serErrorWarning("");
    setFileList(clone);
    setValue(clone);
  };
  
  const onDeleteFile = (file) => {
    setValue(fileList.filter((item) => item.name !== file.name));
    if (fileList.filter((item) => item.name !== file.name).length === 0) {
      serErrorWarning(errorMessage);
    }
  };

  useEffect(() => {
    setFileList(value);
  }, [value]);

  useEffect(() => {
    serErrorWarning(errorMessage);
  }, [errorMessage]);

  return (
    <div className={style.container}>
      <Label
        label={label}
        labelDescription={labelDescription}
        required={required}
      />
      <DragDropZone onChange={onChange} maxSize={maxSize} />
      <ListFiles fileList={fileList} onDelete={onDeleteFile} />
      {errorWarning !== "" && (
        <span className={style.errorMessage}>{errorWarning}</span>
      )}
    </div>
  );
};

export default DropDownFile;
