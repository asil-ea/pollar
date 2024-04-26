"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import OpenAI from "openai";

interface IFormResponse {
  [key: string]: FormDataEntryValue;
}

const openai = new OpenAI();

export const submitCreateSurvey = async (
  prevState: any,
  formData: FormData
) => {
  const formResponse: IFormResponse = {};
  formData.forEach((value: FormDataEntryValue, key: string) => {
    formResponse[key] = value;
  });

  const response = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
        You are a survey generator. You have three inputs: "surveyPurpose", "questionCount" and "optionCount". You will generate a title and relevant questions for the given survey purpose. The inputs are described below:
        - surveyPurpose: This will be the general purpose of the generated survey. The generated questions must serve to this purpose fully.
        - questionCount: This is the total question count to generate.
        - optionCount: This is the total count of options to a question. For example, if this value is 5, the options could be 'Strongly agree', 'Agree', 'Neither agree nor disagree', 'Disagree', 'Strongly disagree'. If the value is 2 the options could be 'Agree' and 'Disagree' and so on. Must be between 2 and 5.

        Limitations:
        You must generate minimum of 2 options and maximum of 5 options. If the optionCount is less than 2 or more than 5, you must return an error message. 2 and 5 are included in the range.
        You must generate minimum of 1 question and maximum of 10 questions. If the questionCount is less than 1 or more than 10, you must return an error message. 1 and 10 are included in the range.
        
        Requirements:
        You are responsible to generate valid options for the questions.
        Your questions output must be answerable with the options you generate. For example, if the optionCount is 3, all the questions must be answerable with 'Yes', 'No', 'Maybe'.
        Your surveyTitle, questions and options outputs must be the same language as the surveyPurpose input.
        Consider options as levels. For example, if the optionCount is 5, "Strongly agree" is the highest level and "Strongly disagree" is the lowest level. You must generate options in this order.
        Generated options count must be equal to the optionCount input.
        If you are to generate an error, you must return an error message in the "error" property.
        Your output must be a JSON object, containing "surveyTitle", "options" and "questions" properties. Here is an example:
        {
          "surveyTitle":  "Mayor Satisfaction Survey",
          "options": ["Strongly agree", "Agree", "Neither agree nor disagree", "Disagree", "Strongly disagree"],
          "questions": [
            {
              "title": "Our mayor recognizes the problems of our city."
            },
            {
              "title": "Our mayor works hard to satisfy the fellow residents"
            }
          ]
        }
        `,
      },
      {
        role: "user",
        content: JSON.stringify(formResponse),
      },
    ],
    model: "gpt-3.5-turbo-0125",
    response_format: { type: "json_object" },
  });

  // @ts-ignore
  const message = await JSON.parse(response.choices[0].message.content);

  console.log(response);
  revalidatePath("/create-survey");
  return message;
};
