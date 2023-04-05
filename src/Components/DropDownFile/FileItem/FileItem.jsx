import React from "react";
import wordFileIcon from "@/assets/word.svg";
import pdfFileIcon from "@/assets/pdf.svg";
import excelFileIcon from "@/assets/excel.svg";
import defaultFileIcon from "@/assets/defaultFile.svg";
import deleteFileIcon from "@/assets/close-circle.svg";
import { bytesFormat } from "@/utility/bytesFormat";
import style from "./FileItem.module.scss";
const FileItem = (props) => {
  const { contentType, name, size, onClickDelete, disabled } = props;
  const renderFileIcon = (fileType) => {
    switch (fileType) {
      case "application/pdf":
        return <img className={style.fileIcon} src={pdfFileIcon} alt="" />;
      case "application/docx":
        return <img className={style.fileIcon} src={wordFileIcon} alt="" />;
      case "application/excel":
        return <img className={style.fileIcon} src={excelFileIcon} alt="" />;
      default:
        return <img className={style.fileIcon} src={defaultFileIcon} alt="" />;
    }
  };

  return (
    <div
      className={
        disabled ? style.boxFile + " " + style.disabled : style.boxFile
      }
    >
      {renderFileIcon(contentType)}
      <div className={style.fileContent}>
        <span className={style.fileTitle}>{name}</span>
        <span id="file-size ">{bytesFormat(size)}</span>
      </div>
      <img
        className={style.fileDeleteIcon}
        onClick={onClickDelete}
        src={deleteFileIcon}
        alt=""
      />
    </div>
  );
};

export default FileItem;
