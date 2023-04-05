import React, { useEffect, useState } from "react";
import MultiStepProgressBar from "@/Components/MultiStepProgressBar/MultiStepProgressBar";
import style from "./MultiFormViews.module.scss";
import StepNavigationButton from "@/Components/StepNavigationButton/StepNavigationButton";
import FormRender from "@/Components/FormRender/FormRender";
import Button from "@/Components/Button/Button";

const initFormList = [
  {
    id: 1,
    title: "Personal information",
    completed: false,
  },
  {
    id: 2,
    title: "Work Experience",
    completed: false,
  },
  {
    id: 3,
    title: "About the company",
    completed: false,
  },
];

const initFormData = {
  1: {
    multipleForm: false,
    formList: [
      {
        id: 1,
        formTitle: "",
        value: "",
        data: [
          {
            id: 1,
            view: "input-text",
            required: true,
            value: "",
            label: "Full Name",
            labelDescription: "",
            maxlength: 100,
          },
          {
            id: 2,
            view: "input-date",
            required: true,
            value: "",
            label: "Date of birth",
            labelDescription: "",
          },
          {
            id: 3,
            view: "input-selector",
            required: true,
            value: "",
            label: "City",
            labelDescription: "",
            selectData: [
              "HaNoi",
              "ThanhHoa",
              "NgheAn",
              "HungYen",
              "NgheAn",
              "NgheAn",
              "NgheAn",
              "NgheAn",
              "NgheAn",
              "NgheAn",
            ],
          },
          {
            id: 4,
            view: "input-searchBar",
            required: false,
            value: [],
            label: "Positions",
            labelDescription: "You can select multiple position",
            searchData: [
              { id: 1, name: "fontEnd developer" },
              { id: 2, name: "backend developer" },
              { id: 3, name: "business analyst" },
              { id: 4, name: "project manager" },
              { id: 5, name: "devOp" },
              { id: 6, name: "marketing" },
            ],
          },
          {
            id: 5,
            view: "input-textarea",
            required: false,
            value: "",
            label: "Description",
            labelDescription: "",
            maxlength: 1000,
          },
          {
            id: 6,
            view: "input-dropDownFile",
            required: false,
            value: [],
            label: "Avatar",
            labelDescription: "",
            maxSize: 10485760,
          },
        ],
      },
    ],
  },
  2: {
    multipleForm: true,
    formList: [
      {
        id: 1,
        formTitle: "company",
        value: "",
        data: [
          {
            id: 1,
            view: "input-text",
            required: true,
            value: "",
            label: "previous position",
            labelDescription: "",
          },
          {
            id: 2,
            view: "input-fromToDatePicker",
            required: true,
            value: "",
            label: "work-time",
            labelDescription: "",
          },
          {
            id: 3,
            view: "input-textarea",
            required: false,
            value: "",
            label: "Work description",
            labelDescription: "",
            maxlength: 5000,
          },
        ],
      },
    ],
  },
  3: {
    multipleForm: false,
    formList: [
      {
        id: 1,
        formTitle: "",
        value: "",
        data: [
          {
            id: 1,
            view: "input-textarea",
            required: true,
            value: "",
            label: "Why do you want to work here",
            maxlength: 1000,
          },
          {
            id: 2,
            view: "input-number",
            required: true,
            value: "",
            label: "desired salary",
            maxlength: 10,
            currency: "VND",
          },
        ],
      },
    ],
  },
};

