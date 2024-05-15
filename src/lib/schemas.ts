"use client";
import { ZodType, z } from "zod";
import {
  LoginFormData,
  PredictQuestionFormData,
  SubmitCreateSurveyFormData,
} from "./types";

export const PredictQuestionFormSchema: ZodType<PredictQuestionFormData> =
  z.object({
    surveyTitle: z.string().min(10).max(256),
    questionToPredict: z.string().min(10).max(256),
    surveyOptions: z.string().min(10),
    file_upload: z
      // .any()
      .instanceof(FileList)
      .refine((files) => {
        return !files || files.length === 1;
      }, "Please upload a file")
      .refine((files) => {
        return !files[0] || files[0].type === "text/csv";
      }, "Only CSV files are allowed")
      .refine((files) => {
        return !files[0] || files[0].size <= 10 * 1024 * 1024;
      }, "File size must be less than 10MB"),
  });

export const CreateSurveyFormSchema: ZodType<SubmitCreateSurveyFormData> =
  z.object({
    surveyPurpose: z.string().min(20).max(256),
    questionCount: z.number().int().positive().min(1).max(10),
    optionCount: z.number().int().positive().min(2).max(5),
  });
// make additional validations here
// .refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords do not match",
//   path: ["confirmPassword"],
// });

export const LoginFormSchema: ZodType<LoginFormData> = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
