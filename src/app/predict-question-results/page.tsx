"use client";

import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import { submitPredictQuestion } from "../actions";
import PredictQuestionResultsForm from "@/components/predict-question-results/PredictQuestionResultsForm";
import PredictQuestionResultsResult from "@/components/predict-question-results/PredictQuestionResultsResult";

const initialState = {};

const PredictQuestionResults = () => {
  const [state, formAction] = useFormState(submitPredictQuestion, initialState);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div className="container mx-4 my-6">
      <form action={formAction}>
        <PredictQuestionResultsForm />
      </form>
      <PredictQuestionResultsResult state={state} />
    </div>
  );
};

export default PredictQuestionResults;