const MultiFormViews = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initFormData);
  const [formList, setFormList] = useState(initFormList);
  const [errorMessage, setErrorMessage] = useState("");
  const onContinueRenderCondition = currentStep < formList.length;
  const onTurnBackRenderCondition = currentStep > 1;
  const onSubmitRenderCondition = currentStep === formList.length;

  useEffect(() => {
    let complete = true;
    formData[currentStep].formList.forEach((item) => {
      item.data.forEach((item1) => {
        if (item1.required) {
          if (item1.value == "") {
            complete = false;
          } else if (item1.value.toString() === "") {
            complete = false;
          }
        }
      });
    });
    let clone = JSON.parse(JSON.stringify(formList));
    clone.find((item) => item.id === currentStep).completed = complete;
    setFormList(clone);
  }, [formData]);

  const handleClickContinue = () => {
    if (formList[currentStep - 1].completed) {
      setErrorMessage("");
      setCurrentStep((c) => c + 1);
    } else {
      setErrorMessage(
        "complete all the required form above to continue to the next step"
      );
    }
  };

  const handleClickTurnBack = () => {
    setCurrentStep((c) => c - 1);
  };

  const oncClickSubmit = () => {};

  const handleOnChangeValue = (key, id, data, objectName) => {
    const clone = JSON.parse(JSON.stringify(formData[currentStep]));
    clone.formList
      .find((item) => item.id === key)
      .data.forEach((item2) => {
        if (item2.id === id) {
          item2[objectName] = data;
        }
      });
    setFormData((current) => ({ ...current, [currentStep]: clone }));
  };

  const deleteForm = (id) => {
    const index = formData[currentStep].formList.findIndex(
      (item) => item.id === id
    );
    if (formData[currentStep].formList.length > 1) {
      setFormData((current) => {
        let clone = JSON.parse(JSON.stringify(formData[currentStep]));
        clone.formList.splice(index, 1);
        return {
          ...current,
          [currentStep]: clone,
        };
      });
    }
  };

  const addForm = () => {
    setFormData((current) => {
      const clone = JSON.parse(JSON.stringify(formData[currentStep]));
      console.log(clone);
      clone.formList.push({
        id: formData[currentStep].formList.length + 1,
        formTitle: "company",
        value: "",
        data: [
          {
            id: 1,
            view: "input-text",
            required: true,
            value: "",
            label: "previous position",
            labelDescription: "",
          },
          {
            id: 2,
            view: "input-fromToDatePicker",
            required: true,
            value: "",
            label: "work-time",
            labelDescription: "",
          },
          {
            id: 3,
            view: "input-textarea",
            required: false,
            value: "",
            label: "Work description",
            labelDescription: "",
            maxlength: 5000,
          },
        ],
      });
      return {
        ...current,
        [currentStep]: clone,
      };
    });
  };

  const handleOnChangeFormTitle = (id, data) => {
    const clone = JSON.parse(JSON.stringify(formData[currentStep]));
    clone.formList.find((item) => item.id === id).value = data;
    setFormData((current) => ({ ...current, [currentStep]: clone }));
  };

  const compareFormToDate = (id, fromDate, toDate) => {
    let compareDate = false;
    formData[currentStep].formList.some((item) => {
      if (item.id !== id) {
        item.data.forEach((item) => {
          if (item.view === "input-fromToDatePicker") {
            const dateArray2 = item.value.split(" ");
            const date1 = new Date(dateArray2[0]);
            const date2 = new Date(dateArray2[1]);
            const date3 = new Date(fromDate);
            const date4 = new Date(toDate);
            if (date1 <= date3 <= date2 || date1 <= date4 <= date2) {
              console.log(1);
              compareDate = true;
            }
          }
        });
      }
    });
    return compareDate;
  };

  return (
    <div className={style.container}>
      <h3>Employment Form</h3>
      <MultiStepProgressBar
        navigationTitles={formList}
        currentStep={currentStep}
      />
      {formData[currentStep].formList.map((item) => (
        <FormRender
          key={item.id}
          formData={item}
          handleOnChangeValue={(id, data, objectName) =>
            handleOnChangeValue(item.id, id, data, objectName)
          }
          handleOnChangeFormTitle={handleOnChangeFormTitle}
          handleClickDeleteForm={deleteForm}
          compareFormToDate={compareFormToDate}
        />
      ))}
      {errorMessage !== "" && (
        <p className={style.errorMessage}>{errorMessage}</p>
      )}
      {formData[currentStep].multipleForm && (
        <Button label="+ add company" onClick={addForm} />
      )}
      <StepNavigationButton
        onContinueRenderCondition={onContinueRenderCondition}
        onTurnBackRenderCondition={onTurnBackRenderCondition}
        onSubmitRenderCondition={onSubmitRenderCondition}
        onClickContinue={handleClickContinue}
        onClickTurnBack={handleClickTurnBack}
        oncClickSubmit={oncClickSubmit}
      />
    </div>
  );
};

export default MultiFormViews;
