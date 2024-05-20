import { NextRequest, NextResponse } from "next/server";
import { fetchSurveyDetail } from "../../my-surveys/[surveyId]/actions";
import { createClient } from "@/utils/supabase/server";
import { Parser } from "@json2csv/plainjs";

export async function GET(request: NextRequest) {
  const supabase = createClient();

  const { searchParams } = new URL(request.url);
  const surveyId = searchParams.get("surveyId");

  const { surveyTitle, questions } = await fetchSurveyDetail({
    surveyId,
  });

  const orderedQuestions = questions?.sort(
    (a: any, b: any) => a.index - b.index
  );

  const parser = new Parser({
    fields: ["question", "index"],
  });
  const csv = parser.parse(orderedQuestions);

  console.log(csv);

  const { data: upsertResponse, error } = await supabase.storage
    .from("survey_csv_files")
    .upload(`${surveyId}.csv`, csv, {
      contentType: "text/csv",
      upsert: true,
    });

  const { data } = supabase.storage
    .from("survey_csv_files")
    .getPublicUrl(`${surveyId}.csv`, {
      download: true,
    });

  console.log(data, error);

  return NextResponse.json(data);
}
