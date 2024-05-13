import React, { useEffect, useMemo, useState } from "react";
import { isEmpty } from "lodash";
import { handleSaveSurvey } from "@/app/actions";

const CreateSurveyResult = ({ state }: { state: any }) => {
  const [isGenerated, setIsGenerated] = useState(false);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);

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

    await handleSaveSurvey(surveyPayload);
    setSaveButtonDisabled(false);
  };

  if (!isGenerated) {
    return <div className="container mx-4 my-6">No survey generated</div>;
  }

  if (isGenerated && state.error) {
    return (
      <div className="container mx-2 my-6">
        Error generating survey: {state.error}
      </div>
    );
  }

  return (
    <div className="container mx-auto my-6 p-4 bg-gray-100 rounded-md">
      <div className="flex items-center mb-2">
        <h1 className="text-2xl font-semibold leading-7 text-gray-900 mb-4">
          {state.surveyTitle}
        </h1>
      </div>
      <p>Select all the options you would like to add to the Survey.</p>
      <ol className="list-decimal pl-6">
        {state.questions.map((question: any, index: number) => (
          <li key={index} className="mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                id={`${index}`}
                onChange={handleCheckboxChecked}
                value={question.title}
              />
              <h2 className="text-lg font-medium">{question.title}</h2>
            </div>
            <ul className="flex justify-between">
              {possibleOptions.map((option: string, index: number) => (
                <li key={index} className="px-2 py-1 bg-gray-200 rounded-md">
                  {option}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      <button
        onClick={handleSubmit}
        disabled={saveButtonDisabled}
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-900 disabled:shadow-none disabled:hover:bg-gray-300 disabled:focus-visible:outline-gray-300 disabled:focus-visible:outline-offset-0 disabled:focus-visible:outline-none"
      >
        Save Survey
      </button>
    </div>
  );
};

export default CreateSurveyResult;
