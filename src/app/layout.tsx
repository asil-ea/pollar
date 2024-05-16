import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../assets/globals.css";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { handleSignout } from "./actions";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pollar",
  description: "Use the power of AI to survey.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const supabase = createClient();
  const messages = await getMessages();
  const { data, error } = await supabase.auth.getUser();
  const isLoggedIn = !error || data?.user;
  const t = await getTranslations("Navbar");
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <nav className="bg-gray-800 p-4">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between">
              <div className="flex space-x-4">
                <Link
                  href="/predict-question-results"
                  className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  {t("nav")}
                </Link>
                <Link
                  href="/create-survey"
                  className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  {t("nav2")}
                </Link>
              </div>
              <div className="flex space-x-4">
                {isLoggedIn ? (
                  <>
                    <Link
                      href="/my-surveys"
                      className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      {t("nav3")}
                    </Link>
                    <form>
                      <button
                        formAction={handleSignout}
                        className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                      >
                        {t("nav4")}
                      </button>
                    </form>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {t("nav5")}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>
        <NextIntlClientProvider messages={messages}>
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
