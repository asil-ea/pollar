"use server";

import { revalidatePath } from "next/cache";
import OpenAI from "openai";
import {
  CREATESURVEYPROMPT,
  PREDICTQUESTIONRESULTSPROMPT,
} from "@/lib/constants";
import { IInputJson, SubmitCreateSurveyFormData } from "@/lib/types";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

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

export const submitPredictQuestion = async (formData: FormData) => {
  const csv = formData.get("file_upload") as File;
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
  formResponse: SubmitCreateSurveyFormData
) => {
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

export const handleSaveSurvey = async (surveyPayload: any) => {
  const supabase = createClient();

  const surveyOptions = surveyPayload.options.map(
    (option: string, index: number) => {
      return {
        option: option,
        index: index,
      };
    }
  );

  const { data: userData, error: userError } = await supabase.auth.getUser();

  const { data: insertData, error: insertError } = await supabase
    .from("surveys")
    .insert([
      {
        author_uid: userData?.user?.id,
        survey_title: surveyPayload.surveyTitle,
        survey_options: JSON.stringify(surveyOptions),
      },
    ])
    .select();

  if (insertData) {
    surveyPayload.questions.forEach(async (question: any) => {
      const { data: insertQuestionsData, error: insertQuestionsError } =
        await supabase
          .from("questions")
          .insert([
            {
              author_uid: userData?.user?.id,
              survey_id: insertData[0]?.id,
              question: question.title,
              index: parseInt(question.index),
            },
          ])
          .select();

      if (insertQuestionsError || insertQuestionsData) {
        console.error("insertQuestionsError:", insertQuestionsError);
        console.error("insertQuestionsData:", insertQuestionsData);
        return {
          error: "Error saving survey questions",
        };
      }
    });

    return redirect(`my-surveys/${insertData[0]?.id}`);
  }
};

export const handleSignout = async () => {
  const supabase = createClient();

  await supabase.auth.signOut();
  revalidatePath("/", "layout");
};
