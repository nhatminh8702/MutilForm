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
}) => {
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    setFileList(value);
  }, [value]);

  const onChange = (file) => {
    const clone = [...fileList, ...file];
    setFileList(clone);
    setValue(clone);
  };
  const onDeleteFile = (file) => {
    setValue(fileList.filter((item) => item.name !== file.name));
  };
  return (
    <div className={style.container}>
      <Label
        label={label}
        labelDescription={labelDescription}
        required={required}
      />
      <DragDropZone onChange={onChange} maxSize={maxSize} />
      <ListFiles fileList={fileList} onDelete={onDeleteFile} />
    </div>
  );
};

export default DropDownFile;
