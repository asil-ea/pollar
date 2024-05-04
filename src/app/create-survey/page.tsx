import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import CreateSurveyForm from "@/components/create-survey/CreateSurveyForm";

const CreateSurvey = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <>
      <CreateSurveyForm />
    </>
  );
};

export default CreateSurvey;
