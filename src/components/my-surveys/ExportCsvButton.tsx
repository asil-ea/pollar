"use client";

export const ExportCsvButton = ({ surveyId }: { surveyId: string }) => {
  const handleButtonClick = async () => {
    await fetch(`/api/download-survey?surveyId=${surveyId}`, {});
  };

  return (
    <>
      <button
        onClick={handleButtonClick}
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-900 disabled:shadow-none disabled:hover:bg-gray-300 disabled:focus-visible:outline-gray-300 disabled:focus-visible:outline-offset-0 disabled:focus-visible:outline-none"
      >
        Export CSV
      </button>
    </>
  );
};

export default ExportCsvButton;
