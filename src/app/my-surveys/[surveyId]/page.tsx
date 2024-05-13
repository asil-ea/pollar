import React from "react";
import { createClient } from "@/utils/supabase/server";

const SurveyDetail = async ({ params }: { params: { surveyId: string } }) => {
  const fetchSurveyDetail = async () => {
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

  const { surveyTitle, questions, options } = await fetchSurveyDetail();

  return (
    <div className="container mx-auto my-6 p-4 bg-gray-100 rounded-md">
      <div className="flex items-center mb-2">
        <h1 className="text-2xl font-semibold leading-7 text-gray-900 mb-2">
          {surveyTitle}
        </h1>
      </div>
      <p>Select all the options you would like to add to the Survey.</p>
      <ol className="list-decimal pl-6">
        {questions?.map((item: any, index: number) => (
          <li key={index} className="mb-4">
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <h2 className="text-lg font-medium">{item.question}</h2>
            </div>
            <ul className="flex justify-between">
              {options?.map((item: { option: string; index: number }) => (
                <li
                  key={item.index}
                  className="px-2 py-1 bg-gray-200 rounded-md"
                >
                  {item.option}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-900 disabled:shadow-none disabled:hover:bg-gray-300 disabled:focus-visible:outline-gray-300 disabled:focus-visible:outline-offset-0 disabled:focus-visible:outline-none">
        Export CSV
      </button>
    </div>
  );
};

export default SurveyDetail;
