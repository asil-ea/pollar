import { isEmpty } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";

const PredictQuestionResultsResult = ({ state }: { state: any }) => {
  const [isGenerated, setIsGenerated] = useState(false);
  const t = useTranslations("PredictQRR");
  useEffect(() => {
    if (isEmpty(state)) {
      setIsGenerated(false);
    } else {
      setIsGenerated(true);
    }
  }, [state]);

  if (!isGenerated) {
    return <div className="container px-4 my-6">{t("pqrr")}</div>;
  }

  if (isGenerated && state.error) {
    return (
      <div className="container px-2 my-6">
        {t("pqrr2")}: {state.error}
      </div>
    );
  }

  return (
    <div className="px-2">
      <div className="container mx-auto my-6 p-4 bg-gray-100 rounded-md">
        <div className="flex items-center mb-2">
          <h1 className="text-2xl font-semibold leading-7 text-gray-900 mb-2">
            {t("pqrr3")}
          </h1>
        </div>
        <div className="pl-4">
          {Object.keys(state.predictions).map((key) => (
            <div key={key}>
              {key}: {state.predictions[key]}%
            </div>
          ))}
        </div>
        <div className="grid">
          <div className="mt-4">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              {t("pqrr4")}
            </h2>
            <p>{state.justification}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictQuestionResultsResult;
