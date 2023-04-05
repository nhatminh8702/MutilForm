import React, { useState } from "react";
import style from "./DragDropZone.module.scss";
import uploadIcon from "@/assets/upload 1.svg";
import { bytesFormat } from "@/utility/bytesFormat";
const DragDropZone = (props) => {
  const inputRef = React.useRef(null);
  const { onChange, maxSize } = props;
  const [error, setError] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    onChange(e.dataTransfer.files);
    setError(false);
  };

  const handleChange = (e) => {
    const fileList = Array.from(e.target.files);
    if (e.target.files) {
      const isErrorMaxSize = fileList.some((file) => file.size > maxSize);
      if (!isErrorMaxSize) {
        onChange(e.target.files);
      }
      setError(isErrorMaxSize);
    }
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  return (
    <>
      <div
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => handleDragOver(e)}
        className={
          error ? style.error + " " + style.formContainer : style.formContainer
        }
      >
        <form>
          <input
            ref={inputRef}
            type="file"
            multiple={true}
            onChange={handleChange}
          />
          <img src={uploadIcon} alt="" />
          <h3>Drag and drop files</h3>
          <p className={style.link} onClick={handleClick}>
            Browse file
          </p>
        </form>
      </div>
      {error && (
        <p className={style.errorMessage}>
          The maximum file size is {bytesFormat(maxSize)}
        </p>
      )}
    </>
  );
};

export default DragDropZone;
