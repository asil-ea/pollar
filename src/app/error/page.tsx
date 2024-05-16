import { useTranslations } from "next-intl";

export default function ErrorPage() {
  const t = useTranslations("Error");

  return <p>{t("error")}</p>;
}
