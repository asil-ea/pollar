import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../assets/globals.css";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { handleSignout } from "./actions";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import ChangeLocaleDropdown from "@/components/home/ChangeLocaleDropdown";
import Navbar from "@/components/home/Navbar";

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
  const messages = await getMessages();

  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  const isLoggedIn = !error || data?.user;

  return (
    <html lang={locale}>
      <NextIntlClientProvider messages={messages}>
        <body className={inter.className}>
          <Navbar isLoggedIn={isLoggedIn} />
          <main>{children}</main>
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
