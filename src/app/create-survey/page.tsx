"use client";

import React, { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { submitCreateSurvey } from "../actions";
import { isEmpty } from "lodash";
import CreateSurveyForm from "@/components/create-survey/CreateSurveyForm";
import CreateSurveyResult from "@/components/create-survey/CreateSurveyResult";

const initialState = {};

const CreateSurvey = () => {
  const [state, formAction] = useFormState(submitCreateSurvey, initialState);

  return (
    <>
      <form action={formAction}>
        <CreateSurveyForm />
      </form>

      <CreateSurveyResult state={state} />
    </>
  );
};

export default CreateSurvey;
