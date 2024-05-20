"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";

export const ExportCsvButton = ({ surveyId }: { surveyId: string }) => {
  const handleButtonClick = async () => {
    setDisabled(true);
    const res = await fetch(`/api/download-survey?surveyId=${surveyId}`, {});
    const json = await res.json();
    window.open(json.publicUrl, "_blank");
    setDisabled(false);
  };

  const [disabled, setDisabled] = useState(false);

  const t = useTranslations("ExportCB");
  return (
    <>
      <button
        disabled={disabled}
        onClick={handleButtonClick}
        className="w-full mb-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-900 disabled:shadow-none disabled:hover:bg-gray-300 disabled:focus-visible:outline-gray-300 disabled:focus-visible:outline-offset-0 disabled:focus-visible:outline-none"
      >
        {t("exportButton")}
      </button>
    </>
  );
};

export default ExportCsvButton;
