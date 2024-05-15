"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { submitCreateSurvey } from "@/app/actions";
import CreateSurveyResult from "./CreateSurveyResult";
import { SubmitCreateSurveyFormData } from "@/lib/types";
import { CreateSurveyFormSchema } from "@/lib/schemas";

const CreateSurveyForm = ({}: {}) => {
  const schema = CreateSurveyFormSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubmitCreateSurveyFormData>({
    resolver: zodResolver(schema),
  });

  const [formResponse, setFormResponse] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const submitData = async (data: SubmitCreateSurveyFormData) => {
    setButtonDisabled(true);
    const res = await submitCreateSurvey(data);
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
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue={""}
                      {...register("surveyPurpose")}
                    />
                    {errors.surveyPurpose && (
                      <span className="text-red-500 text-sm">
                        {errors.surveyPurpose.message}
                      </span>
                    )}
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
                      type="number"
                      id="questionCount"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register("questionCount", { valueAsNumber: true })}
                    />
                    {errors.questionCount && (
                      <span className="text-red-500 text-sm">
                        {errors.questionCount.message}
                      </span>
                    )}
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
                      type="number"
                      id="optionCount"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register("optionCount", { valueAsNumber: true })}
                    />
                    {errors.optionCount && (
                      <span className="text-red-500 text-sm">
                        {errors.optionCount.message}
                      </span>
                    )}
                  </div>
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
      <CreateSurveyResult state={formResponse} />
    </>
  );
};

export default CreateSurveyForm;
