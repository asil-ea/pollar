import React, { useEffect, useMemo, useState } from "react";
import { isEmpty } from "lodash";
import { handleSaveSurvey } from "@/app/actions";
import { useTranslations } from "next-intl";

const CreateSurveyResult = ({ state }: { state: any }) => {
  const [isGenerated, setIsGenerated] = useState(false);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const t = useTranslations("CreateSR");

  const possibleOptions = useMemo(() => {
    if (!state.options) {
      return [];
    }
    return state.options;
  }, [state]);

  const surveyPayload: {
    surveyTitle: string;
    questions: any[];
    options: string[];
  } = {
    surveyTitle: state.surveyTitle,
    questions: [],
    options: [],
  };
  const selectedQuestions: any[] = [];

  useEffect(() => {
    if (isEmpty(state)) {
      setIsGenerated(false);
    } else {
      setIsGenerated(true);
    }
  }, [state]);

  const handleCheckboxChecked = (e: any) => {
    if (errorMessage) setErrorMessage("");
    if (e.target.checked) {
      selectedQuestions.push({
        title: e.target.value,
        index: e.target.id,
      });
    } else {
      const index = selectedQuestions.findIndex(
        (i) => i.title === e.target.value
      );
      selectedQuestions.splice(index, 1);
    }
  };

  const handleSubmit = async () => {
    setSaveButtonDisabled(true);
    surveyPayload["questions"] = selectedQuestions;
    surveyPayload["options"] = possibleOptions;

    if (isEmpty(surveyPayload.questions)) {
      setErrorMessage("Please select at least one question to save the survey");
      setSaveButtonDisabled(false);
      return;
    }
    await handleSaveSurvey(surveyPayload);
    setSaveButtonDisabled(false);
  };

  if (!isGenerated) {
    return <div className="container px-4 my-6">{t("csr")}</div>;
  }

  if (isGenerated && state.error) {
    return (
      <div className="container px-4 my-6">
        {t("csr2")}: {state.error}
      </div>
    );
  }

  return (
    <div className="px-2">
      <div className="container mx-auto my-6 p-4 bg-gray-100 rounded-md">
        <div className="flex items-center mb-2">
          <h1 className="text-2xl font-semibold leading-7 text-gray-900 mb-4">
            {state.surveyTitle}
          </h1>
        </div>
        <p>{t("csr3")}</p>
        <ol className="list-decimal pl-6">
          {state.questions.map((question: any, index: number) => (
            <li key={index} className="mb-4">
              <div className="flex items-center">
                <h2 className="text-lg font-medium">
                  <input
                    className="mr-1 mb-0.5"
                    type="checkbox"
                    id={`${index}`}
                    onChange={handleCheckboxChecked}
                    value={question.title}
                  />
                  {question.title}
                </h2>
              </div>
              <ul className="flex flex-col md:flex-row md:justify-between">
                {possibleOptions.map((option: string, index: number) => (
                  <li
                    key={index}
                    className="flex px-2 py-2 mb-2 bg-gray-200 rounded-md"
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        <div className="grid">
          <button
            onClick={handleSubmit}
            disabled={saveButtonDisabled}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-900 disabled:shadow-none disabled:hover:bg-gray-300 disabled:focus-visible:outline-gray-300 disabled:focus-visible:outline-offset-0 disabled:focus-visible:outline-none"
          >
            {t("csr4")}
          </button>
          {errorMessage && (
            <span className="text-red-500 text-sm">{errorMessage}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateSurveyResult;
