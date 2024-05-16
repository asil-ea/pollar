import React from "react";
import { useTranslations } from "next-intl";

const Loading = () => {
  const t = useTranslations("Loading");
  return <div className="container mx-4 my-6">{t("loading")}</div>;
};

export default Loading;
