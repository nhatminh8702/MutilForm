import React, { useEffect, useState } from "react";
import MultiStepProgressBar from "@/Components/MultiStepProgressBar/MultiStepProgressBar";
import style from "./MultiFormViews.module.scss";
import StepNavigationButton from "@/Components/StepNavigationButton/StepNavigationButton";
import FormRender from "@/Components/FormRender/FormRender";
import Button from "@/Components/Button/Button";
import { initFormData, initFormList } from "@/utility/FormData";

const MultiFormViews = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initFormData);
  const [formList, setFormList] = useState(initFormList);
  const [errorMessage, setErrorMessage] = useState("");
  const onContinueRenderCondition = currentStep < formList.length;
  const onTurnBackRenderCondition = currentStep > 1;
  const onSubmitRenderCondition = currentStep === formList.length;

  const handleClickContinue = () => {
    handleValidate();
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

  const oncClickSubmit = () => {
    handleValidate();
    if (formList[currentStep - 1].completed) {
      setErrorMessage("");
      dataToJson();
      console.log(formData);
    } else {
      setErrorMessage(
        "complete all the required form above to continue to the next step"
      );
    }
  };

  const handleOnChangeValue = (formId, id, data, objectName) => {
    setFormData((current) => {
      const clone = JSON.parse(JSON.stringify(current[currentStep]));
      clone.formList
        .find((form) => form.id === formId)
        .data.forEach((item) => {
          if (item.id === id) {
            item[objectName] = data;
          }
        });
      return {
        ...current,
        [currentStep]: clone,
      };
    });
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

  const handleOnChangeFormData = (formId, objectName, data) => {
    setFormData((current) => {
      const clone = JSON.parse(JSON.stringify(current[currentStep]));
      clone.formList.find((item) => item.id === formId)[objectName] = data;
      return {
        ...current,
        [currentStep]: clone,
      };
    });
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
            if (!(date4 <= date1 || date2 <= date3)) {
              compareDate = true;
            }
          }
        });
      }
    });
    return compareDate;
  };

  const handleValidate = () => {
    formData[currentStep].formList.forEach((form) => {
      if (formData[currentStep].multipleForm) {
        if (form.value === "") {
          handleOnChangeFormData(
            form.id,
            "errorMessage",
            form.formTitle + " must not leave empty"
          );
        } else {
          handleOnChangeFormData(form.id, "errorMessage", "");
        }
      }
      form.data.forEach((item) => {
        if (item.required) {
          if (item.value.toString() === "") {
            handleOnChangeValue(
              form.id,
              item.id,
              "This field must not leave empty",
              "errorMessage"
            );
          } else {
            handleOnChangeValue(form.id, item.id, "", "errorMessage");
          }
        }
      });
    });
  };

  useEffect(() => {
    let complete = true;
    formData[currentStep].formList.forEach((item) => {
      if (formData[currentStep].multipleForm) {
        if (item.value === "") {
          complete = false;
        }
      }
      item.data.forEach((item1) => {
        if (item1.required) {
          if (item1.value === "") {
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

  useEffect(() => {
    const element = document.querySelector("div[class^='_errorMessage']");  
    if (element !== null) {
      window.scrollTo({ top: element.offsetTop - 100, behavior: "smooth" });
    }
  });

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
          handleOnChangeFormTitle={handleOnChangeFormData}
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
        oncClickComplete={oncClickSubmit}
      />
    </div>
  );
};

export default MultiFormViews;
