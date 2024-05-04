import { IFormResponse } from "./types";

export const performCreateSurveyFormValidation = (
  formResponse: IFormResponse
) => {
  const errors = [];
  if (
    parseInt(formResponse["questionCount"].toString()) < 0 ||
    parseInt(formResponse["questionCount"].toString()) > 10
  ) {
    errors.push("You must provide between 1 and 10 survey questions.");
  }

  if (
    parseInt(formResponse["optionCount"].toString()) < 2 ||
    parseInt(formResponse["optionCount"].toString()) > 5
  ) {
    errors.push("You must provide between 2 and 5 survey options.");
  }

  if (errors.length > 0) {
    return { error: errors.join(" - ") };
  }

  return null;
};

export const parseFormData = (formData: FormData) => {
  const formResponse: IFormResponse = {};
  formData.forEach((value: FormDataEntryValue, key: string) => {
    formResponse[key] = value;
  });

  return formResponse;
};
