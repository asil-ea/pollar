import React from "react";
import { fetchSurveyDetail } from "./actions";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import ExportCsvButton from "@/components/my-surveys/ExportCsvButton";

const SurveyDetail = async ({ params }: { params: { surveyId: string } }) => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  const { surveyTitle, questions, options } = await fetchSurveyDetail(params);

  return (
    <div className="px-2">
      <div className="container mx-auto my-6 p-4 bg-gray-100 rounded-md">
        <div className="flex items-center mb-2">
          <h1 className="text-2xl font-semibold leading-7 text-gray-900 mb-4">
            {surveyTitle}
          </h1>
        </div>
        <ol className="list-decimal pl-6">
          {questions?.map((question: any, index: number) => (
            <li key={index} className="mb-4">
              <div className="flex items-center">
                <h2 className="text-lg font-medium mb-2">
                  {question.question}
                </h2>
              </div>
              <ul className="flex flex-col md:flex-row md:justify-between">
                {options?.map((item: { option: string; index: number }) => (
                  <li
                    key={item.index}
                    className="flex px-2 py-2 mb-2 bg-gray-200 rounded-md"
                  >
                    {item.option}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
      <ExportCsvButton surveyId={params.surveyId} />
    </div>
  );
};

export default SurveyDetail;
