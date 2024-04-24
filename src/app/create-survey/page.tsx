import React from "react";

const CreateSurvey = () => {
  return (
    <div className="container mx-4 my-6">
      <form>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h1 className="text-base font-semibold leading-7 text-gray-900">
              Create survey
            </h1>

            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="surveyPurpose"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Survey purpose (max 256 characters)
                </label>
                <div className="mt-2">
                  <textarea
                    id="surveyPurpose"
                    name="surveyPurpose"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="questionCount"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Question Count
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="questionCount"
                    id="questionCount"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="optionCount"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Option count (between 2-5)
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="optionCount"
                    id="optionCount"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-start gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSurvey;
