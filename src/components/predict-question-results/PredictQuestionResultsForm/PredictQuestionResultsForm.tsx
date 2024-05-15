"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitPredictQuestion } from "@/app/actions";
import { PredictQuestionFormData } from "@/lib/types";
import { PredictQuestionFormSchema } from "@/lib/schemas";
import PredictQuestionResultsResult from "../PredictQuestionResultsResult";

const PredictQuestionResultsForm = ({}: {}) => {
  const [formResponse, setFormResponse] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const schema = PredictQuestionFormSchema;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PredictQuestionFormData>({
    resolver: zodResolver(schema),
  });

  const uploadedFiles = watch("file_upload");

  const submitData = async (data: PredictQuestionFormData) => {
    setButtonDisabled(true);

    const formData = new FormData();
    formData.append("surveyTitle", data.surveyTitle);
    formData.append("questionToPredict", data.questionToPredict);
    formData.append("surveyOptions", data.surveyOptions);
    if (data.file_upload) {
      formData.append("file_upload", data.file_upload[0]);
    } else {
      return;
    }
    const res = await submitPredictQuestion(formData);
    setFormResponse(res);
    setButtonDisabled(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitData)}>
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
                    id="surveyTitle"
                    {...register("surveyTitle")}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.surveyTitle && (
                    <span className="text-red-500 text-sm">
                      {errors.surveyTitle.message}
                    </span>
                  )}
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
                    rows={3}
                    defaultValue={""}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("questionToPredict")}
                  />
                  {errors.questionToPredict && (
                    <span className="text-red-500 text-sm">
                      {errors.questionToPredict.message}
                    </span>
                  )}
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
                      rows={3}
                      defaultValue={""}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register("surveyOptions")}
                    />
                    {errors.surveyOptions && (
                      <span className="text-red-500 text-sm">
                        {errors.surveyOptions.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="col-span-full">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Survey CSV
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div>
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file_upload"
                          className="mx-auto relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file_upload"
                            type="file"
                            className="sr-only"
                            {...register("file_upload")}
                          />
                        </label>
                      </div>
                      {uploadedFiles && uploadedFiles.length > 0 ? (
                        <p className="mt-2 text-center text-md leading-5 text-gray-600 font-bold">
                          {uploadedFiles[0].name}
                        </p>
                      ) : (
                        <p className="mx-auto text-xs leading-5 text-gray-600">
                          Filetype: CSV, Max size: 10MB
                        </p>
                      )}
                    </div>
                  </div>
                  {errors.file_upload && (
                    <span className="text-red-500 text-sm">
                      {errors.file_upload.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-start gap-x-6">
            <button
              type="submit"
              disabled={buttonDisabled}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-900 disabled:shadow-none disabled:hover:bg-gray-300 disabled:focus-visible:outline-gray-300 disabled:focus-visible:outline-offset-0 disabled:focus-visible:outline-none"
            >
              {buttonDisabled ? "Generating..." : "Submit"}
            </button>
          </div>
        </div>
      </form>
      <PredictQuestionResultsResult state={formResponse} />
    </>
  );
};

export default PredictQuestionResultsForm;
