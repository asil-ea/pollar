"use server";
import React from "react";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

const MySurveys = async () => {
  const fetchUserSurveys = async () => {
    const supabase = createClient();
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
      <div className="">
        <h1 className="text-2xl font-bold mb-2">{t("mysur")}</h1>
        <div className="grid">
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
    </div>
  );
};

export default MySurveys;
