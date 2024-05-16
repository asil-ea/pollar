import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { createClient } from "@/utils/supabase/server";

export default async function PrivatePage() {
  const supabase = createClient();
  const t = await getTranslations("Private");
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <p>
      {t("private")} {data.user.email}
    </p>
  );
}
