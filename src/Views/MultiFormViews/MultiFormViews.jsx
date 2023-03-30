import React, { useEffect, useState } from "react";
import MultiStepProgressBar from "@/Components/MultiStepProgressBar/MultiStepProgressBar";
import PersonalInformationForm from "./PersonalInformationForm/PersonalInformationForm";
import style from "./MultiFormViews.module.scss";
import NavigationButton from "@/Components/NavigationButton/NavigationButton";
import WorkExperienceForm from "./WorkExperienceForm/WorkExperienceForm";

const initStepData = {
  1: [
    {
      id: 1,
      view: "input-text",
      required: true,
      value: "",
      label: "Full Name",
    },
    {},
  ],
};

const steps = [
  {
    id: 1,
    step: 1,
    title: "Personal Information",
  },
];

const MultiFormViews = () => {
  const [activeStep, setActiveStep] = useState(1);

  const [personalInformation, setPersonalInformation] = useState({
    fullName: "",
    dateOfBirth: "",
    description: "",
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [stepData, setStepData] = useState(initStepData);

  const handleChangePage = () => {
    return formList[currentPage].component;
  };

  const handleClickContinue = () => {
    return formList[currentPage].completed && currentPage < formList.length - 1
  }

  const handleClickTurnBack = () => {
    return 
  }

  const handlePersonalInformation = (key, data) => {
    const newStepData = {
      ...stepData,
    };
    newStepData[activeStep][key] = data;
    setStepData(newStepData);
  };

  const handleOncCompleteForm = (stateOfComplete) => { };

  const formList = [
    {
      title: "Personal information",
      completed: false,
    },
    {
      title: "Work Experience",
      completed: false,
    },
    {
      title: "About the company",
      completed: false
    },
  ];

  return (
    <div className={style.container}>
      <h3>Employment Form</h3>
      <MultiStepProgressBar
        navigationTitles={formList}
        currentPage={currentPage}
      //onStepChange={handle}
      />
      {currentPage === 1 && <PersonalInformationForm />}

      {handleChangePage()}
      <NavigationButton
        onClickContinue={handleClickContinue}
        onClickTurnBack={ }
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        PageLength={formList.length}
        isFormCompleted={formList[currentPage].completed}
        Message="complete the form above to continue"
      />
    </div>
  );
};

export default MultiFormViews;
