"use client";
import { useTranslations } from "next-intl";

export const ExportCsvButton = ({ surveyId }: { surveyId: string }) => {
  const handleButtonClick = async () => {
    const res = await fetch(`/api/download-survey?surveyId=${surveyId}`, {});
    const json = await res.json();
    window.open(json.publicUrl, "_blank");
  };
  const t = useTranslations("ExportCB");
  return (
    <>
      <button
        onClick={handleButtonClick}
        className="mb-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-900 disabled:shadow-none disabled:hover:bg-gray-300 disabled:focus-visible:outline-gray-300 disabled:focus-visible:outline-offset-0 disabled:focus-visible:outline-none"
      >
        Export CSV
      </button>
    </>
  );
};

export default ExportCsvButton;
