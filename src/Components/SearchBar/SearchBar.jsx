import React, { useEffect, useRef, useState } from "react";
import Label from "../Label/Label";
import style from "./SearchBar.module.scss";
import searchIcon from "@/assets/Combined_Shape.svg";
import xIcon from "@/assets/X.svg";
import { removeAscent } from "@/utility/RemoveAscent";
import ErrorWarning from "../ErrorWarning/ErrorWarning";
const SearchBar = (props) => {
  const {
    label,
    labelDescription,
    required,
    value,
    setValue,
    searchData,
    errorMessage,
  } = props;
  const [selectedList, setSelectedList] = useState(value);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [dropDown, setDropDown] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [errorWarning, setErrorWarning] = useState("");
  const searchBarRef = useRef(null);
  const dropDownRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", toggleDropDown);
    if (searchValue === "") {
      setDropDown(searchData);
    }
    return () => document.removeEventListener("click", toggleDropDown);
  }, []);

  const toggleDropDown = (event) => {
    if (event !== null) {
      setIsDropDownOpen(
        event.target && searchBarRef.current.contains(event.target)
      );
      try {
        if (dropDownRef.current.contains(event.target)) {
          setIsDropDownOpen(true);
        }
      } catch (error) {}
    }
  };

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
    setDropDown(
      searchData.filter((item) =>
        removeAscent(item.name).includes(removeAscent(event.target.value))
      )
    );
  };

  const handleAddSelected = (selectedItem) => {
    setErrorWarning("");
    const index = selectedList.findIndex((city) => city.id === selectedItem.id);
    if (index === -1) {
      var clone = JSON.parse(JSON.stringify(selectedList));
      clone.push(selectedItem);
      setSelectedList(clone);
      setValue(clone);
    }
  };

  const handleDeleteSelected = (selectedItem) => {
    if (selectedList.filter((item) => item !== selectedItem).length === 0)
      setErrorWarning(errorMessage);
    setSelectedList(selectedList.filter((item) => item !== selectedItem));
    setValue(selectedList.filter((item) => item !== selectedItem));
  };

  useEffect(() => {
    setErrorWarning(errorMessage);
  }, [errorMessage]);

  return (
    <div className={style.container}>
      <Label label={label} required={required} description={labelDescription} />
      <div className={style.searchBar} ref={searchBarRef}>
        <img className={style.icon} src={searchIcon} alt="" />
        {selectedList.map((item) => (
          <div key={item.id} className={style.selectedBox}>
            <p>{item.name}</p>
            <img
              className={style.deleteIcon}
              src={xIcon}
              onClick={() => handleDeleteSelected(item)}
              alt=""
            />
          </div>
        ))}
        <input type="text" value={searchValue} onChange={handleSearch} />
      </div>
      {isDropDownOpen && (
        <div id=" " className={style.searchList} ref={dropDownRef}>
          {dropDown.map((item) => (
            <div
              key={item.id}
              className={[
                selectedList.findIndex((city) => city.id === item.id) !== -1
                  ? style.active
                  : "",
              ]}
              onClick={() => handleAddSelected(item)}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
      <ErrorWarning message={errorWarning} />
    </div>
  );
};

export default SearchBar;
