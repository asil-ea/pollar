import React, { Dispatch, SetStateAction } from "react";
import { FormStatus, useFormStatus } from "react-dom";

const PredictQuestionResultsForm = ({}: {}) => {
  const formStatus = useFormStatus();

  return (
    <>
      <div className="container mx-4 my-6">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h1 className="text-base font-semibold leading-7 text-gray-900">
              Predict Question
            </h1>

            <div className="sm:col-span-3 mt-4">
              <label
                htmlFor="surveyTitle"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Survey Title
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="surveyTitle"
                  id="surveyTitle"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  disabled={formStatus.pending}
                />
              </div>
            </div>

            <div className="col-span-full mt-4">
              <label
                htmlFor="questionToPredict"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Question to predict (max 256 characters)
              </label>
              <div className="mt-2">
                <textarea
                  id="questionToPredict"
                  name="questionToPredict"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                  disabled={formStatus.pending}
                />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="surveyOptions"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Survey options (comma separated)
                </label>
                <div className="mt-2">
                  <textarea
                    id="surveyOptions"
                    name="surveyOptions"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                    disabled={formStatus.pending}
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Survey CSV
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      CSV up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-start gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-900 disabled:shadow-none disabled:hover:bg-gray-300 disabled:focus-visible:outline-gray-300 disabled:focus-visible:outline-offset-0 disabled:focus-visible:outline-none"
            disabled={formStatus.pending}
          >
            Submit
          </button>
        </div>
      </div>
      {formStatus.pending && (
        <div>
          <h1 className="text-base font-semibold leading-7 text-gray-900">
            Please wait while we predict your question...
          </h1>
        </div>
      )}
    </>
  );
};

export default PredictQuestionResultsForm;
