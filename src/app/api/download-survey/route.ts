import { NextRequest, NextResponse } from "next/server";
import { fetchSurveyDetail } from "../../my-surveys/[surveyId]/actions";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const surveyId = searchParams.get("surveyId");

  const { surveyTitle, questions } = await fetchSurveyDetail({
    surveyId,
  });

  const orderedQuestions = questions?.sort(
    (a: any, b: any) => a.index - b.index
  );

  let csvFormat = `data:text/csv;charset=utf-8,${surveyTitle},\r\n`;
  const questionsFormat = orderedQuestions
    .map((question) => {
      return question.question;
    })
    .join(",\r\n");
  csvFormat += questionsFormat;
  console.log(csvFormat);

  console.log(surveyTitle);

  return Response.json({ message: "not implemented yet" });
}
