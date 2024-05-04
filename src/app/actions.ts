"use server";

import { revalidatePath } from "next/cache";
import OpenAI from "openai";
import {
  CREATESURVEYPROMPT,
  PREDICTQUESTIONRESULTSPROMPT,
} from "@/lib/constants";
import { IFormResponse, IInputJson } from "@/lib/types";
import { parseFormData, performCreateSurveyFormValidation } from "@/lib/utils";

const openai = new OpenAI();
const parseCSVtoJSONAndPopulate = async (csv: File, formData: FormData) => {
  const csvString = await csv.text();
  const lines = csvString.split("\r\n");
  const headers = lines[0].split(";");
  const data = lines.slice(1).map((line) => {
    const values = line.split(";");
    return headers.reduce((acc: any, header: any, index: any) => {
      acc[header] = values[index];
      return acc;
    }, {});
  });

  const json: IInputJson = {
    surveyTitle: "",
    surveyQuestions: [],
    surveyOptions: [],
    answers: [],
    newQuestion: "",
  };

  // populate answers and surveyQuestions
  for (let i = 0; i < data.length; i++) {
    for (const key in data[i]) {
      // means it's a question
      if (Number.isNaN(parseInt(key))) {
        json.surveyQuestions.push(data[i][key]);
        continue;
      }

      // populate answers array
      if (i === 0) {
        json.answers.push({
          respondent: parseInt(key),
          answers: [],
        });
      }

      // find respondent index in json
      const respondentIndexInJson = json.answers.findIndex(
        (obj: any) => obj.respondent === parseInt(key)
      );

      // add answers to respondent
      json.answers[respondentIndexInJson].answers.push(data[i][key]);
    }
  }

  // populate newQuestion
  json.newQuestion = formData.get("questionToPredict") as string;

  // populate surveyTitle
  json.surveyTitle = formData.get("surveyTitle") as string;

  // populate surveyOptions
  json.surveyOptions = (formData.get("surveyOptions") as string)
    .trim()
    .split(",");

  return json;
};

export const submitPredictQuestion = async (
  prevState: any,
  formData: FormData
) => {
  const csv = formData.get("file-upload") as File;
  const inputJSON = await parseCSVtoJSONAndPopulate(csv, formData);

  const response = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: PREDICTQUESTIONRESULTSPROMPT,
      },
      {
        role: "user",
        content: JSON.stringify(inputJSON),
      },
    ],
    model: "gpt-3.5-turbo-0125",
    response_format: { type: "json_object" },
  });

  // @ts-ignore
  const message = await JSON.parse(response.choices[0].message.content);

  console.log(response);
  console.log(message, "message");
  console.log(inputJSON, "inputJSON");
  revalidatePath("/predict-question-results");
  return message;
};

export const submitCreateSurvey = async (
  prevState: any,
  formData: FormData
) => {
  const formResponse: IFormResponse = parseFormData(formData);

  const validations = performCreateSurveyFormValidation(formResponse);

  if (validations) {
    return validations;
  }

  const response = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: CREATESURVEYPROMPT,
      },
      {
        role: "user",
        content: JSON.stringify(formResponse),
      },
    ],
    model: "gpt-3.5-turbo",
    response_format: { type: "json_object" },
  });

  // @ts-ignore
  const message = await JSON.parse(response.choices[0].message.content);

  console.log(response);
  revalidatePath("/create-survey");
  return message;
};