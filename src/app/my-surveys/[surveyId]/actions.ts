"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const fetchSurveyDetail = async (params: { surveyId: string | null }) => {
  const supabase = createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  const { data: surveyDetailData, error: surveyDetailError } = await supabase
    .from("surveys")
    .select("survey_title, survey_options")
    .eq("id", params.surveyId);

  const { data: questionsData, error: questionsError } = await supabase
    .from("questions")
    .select("question, index")
    .eq("survey_id", params.surveyId);

  if (!surveyDetailData || !questionsData) {
    return {
      surveyTitle: "",
      questions: [],
      options: [],
    };
  }

  const orderedQuestions = questionsData?.sort(
    (a: any, b: any) => a.index - b.index
  );
  const orderedOptions = JSON.parse(surveyDetailData[0]?.survey_options).sort(
    (a: any, b: any) => a.index - b.index
  );

  return {
    surveyTitle: surveyDetailData[0]?.survey_title,
    questions: orderedQuestions,
    options: orderedOptions,
  };
};

export const handleExportCsv = async (
  surveyTitle: string,
  questions: { question: string; index: number }[]
) => {
  let csvFormat = `data:text/csv;charset=utf-8,${surveyTitle},\r\n`
  const questionsFormat = questions.map((question) => {
    return question.question;
  }).join(",\r\n");
  csvFormat += questionsFormat;
  console.log(csvFormat);
};
