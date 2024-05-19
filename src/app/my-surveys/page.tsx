"use server";
import React from "react";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

const MySurveys = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  const fetchUserSurveys = async () => {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    const { data: surveysData, error: surveysError } = await supabase
      .from("surveys")
      .select("id, survey_title")
      .eq("author_uid", userData?.user?.id);

    return surveysData || [];
  };

  const userSurveys = await fetchUserSurveys();
  const t = await getTranslations("Mysur");
  return (
    <div className="container mx-4 my-6">
      <div className="border-b border-gray-900/10 pb-8">
        <h1 className="text-2xl font-bold mb-2">{t("mysur")}</h1>
        <div className="grid">
          {userSurveys.length === 0 && (
            <p className="text-gray-500">{t("no_surveys")}</p>
          )}
          {userSurveys.map((item: any) => (
            <Link
              key={item.id}
              href={`/my-surveys/${item.id}`}
              className="text-blue-500 hover:underline"
            >
              {item.survey_title}
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <Link
          href="/create-survey"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {t("create_survey")}
        </Link>
      </div>
    </div>
  );
};

export default MySurveys;
