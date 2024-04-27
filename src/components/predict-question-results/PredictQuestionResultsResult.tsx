import { isEmpty } from "lodash";
import React, { useEffect, useMemo, useState } from "react";

const PredictQuestionResultsResult = ({ state }: { state: any }) => {
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
    return <div className="container mx-2 my-6">No question to predict</div>;
  }

  if (isGenerated && state.error) {
    return (
      <div className="container mx-2 my-6">Error predicting: {state.error}</div>
    );
  }

  return (
    <div className="container mx-2 my-6">
      {/* title */}
      <h1 className="text-base font-semibold leading-7 text-gray-900">
        {state.surveyTitle}
      </h1>
      <div>
        {Object.keys(state.predictions).map((key) => (
          <div key={key}>
            {key}: {state.predictions[key]}%
          </div>
        ))}
        {/* justification */}
        <div className="mt-4">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Justification
          </h2>
          <p>{state.justification}</p>
        </div>
      </div>
    </div>
  );
};

export default PredictQuestionResultsResult;
