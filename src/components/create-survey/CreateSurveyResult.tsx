import { isEmpty } from "lodash";
import React, { useEffect, useMemo, useState } from "react";

const CreateSurveyResult = ({ state }: { state: any }) => {
  const [isGenerated, setIsGenerated] = useState(false);
  const possibleOptions = useMemo(() => {
    if (!state.options) {
      return [];
    }
    return state.options;
  }, [state]);

  useEffect(() => {
    if (isEmpty(state)) {
      setIsGenerated(false);
    } else {
      setIsGenerated(true);
    }
  }, [state]);

  if (!isGenerated) {
    return <div className="container mx-2 my-6">No survey generated</div>;
  }

  if (isGenerated && state.error) {
    return (
      <div className="container mx-2 my-6">
        Error generating survey: {state.error}
      </div>
    );
  }

  return (
    <div className="container mx-2 my-6">
      {/* title */}
      <h1 className="text-base font-semibold leading-7 text-gray-900">
        {state.surveyTitle}
      </h1>
      <ol>
        {state.questions.map((question: any, index: number) => (
          <li key={index} className="mb-4">
            <h2>
              {index + 1}. {question.title}
            </h2>
            <ul className="flex justify-between">
              {possibleOptions.map((option: string, index: number) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default CreateSurveyResult;
