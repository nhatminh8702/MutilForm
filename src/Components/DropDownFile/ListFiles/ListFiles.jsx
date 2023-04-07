import React, { useEffect, useState } from "react";
import style from "./ListFiles.module.scss";
import FileItem from "../FileItem/FileItem";
import ArrowIconPagination from "../ArrowIconPagination/ArrowIconPagination";
const ListFiles = (props) => {
  const isLoading = false;
  const { fileList, onDelete } = props;
  const itemPerPage = 3;
  const amountOfPixelToSlide = itemPerPage * 33.5;
  const [currentSlidePosition, setCurrentSlidePosition] = useState(0);

  const handleClickDelete = (item) => {
    if (!isLoading) {
      setCurrentSlidePosition(0);
      onDelete(item);
    }
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.wrapContainer}>
          <div
            className={style.boxContainer}
            style={{ right: amountOfPixelToSlide * currentSlidePosition + "%" }}
          >
            {fileList.map((item, index) => (
              // className={
              //   isLoading
              //     ? style.boxContainer + " " + style.disabled
              //     : style.boxContainer
              // }
              // key={index}
              <FileItem
                key={index}
                contentType={item.contentType}
                name={item.name}
                size={item.size}
                onClickDelete={() => handleClickDelete(item)}
                disabled={isLoading}
              />
            ))}
          </div>
        </div>
        <ArrowIconPagination
          numberOfItem={fileList.length}
          disabled={isLoading}
          itemPerPage={itemPerPage}
          currentSlidePosition={currentSlidePosition}
          setCurrentSlidePosition={setCurrentSlidePosition}
        />
      </div>
      {isLoading && <span>loading...</span>}
    </>
  );
};

export default ListFiles;
