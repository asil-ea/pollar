export interface IFormResponse {
  [key: string]: FormDataEntryValue;
}

export interface IInputJson {
  surveyTitle: string;
  surveyQuestions: string[];
  surveyOptions: string[];
  answers: { respondent: number; answers: string[] }[];
  newQuestion: string;
}

export type SubmitCreateSurveyFormData = {
  surveyPurpose: string;
  questionCount: number;
  optionCount: number;
};