"use server";
import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import PredictQuestionResultsForm from "@/components/predict-question-results/PredictQuestionResultsForm";

const initialState = {};

const PredictQuestionResults = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <div>
      <PredictQuestionResultsForm />
    </div>
  );
};

export default PredictQuestionResults;
