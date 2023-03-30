import React, { useEffect, useState } from "react";
import DatePicker from "@/Components/DatePicker/DatePicker";
import TextInput from "../../../Components/TextInput/TextInput";
import TextAreaInput from "../../../Components/TextAreaInput/TextAreaInput";
import style from "./PersonalInformationForm.module.scss";
const PersonalInformationForm = (props) => {
  const { handleOncCompleteForm, personalInformation, onChange } = props;

  useEffect(() => {
    handleOncCompleteForm(true);
    // if (
    //   personalInformation.fullName !== "" &&
    //   personalInformation.dateOfBirth !== "" &&
    //   personalInformation.Description !== ""
    // ) {
    //   handleOncCompleteForm(true);
    // }
  }, [personalInformation]);

  return (
    <div className={style.container}>
      <TextInput
        label="Full name"
        required={true}
        text={personalInformation.fullName}
        setText={(data) => onChange("fullName", data)}
        maxlength={100}
      />
      <DatePicker
        label="Date of birth"
        required={true}
        setDate={(data) => onChange("dateOfBirth", data)}
      />
      <TextAreaInput
        label="Personal descriptions"
        required={false}
        setText={(data) => onChange("description", data)}
        maxlength={1000}
      />
    </div>
  );
};

export default PersonalInformationForm;
