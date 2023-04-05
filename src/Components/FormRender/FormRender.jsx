import React, { useEffect } from "react";
import DatePicker from "../DatePicker/DatePicker";
import Selector from "../Selector/Selector";
import TextAreaInput from "../TextAreaInput/TextAreaInput";
import TextInput from "../TextInput/TextInput";
import style from "./FormRender.module.scss";
import SearchBar from "../SearchBar/SearchBar";
import DropDownFile from "../DropDownFile/DropDownFile";
import NumberInput from "../NumberInput/NumberInput";
import FormTitle from "../FormTitleSelector/FormTitleSelector";
import FromToDatePicker from "../FromToDatePicker/FromToDatePicker";
const FormRender = (props) => {
  const {
    formData,
    handleOnChangeValue,
    handleOnChangeFormTitle,
    handleClickDeleteForm,
    compareFormToDate,
  } = props;

  const handleRenderForm = formData.data.map((item) => {
    switch (item.view) {
      case "input-text":
        return (
          <TextInput
            key={item.id}
            label={item.label}
            labelDescription={item.labelDescription}
            required={item.required}
            value={item.value}
            setValue={(data) => handleOnChangeValue(item.id, data, "value")}
            maxlength={item.maxlength}
          />
        );
      case "input-date":
        return (
          <DatePicker
            key={item.id}
            label={item.label}
            labelDescription={item.labelDescription}
            required={item.required}
            value={item.value}
            setValue={(data) => handleOnChangeValue(item.id, data, "value")}
          />
        );
      case "input-textarea":
        return (
          <TextAreaInput
            key={item.id}
            label={item.label}
            labelDescription={item.labelDescription}
            required={item.required}
            value={item.value}
            setValue={(data) => handleOnChangeValue(item.id, data, "value")}
            maxlength={item.maxlength}
          />
        );
      case "input-selector":
        return (
          <Selector
            key={item.id}
            label={item.label}
            labelDescription={item.labelDescription}
            required={item.required}
            placeHolder={item.label}
            value={item.value}
            setValue={(data) => handleOnChangeValue(item.id, data, "value")}
            selectData={item.selectData}
          />
        );
      case "input-searchBar":
        return (
          <SearchBar
            key={item.id}
            label={item.label}
            labelDescription={item.labelDescription}
            required={item.required}
            value={item.value}
            setValue={(data) => handleOnChangeValue(item.id, data, "value")}
            searchData={item.searchData}
          />
        );
      case "input-dropDownFile":
        return (
          <DropDownFile
            key={item.id}
            label={item.label}
            labelDescription={item.labelDescription}
            required={item.required}
            value={item.value}
            setValue={(data) => handleOnChangeValue(item.id, data, "value")}
            maxSize={item.maxSize}
          />
        );
      case "input-number":
        return (
          <NumberInput
            key={item.id}
            label={item.label}
            labelDescription={item.labelDescription}
            required={item.required}
            value={item.value}
            setValue={(data) => handleOnChangeValue(item.id, data, "value")}
            maxlength={item.maxlength}
            currency={item.currency}
          />
        );
      case "input-fromToDatePicker":
        return (
          <FromToDatePicker
            key={item.id}
            label={item.label}
            labelDescription={item.labelDescription}
            required={item.required}
            value={item.value}
            setValue={(data) => handleOnChangeValue(item.id, data, "value")}
            compareFormToDate={(fromDate, toDate) =>
              compareFormToDate(formData.id, fromDate, toDate)
            }
          />
        );
    }
  });

  return (
    <>
      <div className={style.container}>
        {formData.formTitle !== "" && (
          <FormTitle
            value={formData.value}
            setValue={(data) => handleOnChangeFormTitle(formData.id, data)}
            placeHolder={formData.formTitle}
            selectData={["MOR Software jsc", "fpt", "viettel"]}
            handleClickDelete={() => handleClickDeleteForm(formData.id)}
          />
        )}
        {handleRenderForm}
      </div>
    </>
  );
};

export default FormRender;
