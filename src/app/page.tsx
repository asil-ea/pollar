import Link from "next/link";
import { useTranslations } from "next-intl";
import { createClient } from "@/utils/supabase/server";
import { checkIsLoggedIn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const supabase = createClient();

  const isLoggedIn = await checkIsLoggedIn(supabase);

  const t = await getTranslations("Index");

  return (
    <>
      <div className="relative isolate px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-8 md:py-16 lg:py-48">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              {t("title")}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {t("title2")}
            </p>

            <div className="mt-6 flex items-center justify-center gap-x-6">
              {isLoggedIn ? (
                <>
                  <Link
                    href="/predict-question-results"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {t("title4")}
                  </Link>
                  <Link
                    href="/create-survey"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {t("title5")}
                  </Link>
                </>
              ) : (
                <Link
                  href="/login"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {t("title3")}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
